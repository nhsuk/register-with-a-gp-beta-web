const path = require('path');

const port = process.env.PORT || 3333;
const screenshotPath = path.resolve(__dirname, '..', 'acceptance', 'report', 'screenshots');
const reportPath = path.resolve(__dirname, '..', 'acceptance', 'report');

module.exports = {
  root: path.normalize(`${__dirname}/..`),
  env: process.env.NODE_ENV || 'development',
  ci: process.env.CI,
  skipGPAutoCompleteTests: !process.env.SKIP_GP_AUTOCOMPLETE_ACCEPTANCE_TEST,
  port,
  logLevel: process.env.LOG_LEVEL || 'warn',
  webdriver: {
    baseUrl: process.env.WDIO_BASEURL || 'http://localhost:3333',
    screenshotPath: process.env.WDIO_SCREENSHOTPATH || screenshotPath,
    reportOutput: process.env.WDIO_REPORTPATH || reportPath,
  },
  browserstack: {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY
  },
};
