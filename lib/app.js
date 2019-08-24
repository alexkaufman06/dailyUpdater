const ApiCaller = require('./apiCaller');
const Gmailer = require('./gmailer');
const CraigsListFormatter = require('./craigsListFormatter');
const Time = require('./time');

const apiCaller = new ApiCaller();
const time = new Time();
const craigsListFormatter = new CraigsListFormatter();

Promise.all(apiCaller.getPromises()).then((values) => {
  const html = `
    <p>Happy ${ time.dayOfWeek() }!</p>
    <p> ${ values[0].data } </p>
    ${ values[1].data }
    <p><b>Dad Joke:</b> ${ values[2].data } </p>
    <p><b>Geek Joke:</b> ${ values[3].data } </p>
    <p>
      <b>Temp min:</b> ${ values[4].data.main.temp_min } <br>
      <b>Temp max:</b> ${ values[4].data.main.temp_max } <br>
      <b>Sunrise:</b> ${ time.convertUnixToTime(values[4].data.sys.sunrise) } <br>
      <b>Sunset:</b> ${ time.convertUnixToTime(values[4].data.sys.sunset) }
    </p>
    <p><b>Horoscope:</b> ${ values[5].data.horoscope }</p>
    <p><b>Date Fact:</b> ${ values[6].data }</p>
    <p>${ craigsListFormatter.returnHomeResultLinks(values[7].data) }</p>
  `;

  const gmailer = new Gmailer(html);
  gmailer.send();
});