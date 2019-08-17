const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const axios = require('axios');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const homeWeatherHtmlURL = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.MY_LATITUDE}&lon=${process.env.MY_LONGITUDE}&units=imperial&mode=html&appid=${process.env.OPEN_WEATHER_API_KEY}`;
const homeWeatherJsonURL = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.MY_LATITUDE}&lon=${process.env.MY_LONGITUDE}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;
const dadJokeURL = `https://icanhazdadjoke.com`;
const geekJokeURL = `https://geek-jokes.sameerkumar.website/api`;
const quoteURL = `https://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en`;

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

const convertUnixToTime = (unix) => { // https://momentjs.com/timezone/
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

const getDadJoke = () => {
  return axios.get(dadJokeURL, { headers: { "Accept": "text/plain" } });
}

const getGeekJoke = () => {
  return axios.get(geekJokeURL);
}

const getQuote = () => {
  return axios.get(quoteURL);
}

getHomeWeatherHtml()
  .then((homeWeatherHtml) => {
    data.homeWeatherHtml = homeWeatherHtml.data;
    return getHomeWeatherJson();
  })
  .then((homeWeatherJson) => {
    data.homeWeatherJson = homeWeatherJson.data;
    return getDadJoke();
  })
  .then((dadJoke) => {
    data.dadJoke = dadJoke.data;
    return getGeekJoke();
  })
  .then((geekJoke) => {
    data.geekJoke = geekJoke.data;
    return getQuote();
  })
  .then((quote) => {
    const html = `
      <p>Happy ${dayOfWeek()},</p>
      <p> ${ quote.data } </p>
      ${ data.homeWeatherHtml }
      <br>
      <p><strong>Dad Joke:</strong> ${ data.dadJoke } </p>
      <p><strong>Geek Joke:</strong> ${ data.geekJoke } </p>
      <p><strong>Temp min:</strong> ${ data.homeWeatherJson.main.temp_min } </p>
      <p><strong>Temp max:</strong> ${ data.homeWeatherJson.main.temp_max } </p>
      <p><strong>Sunrise:</strong> ${ convertUnixToTime(data.homeWeatherJson.sys.sunrise) } </p>
      <p><strong>Sunset:</strong> ${ convertUnixToTime(data.homeWeatherJson.sys.sunset) } </p>
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
