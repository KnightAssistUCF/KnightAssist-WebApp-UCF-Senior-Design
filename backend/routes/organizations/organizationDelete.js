const express = require('express');
const router = express.Router();
const { authenticateToken_Organization } = require('../../utils/jwtUtils');

const organization = require('../../models/organization');

// first we lookup the organization by their email
router.get('/', async (req, res) => {
    const query = {
        $or: [
            { _id: req.body.id },
            { email: req.body.email }
        ]
    };
    await organization.findOne(query).then((organization) => {
        if (organization) { res.status(200).send(organization); }
        else throw new Error()
    }).catch((err) => { res.status(400).send("Organization not found") });
});

// then we delete the organization by their email
router.delete('/', authenticateToken_Organization, async (req, res) => {
    const query = {
        $or: [
            { _id: req.body.id },
            { email: req.body.email }
        ]
    };
    await organization.findOne(query).then(async (organization) => {
        if (organization) {
            await organization.deleteOne({ email: req.body.email }).then((organization) => {
                res.status(200).send("Organization deleted successfully" + organization);
            }).catch((err) => { res.status(400).send("Internal server error: " + err); })
        }
        else throw new Error()
    }).catch((err) => {
        res.status(400).send("Organization not found");
    });
});

module.exports = router;