#!/bin/bash

cat > conf/acceptance_cloud.conf.js << EOL
exports.config = {
  tests: '../src/__tests__/plugins/register-form/acceptance/*_test.js',
  timeout: 10000,
  output: '../src/__tests__/plugins/register-form/acceptance/output/',
  helpers: {
    WebDriverIO: {
      host: 'hub-cloud.browserstack.com',
      url: 'https://register-with-a-gp.staging.beta.nhschoices.net',
      user: '$BROWSERSTACK_USERNAME',
      key: '$BROWSERSTACK_ACCESS_KEY',
      browser: 'chrome',
      desiredCapabilities: {
        browserName: 'chrome'
      },

      capabilities: [
        {
          browserName: 'chrome',
        }
      ],
      coloredLogs: true,
      waitforTimeout: 10000
    }
  },
  include: {
    'I': '../src/__tests__/plugins/register-form/acceptance/steps_file.js'
  },
  mocha: {},
  name: 'Register-with-a-gp-beta-web acceptance tests'
};
EOL
