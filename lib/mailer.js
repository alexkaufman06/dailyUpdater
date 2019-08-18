const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const Time = require('./time');
const ApiCaller = require('./apiCaller');
require('dotenv').config();

const time = new Time();
const apiCaller = new ApiCaller();
const promises = [
  apiCaller.getQuote(), 
  apiCaller.getHomeWeatherHtml(), 
  apiCaller.getDadJoke(), 
  apiCaller.getGeekJoke(), 
  apiCaller.getHomeWeatherJson()
];

Promise.all(promises).then((values) => {
  const html = `
    <p>Happy ${ time.dayOfWeek() }!</p>
    <p> ${ values[0].data } </p>
    ${ values[1].data }
    <p><strong>Dad Joke:</strong> ${ values[2].data } </p>
    <p><strong>Geek Joke:</strong> ${ values[3].data } </p>
    <p>
      <strong>Temp min:</strong> ${ values[4].data.main.temp_min } <br>
      <strong>Temp max:</strong> ${ values[4].data.main.temp_max } <br>
      <strong>Sunrise:</strong> ${ time.convertUnixToTime(values[4].data.sys.sunrise) } <br>
      <strong>Sunset:</strong> ${ time.convertUnixToTime(values[4].data.sys.sunset) }
    </p>
  `;

  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, 
    process.env.CLIENT_SECRET, 
    "https://developers.google.com/oauthplayground" 
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

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

  // console.log(html);
  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });

});