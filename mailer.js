const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const User = require('./routes/users');
const Storing = require('./routes/storing');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "bennie.olson@ethereal.email",
        pass: "NdG1tMD8hmhtvhnpB3",
    },
});

// Function to calculate days left until the deadline
function calculateDaysLeft(deadLine, today) {
    deadLine = new Date(deadLine);
    today = new Date(today);
    const timeDiff = deadLine.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
}

// Function to send reminder email
async function sendReminderMail(deadLine) {
    const today = new Date();
    const daysLeft = calculateDaysLeft(deadLine, today);

    if (daysLeft === 1) {
        const filePath = path.join(__dirname, 'views', 'ReminderMail.html');
        const rhtml = fs.readFileSync(filePath, 'utf8');
        const hods = await User.find({ email: /HOD/i });
        const storing = await Storing.findOne();

        try {
            for (const hod of hods) {
                const flagKey = `hod${hod.email.slice(3, 6).toLowerCase()}flag`;
                if (storing[flagKey] === false) {
                    const message = {
                        from: '2joshua141@gmail.com',
                        to: hod.email,
                        subject: 'Final Call for entering details',
                        html: rhtml,
                    };
                    const info = await transporter.sendMail(message);
                    console.log(`Reminder email sent to ${hod.email}`);
                }
            }
        } catch (error) {
            console.error('Error fetching HODs or sending emails:', error);
        }
    }
}

// Function to send an email to the registrar when all flags are true
async function notifyRegistrar(storing) {
    let cnt=0;
    for (const key in storing.toObject()) {
        
        if (typeof storing[key] === 'boolean' && storing[key]) {
            console.log(storing[key]);
            cnt++;
            console.log(cnt);
        }
        else{
            console.log("else me chala gya");
        }
    }
      if (!storing) {
        console.log('No storing document found.');
        return;
      }
    
      // Check if all specific boolean flags are true
    if (cnt===6) {
        const filePath = path.join(__dirname, 'views', 'HodToReg.html');
        const html = fs.readFileSync(filePath, 'utf8');
        const registrarEmail=User.findOne({})
        const message = {
            from: '2joshua141@gmail.com',
            to: 'registrar@gmail.com',
            subject: 'All HODs have submitted their details',
            html: html,
        };

        try {
            const info = await transporter.sendMail(message);
            console.log('Notification email sent to registrar');
        } catch (error) {
            console.error('Error sending notification email to registrar:', error);
        }
    }
}




// Function to send initial email to HODs
async function SendToHOD() {
    const hods = await User.find({ email: /HOD/ });
    hods.forEach(async (hod) => {
        const filePath = path.join(__dirname, 'views', 'NotifyHods.html');
        const html = fs.readFileSync(filePath, 'utf8');
        const message = {
            from: "2joshua141@gmail.com",
            to: hod.email,
            subject: 'Notification for entering the course details',
            html: html,
        };
        const info = await transporter.sendMail(message);
    });
}

module.exports = {
    SendToHOD,
    sendReminderMail,
    notifyRegistrar
};
