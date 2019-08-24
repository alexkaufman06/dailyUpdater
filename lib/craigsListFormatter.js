const cheerio = require('cheerio');

class CraigsListFormatter {

    returnHomeResultLinks(html) {
        const $ = cheerio.load(html);

        let results = $('#sortable-results > ul > li > a');
        return results;
    }
}

module.exports = CraigsListFormatter;
