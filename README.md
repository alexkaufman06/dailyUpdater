# Daily Updater [![Build Status](https://travis-ci.com/alexkaufman06/dailyUpdater.svg?branch=master)](https://travis-ci.com/alexkaufman06/dailyUpdater)

The goal of this repository is to gather data every morning and email to interested users. Some examples of data that might be useful include:

* Weather
  * Local and elsewhere
* Stock Market
* CraigsList
* Traffic

## Travis CI Customization

Running Multiple Jobs:
```
jobs:
  include:
    - stage: email
      script: 
        - npm run email
    - stage: test
      script: 
        - npm run test
```