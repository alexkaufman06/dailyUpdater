const cheerio = require('cheerio');

class BillboardFormatter {
    returnSongResults(html) {
        const $ = cheerio.load(html);
        let emailHtml = '<b>Top 10 Buildboard Songs</b>:<br><br>\n';
        for (let i=1; i <= 10; i++) {
            emailHtml += $(`div.chart-list > ol > li:nth-child(${i}) > button > .chart-element__information > .chart-element__information__artist`).text();
            emailHtml += ': ';
            emailHtml += $(`div.chart-list > ol > li:nth-child(${i}) > button > .chart-element__information > .chart-element__information__song`).text();
            emailHtml += ' ';
            emailHtml += $(`div.chart-list > ol > li:nth-child(${i}) > button > .chart-element__information > .chart-element__information__delta > .text--default`).text();
            emailHtml += '<br>\n';
        }
        return emailHtml;
    }
}

module.exports = BillboardFormatter;