const ApiCaller = require('./apiCaller');
const Gmailer = require('./gmailer');
const Time = require('./time');

const apiCaller = new ApiCaller();
const time = new Time();

Promise.all(apiCaller.getPromises()).then((values) => {
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
    <p>Horoscope: ${ JSON.stringify(values[5].data.horoscope) }</p>
  `;

  const gmailer = new Gmailer(html);
  gmailer.send();
});