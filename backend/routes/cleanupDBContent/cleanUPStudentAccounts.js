const express = require('express');
const router = express.Router();
const UserStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
    try {
        const duplicates = await UserStudent.aggregate([
            {
                $facet: {
                    "byName": [
                        {
                            $group: {
                                _id: { firstName: "$firstName", lastName: "$lastName" },
                                count: { $sum: 1 },
                                ids: { $push: "$_id" }
                            }
                        },
                        {
                            $match: {
                                count: { $gt: 1 }
                            }
                        }
                    ],
                    "byEmail": [
                        {
                            $group: {
                                _id: "$email",
                                count: { $sum: 1 },
                                ids: { $push: "$_id" }
                            }
                        },
                        {
                            $match: {
                                count: { $gt: 1 }
                            }
                        }
                    ]
                }
            }
        ]);

        // Flatten the results and combine IDs from both name and email duplicates
        let idsToDelete = [];
        duplicates[0].byName.forEach(group => idsToDelete = idsToDelete.concat(group.ids.slice(1))); // Keep the first occurrence
        duplicates[0].byEmail.forEach(group => idsToDelete = idsToDelete.concat(group.ids.slice(1)));

        if (idsToDelete.length > 0) {
            await UserStudent.deleteMany({ _id: { $in: idsToDelete } });
        }

        const invalidNamesResult = await UserStudent.deleteMany({
            $or: [
                { firstName: { $not: /[a-zA-Z]/ } },
                { lastName: { $not: /[a-zA-Z]/ } }
            ]
        });

        const totalRemoved = idsToDelete.length + invalidNamesResult.deletedCount;
        res.send(`Cleanup completed successfully. Total removed: ${totalRemoved}`);
    } catch (error) {
        console.error('Failed during cleanup process:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
