const defineSupportCode = require('cucumber').defineSupportCode;
const assert = require('assert');

defineSupportCode(function({ Given, When, Then }) {
  
  Given(/^I have navigated to my website$/, function() {
    browser.url('http://alexkaufman06.github.io');
  });

  When('I click the ABOUT ME button', function () {
    const getStartedButton = $('.btn-xl');
    getStartedButton.click();
    browser.pause(1500);
    browser.saveScreenshot('./features/errorShots/about-me.png');
  });

  Then('I expect that the title of the page is correct', function() {
    var title = browser.getTitle();
    assert.equal(title, "Alex Kaufman | Portfolio");
  });

});