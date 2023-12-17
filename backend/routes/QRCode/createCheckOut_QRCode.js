const express = require("express");
const router = express.Router();
const userStudent = require("../../models/userStudent");
const event = require("../../models/events");
const organization = require("../../models/organization");
const QRCode = require('qrcode');
const crypto = require('crypto');

router.get("/", async (req, res) => {
    try {
        const eventOngoingID = req.query.eventID;
        const eventObj = await event.findOne({ _id: eventOngoingID });

        if (!eventObj) {
            return res.status(404).send("Event not found in the database");
        } else {
            console.log("Event found in the database");
        }

        // store the ID of the event to check for in the QR Code string
        const QRCodeString = eventObj._id.toString();

        // encoding the difference for the checkout QR Code 
        QRCodeString = QRCodeString + crypto.randomBytes(16).toString('hex');
        const QRCodeImage = await QRCode.toDataURL(QRCodeString);
        console.log(QRCodeImage);
        return res.json({ QRCodeImageBlock: "<img src=" + QRCodeImage + "/>" });
    } catch (err) {
        res.status(500).send(err);
    }

});


module.exports = router;