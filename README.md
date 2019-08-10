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

Using Selenium:
```
env:
  global:
    - CXX=g++-4.8
    - DISPLAY=:99.0
    - CHROME_BIN=/usr/bin/google-chrome
addons:
  chrome: stable
before_install:
  - google-chrome-stable --headless --disable-gpu
before_script:
  - "sh -e /etc/init.d/xvfb start"
  - sleep 3 # give xvfb some time to start
  - sudo apt-get update
  - sudo apt-get install -y libappindicator1 fonts-liberation
  - wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  - sudo dpkg -i google-chrome*.deb
  - npm install --dev
  - npm run run & # to run my web server in the background
  - sleep 5 # give web server some time to start
cache:
  directories:
    - node_modules
```