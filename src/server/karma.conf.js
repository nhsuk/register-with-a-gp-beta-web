/*global config*/


const configuration = {
	// other things

  customLaunchers: {
    Chrome_travis_ci: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  },
};

if (process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci'];
}

module.exports = (config) => {
  config.set(configuration);
};
