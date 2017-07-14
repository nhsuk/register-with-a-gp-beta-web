const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const parser = require('ua-parser-js');
const config = require('../config');

function getUserAgentString() {
  return browser.execute(() => {
    return window.navigator.userAgent;
  }).value;
}

function getUserAgent() {
  return parser(getUserAgentString());
}

function saveErrorshot(test) {
  const agent = getUserAgent();
  const filename = `${agent.browser.name}-${agent.browser.major}-${agent.os.name}.png`;
  const testdir = path.resolve(config.webdriver.screenshotPath, test.parent, test.title);
  const filepath = path.resolve(testdir, filename);

  try {
    fs.accessSync(testdir, fs.F_OK);
  } catch (e) {
    mkdirp.sync(testdir);
  }

  browser.saveScreenshot(filepath);
}


module.exports = {
  getUserAgentString,
  getUserAgent,
  saveErrorshot,
};
