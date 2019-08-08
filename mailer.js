const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();


const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, 
  process.env.CLIENT_SECRET, 
  "https://developers.google.com/oauthplayground" 
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
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

const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: "<DATE> Update",
  generateTextFromHTML: true,
  html: "<b>IT WORKS!</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response);
  smtpTransport.close();
});