const axios = require('axios');
require('dotenv').config();

class ApiCaller {
    constructor() {
        this.homeWeatherHtmlURL = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.MY_LATITUDE}&lon=${process.env.MY_LONGITUDE}&units=imperial&mode=html&appid=${process.env.OPEN_WEATHER_API_KEY}`;
        this.homeWeatherJsonURL = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.MY_LATITUDE}&lon=${process.env.MY_LONGITUDE}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;
        this.dadJokeURL = `https://icanhazdadjoke.com`;
        this.geekJokeURL = `https://geek-jokes.sameerkumar.website/api`;
        this.quoteURL = `https://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en`;
        this.astrologyAries = `http://sandipbgt.com/theastrologer/api/horoscope/aries/today/`;
    }

    getHomeWeatherHtml() {
        return axios.get(this.homeWeatherHtmlURL);
    }
      
    getHomeWeatherJson() {
        return axios.get(this.homeWeatherJsonURL);
    }

    getDadJoke() {
        return axios.get(this.dadJokeURL, { headers: { "Accept": "text/plain" } });
    }

    getGeekJoke() {
        return axios.get(this.geekJokeURL);
    }

    getQuote() {
        return axios.get(this.quoteURL);
    }

    getAriesAstrology() {
        return axios.get(this.astrologyAries);
    }

    getPromises() {
        return [
            this.getQuote(), 
            this.getHomeWeatherHtml(), 
            this.getDadJoke(), 
            this.getGeekJoke(), 
            this.getHomeWeatherJson(),
            this.getAriesAstrology()
        ];
    }
}

module.exports = ApiCaller;