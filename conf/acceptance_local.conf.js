process.env['ACCEPTANCE_TEST'] = '1';
process.env['HOST'] = 'localhost';
process.env['PORT'] = '3333';
process.env['NODE_ENV'] = 'development';

exports.config = {
  tests: '../src/__tests__/plugins/register-form/acceptance/*_test.js',
  timeout: 10000,
  output: '../src/__tests__/plugins/register-form/acceptance/output/',
  helpers: {
    WebDriverIO: {
      url: 'http://localhost:3333',
      browser: 'chrome'
    }
  },
  include: {
    'I': '../src/__tests__/plugins/register-form/acceptance/steps_file.js'
  },
  bootstrap: '../src/__tests__/plugins/register-form/acceptance/app-server.js',
  teardown: '../src/__tests__/plugins/register-form/acceptance/app-server.js',
  name: 'Register-with-a-gp-beta-web acceptance tests'
};
