/* eslint-disable no-param-reassign */

const config = require('./wdio.conf.js').config;

exports.config = (function headlessConfig(globalConfig) {
  globalConfig.capabilities = [{
    browserName: 'Chrome_travis_ci',
  }];

  globalConfig.afterTest = () => {};

  return globalConfig;
}(config));
