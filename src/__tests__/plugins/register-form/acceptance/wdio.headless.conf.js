/* eslint-disable no-param-reassign */

const config = require('./wdio.conf.js').config;

exports.config = (function headlessConfig(globalConfig) {
  globalConfig.capabilities = [{
    browserName: 'phantomjs',
  }];

  globalConfig.afterTest = () => {};

  return globalConfig;
}(config));
