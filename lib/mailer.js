const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const Time = require('./time');
const ApiCaller = require('./apiCaller');
require('dotenv').config();

const time = new Time();
const apiCaller = new ApiCaller();
const data = {};

apiCaller.getHomeWeatherHtml()
  .then((homeWeatherHtml) => {
    data.homeWeatherHtml = homeWeatherHtml.data;
    return apiCaller.getHomeWeatherJson();
  })
  .then((homeWeatherJson) => {
    data.homeWeatherJson = homeWeatherJson.data;
    return apiCaller.getDadJoke();
  })
  .then((dadJoke) => {
    data.dadJoke = dadJoke.data;
    return apiCaller.getGeekJoke();
  })
  .then((geekJoke) => {
    data.geekJoke = geekJoke.data;
    return apiCaller.getQuote();
  })
  .then((quote) => {
    const html = `
      <p>Happy ${ time.dayOfWeek() }!</p>
      ${ data.homeWeatherHtml }
      <p> ${ quote.data } </p>
      <p><strong>Dad Joke:</strong> ${ data.dadJoke } </p>
      <p><strong>Geek Joke:</strong> ${ data.geekJoke } </p>
      <p>
        <strong>Temp min:</strong> ${ data.homeWeatherJson.main.temp_min } <br>
        <strong>Temp max:</strong> ${ data.homeWeatherJson.main.temp_max } <br>
        <strong>Sunrise:</strong> ${ time.convertUnixToTime(data.homeWeatherJson.sys.sunrise) } <br>
        <strong>Sunset:</strong> ${ time.convertUnixToTime(data.homeWeatherJson.sys.sunset) }
      </p>
    `;

    // console.log(html);

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

    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
  });
