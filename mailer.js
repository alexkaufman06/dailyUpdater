const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const dayOfWeek = () => {
  var a = new Date();
  var days = new Array(7);
  days[0] = "Sunday";
  days[1] = "Monday";
  days[2] = "Tuesday";
  days[3] = "Wednesday";
  days[4] = "Thursday";
  days[5] = "Friday";
  days[6] = "Saturday";
  return days[a.getDay()];
}

const html = `
<p>It's ${dayOfWeek()},</p>
<p>Here's an update for the day:</p>
`;

// let url = `https://api.openweathermap.org/data/2.5/weather?q=Portland&mode=html&appid=${process.env.OPEN_WEATHER_API_KEY}`

// request(url, function (err, response, body) {
//   if(err){
//     console.log('error:', error);
//   } else {
//     console.log('DATA: \n', body);
//   }
// });

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
  subject: `${ new Date().toLocaleDateString() } Update`,
  generateTextFromHTML: true,
  html: html
};

smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response);
  smtpTransport.close();
});