const cheerio = require('cheerio');

class BillboardFormatter {
    returnSongResults(html) {
        const $ = cheerio.load(html);
        let emailHtml = '<p><b><u>Top 10 Buildboard Songs:</u></b></p>\n';
        for (let i=1; i <= 10; i++) {
            emailHtml += '<b>'
            emailHtml += $(`div.chart-list > ol > li:nth-child(${i}) > button > .chart-element__information > .chart-element__information__artist`).text();
            emailHtml += ':</b> ';
            emailHtml += $(`div.chart-list > ol > li:nth-child(${i}) > button > .chart-element__information > .chart-element__information__song`).text();
            emailHtml += ' (';
            emailHtml += $(`div.chart-list > ol > li:nth-child(${i}) > button > .chart-element__information > .chart-element__information__delta > .text--default`).text();
            emailHtml += ')<br>\n';
        }
        return emailHtml;
    }
}

module.exports = BillboardFormatter;