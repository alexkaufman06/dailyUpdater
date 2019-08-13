const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const axios = require('axios');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const homeWeatherHtmlURL = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.MY_LATITUDE}&lon=${process.env.MY_LONGITUDE}&units=imperial&mode=html&appid=${process.env.OPEN_WEATHER_API_KEY}`;
const homeWeatherJsonURL = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.MY_LATITUDE}&lon=${process.env.MY_LONGITUDE}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;

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

const convertUnixToTime = (unix) => {
  var date = new Date(unix * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

const data = {};

const getHomeWeatherHtml = () => {
  return axios.get(homeWeatherHtmlURL);
}

const getHomeWeatherJson = () => {
  return axios.get(homeWeatherJsonURL);
}

getHomeWeatherHtml()
  .then((homeWeatherHtml) => {
    data.homeWeatherHtml = homeWeatherHtml.data;
    return getHomeWeatherJson();
  })
  .then((homeWeatherJson) => {
    const html = `
      <p>It's ${dayOfWeek()},</p>
      <p>Here's the weather at home:</p>
      ${ data.homeWeatherHtml }
      <br>
      Temp min: ${ homeWeatherJson.data.main.temp_min }
      <br>
      Temp max: ${ homeWeatherJson.data.main.temp_max }
      <br><br>
      Sunrise: ${ convertUnixToTime(homeWeatherJson.data.sys.sunrise) }
      <br>
      Sunset: ${ convertUnixToTime(homeWeatherJson.data.sys.sunset) }
    `;

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
  });
