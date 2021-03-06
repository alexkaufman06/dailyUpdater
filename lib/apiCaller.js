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
        this.dateFact = `https://numbersapi.p.rapidapi.com/${new Date().getMonth() + 1}/${new Date().getDate()}/date`;
        this.billboardhot100 = `https://www.billboard.com/charts/hot-100`;
        this.craigsListHomes = `https://portland.craigslist.org/search/eby/reo?hasPic=1&search_distance=30&postal=97211&min_price=300000&max_price=400000&min_bedrooms=3&min_bathrooms=2&availabilityMode=0&housing_type=6&sale_date=all+dates`;
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

    getBillboardHot100() {
        return axios.get(this.billboardhot100);
    }

    getCraigsListHomes() {
        return axios.get(this.craigsListHomes);
    }

    getDateFact() {
        return axios.get(this.dateFact, { 
            headers: { 	
                        "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                        "x-rapidapi-key": `${process.env.X_RAPIDAPI_KEY}` 
            } 
        });
    }

    getPromises() {
        return [
            this.getQuote(), 
            this.getHomeWeatherHtml(), 
            this.getDadJoke(), 
            this.getGeekJoke(), 
            this.getHomeWeatherJson(),
            this.getAriesAstrology(),
            this.getDateFact(),
            this.getBillboardHot100(),
            this.getCraigsListHomes()
        ];
    }
}

module.exports = ApiCaller;