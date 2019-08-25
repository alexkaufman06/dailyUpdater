const cheerio = require('cheerio');

class CraigsListFormatter {

    returnHomeResultLinks(html) {
        const $ = cheerio.load(html);
        const numberOfHomes = $('#sortable-results > ul > li > a').length - 1;
        let emailHtml = '';
        for (let i=0; i < numberOfHomes; i++) {
            emailHtml += $(`#sortable-results > ul > li:nth-child(${i}) > p > a`) + 
                         $(`#sortable-results > ul > li:nth-child(${i}) > a`).text() + 
                         '<br><br>\n';
        }
        return emailHtml;

        // THIS MIGHT BE USEFUL LATER
        // const test = $('#sortable-results > ul').find('li')
        //                 .text()
        //                 .trim()
        //                 .split(' ');
    }
}

module.exports = CraigsListFormatter;
