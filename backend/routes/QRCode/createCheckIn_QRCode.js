const express = require("express");
const router = express.Router();
const userStudent = require("../../models/userStudent");
const event = require("../../models/events");
const organization = require("../../models/organization");
const QRCode = require('qrcode');

router.get("/", async (req, res) => {
        try {
                const eventOngoing = req.query.event;
                const eventObj = await event.findOne(eventOngoing);
                
                if (!eventObj) {
                        return res.status(404).send("Event not found in the database");
                } else {
                        console.log("Event found in the database");
                }
                
                // store the ID of the event to check for in the QR Code string
                const QRCodeString = eventObj._id;
                const QRCodeImage = await QRCode.toDataURL(QRCodeString);
                res.send(`<img src="${QRCodeImage}">`);
        } catch (err) {
                res.status(500).send(err);
        }

});


module.exports = router;
