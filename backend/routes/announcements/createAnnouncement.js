const express = require("express");
const router = express.Router();
const orgDB = require("../../models/organization");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const userStudent = require("../../models/userStudent");

const sendEmail = (role, user, org, ancmt) => {

    if (user.receiveEmails == "false")
        return;

    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    };

    const transporterForLogin = nodemailer.createTransport(config);

    const mailGenerator = new mailgen({
        theme: 'default', // neopolitan, default, and cerberus are themes I liked
        product: {
            name: 'KnightAssist',
            link: 'https://knightassist-43ab3aeaada9.herokuapp.com/#/login',
        },
    });

    let name = '';
    if (role === 'admin')
        name = user.firstName + ' ' + user.lastName;
    else if (role === 'student') name = user.firstName + ' ' + user.lastName;
    else name = user.name;

    let introText = `Dear ${name},<br><br>A new announcement titled "<strong>${ancmt.title}</strong>" has been posted by <strong>${org.name}</strong>. Here's a brief overview of the announcement:<br><br>`;

    // [OLD template]
    // let response = {
    //     body: {
    //         name: 'Hello' + name + '!',
    //         intro: 'A new announcement has been posted by ' + org.name + '!' + '[Date: ' + ancmt.date + ']',
    //         action: {
    //             instructions: 'Announcement Title: ' + ancmt.title + '\n' + 'Announcement Content: ' + ancmt.content,
    //             button: {
    //                 color: '#22BC66', 
    //                 text: 'View Announcement',
    //                 link: '' // TODO to be filled
    //             }

    //         },            
    //     }
    // }

    let response = {
        body: {
            name: name,
            intro: introText,
            table: {
                data: [
                    {
                        'Date Posted': new Date(),
                        'Title': ancmt.title,
                        'Summary': ancmt.content.slice(0, 100) + '...' // A brief summary of the content
                    }
                ],
                columns: {
                    customWidth: {
                        'Date Posted': '15%',
                        'Title': '25%',
                        'Summary': '60%'
                    },
                    customAlignment: {
                        'Date Posted': 'left',
                        'Title': 'left',
                        'Summary': 'left'
                    }
                }
            },
            action: {
                instructions: 'To read the full announcement, please click the button below:',
                button: {
                    color: '#22BC66',
                    text: 'View Full Announcement',
                    // link: `https://your-organization-website.com/announcement/${ancmt._id}` // Link to the announcement
                    link: 'https://knightassist-43ab3aeaada9.herokuapp.com/#/login' // TODO to be filled
                }
            },
            // Optionally include organization's details
            signature: 'Best regards,<br>' + org.name
        }
    };

    let mail = mailGenerator.generate(response);

    let message = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'New Announcement from ' + org.name + '!',
        html: mail
    }

    transporterForLogin.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to send announcement through email");
        } else {
            console.log(info);
            return res.status(200).send("Announcement sent through email");
        }
    });
}

router.post('/', async (req, res) => {
    const fetchID = req.body.organizationID;
    const newAnnouncementContent = req.body.content;
    const newAnnouncementTitle = req.body.title;

    if (!fetchID) return res.status(400).send('Organization ID not provided');
    if (!newAnnouncementContent) return res.status(400).send('Announcement content is needed');
    if (!newAnnouncementTitle) 
        newAnnouncementTitle = req.body.title || 'Untitled';
    try {
        const organization = await orgDB.findOne({ _id: fetchID });
        if (!organization) return res.status(404).send('Organization not found');
        
        var newAnnouncement =  {
            "date": Date.now(),
            "title": newAnnouncementTitle,
            "content": newAnnouncementContent
        }

        organization.updates.push(newAnnouncement);
        await organization.save();
        // print the latest added announcement
        console.log(organization.updates[organization.updates.length - 1]);
        
        // send email to all volunteers that have favorited this organization
        const favorited = organization.favorites;
        for (let i = 0; i < favorited.length; i++) {
            const studentVolunteer = await userStudent.findOne({ _id: favorited[i] });
            if (!studentVolunteer) continue;
            sendEmail('student', studentVolunteer, organization, newAnnouncement);
        }

        res.status(200).send('Announcement created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred - could not create announcement');
    }
});

module.exports = router;