// var nodemailer = require('nodemailer');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // ClientID
  process.env.CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
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
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: "<b>test</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
     error ? console.log(error) : console.log(response);
     smtpTransport.close();
});


// // var transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.PASSWORD
// //   }
// // });

// var transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     type: 'OAuth2',
//     user: process.env['EMAIL'],
//     clientId: process.env['CLIENT_ID'],
//     clientSecret: process.env['CLIENT_SECRET'],
//     refreshToken: process.env['REFRESH_TOKEN'],
//     accessToken: process.env['ACCESS_TOKEN']
//   }
// });

// var mailOptions = {
//   from: process.env['EMAIL'],
//   to: process.env['EMAIL'],
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
