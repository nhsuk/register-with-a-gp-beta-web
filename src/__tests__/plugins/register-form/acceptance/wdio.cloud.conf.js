const config = require('./config');
const wdioConfig = require('./wdio.conf.js').config;

const project = 'nhsuk';
const build = 'nhsuk [23]';
const maxInstances = 1;
const seleniumVersion = '3.0.1';
const safariDriver = '2.48';


exports.config = (function headlessConfig(globalConfig) {
  globalConfig.user = config.browserstack.user;
  globalConfig.key = config.browserstack.key;

  globalConfig.maxInstances = 2;

  globalConfig.host = 'hub.browserstack.com';
  globalConfig.port = 80;

  globalConfig.capabilities = [
    {
      browserName: 'safari',
      os: 'OS X',
      os_version: 'El Capitan',
      project,
      build,
      maxInstances,
      'browserstack.selenium_version': seleniumVersion,
      'browserstack.safari.driver': safariDriver,
    }, {
      browserName: 'chrome',
      os: 'WINDOWS',
      os_version: '8.1',
      project,
      build,
      maxInstances,
      'browserstack.selenium_version': seleniumVersion,
    }, {
      browserName: 'firefox',
      os: 'WINDOWS',
      os_version: '8.1',
      project,
      build,
      maxInstances,
      'browserstack.selenium_version': seleniumVersion,
    }, {
      browserName: 'edge',
      os: 'Windows',
      os_version: '10',
      project,
      build,
      maxInstances,
      'browserstack.selenium_version': seleniumVersion,
    }, {
      browserName: 'ie',
      version: '9',
      os: 'Windows',
      os_version: '7',
      project,
      build,
      maxInstances,
      'browserstack.selenium_version': seleniumVersion,
    }, {
      browserName: 'ie',
      version: '8',
      os: 'Windows',
      os_version: '7',
      project,
      build,
      maxInstances,
      'browserstack.selenium_version': seleniumVersion,
    }, {
      browserName: 'iPhone',
      platform: 'MAC',
      device: 'iPhone 6S',
      project,
      build,
      maxInstances,
      'browserstack.selenium_version': seleniumVersion,
    }, {
      browserName: 'android',
      platform: 'ANDROID',
      device: 'Samsung Galaxy S5',
      project,
      build,
      maxInstances,
      'browserstack.selenium_version': seleniumVersion,
    }
  ];

  globalConfig.onPrepare = globalConfig.onComplete = globalConfig.afterTest = () => {};

  return globalConfig;
}(wdioConfig));
