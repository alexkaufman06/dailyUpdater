const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

class Gmailer {
    constructor(html) {
        this.oauth2Client = new OAuth2(
            process.env.CLIENT_ID, 
            process.env.CLIENT_SECRET, 
            "https://developers.google.com/oauthplayground" 
        );

        this.smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            }
        });

        this.mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `${ new Date().toLocaleDateString() } Update`,
            generateTextFromHTML: true,
            html: html
        };
    }

    send() {
        this.oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });

        this.smtpTransport.sendMail(this.mailOptions, (error, response) => {
            error ? console.log(error) : console.log(response);
            smtpTransport.close();
        });
    }

}

module.exports = Gmailer;

  