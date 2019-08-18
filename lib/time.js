class Time {
    dayOfWeek() {
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
      
    convertUnixToTime(unix) { // https://momentjs.com/timezone/
        var date = new Date(unix * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
}

module.exports = Time;
