let server;
let _runningInstance;

class ServerInstanceUndefined {
  constructor(message = 'Server Instance is Undefined') {
    this.name = 'ServerInstanceUndefined';
    this.message = message;
    this.stack = (new Error()).stack;
  }
}

function startTestServer(done) {
  return new Promise((resolve) => {
    server = require('../../../../server/');
    server.start().then((instance) => {
      _runningInstance = instance;
      instance.start((err) => {
        if (err) {
          throw err;
        }
        instance.log('info', 'Server running at: ' + instance.info.uri);
        resolve();
        done();
      });
    });
  });
}

function stopTestServer(done) {
  return new Promise((resolve) => {
    if (_runningInstance) {
      server.stop(_runningInstance).then(function () {
        resolve();
        done();
      });
    } else {
      throw ServerInstanceUndefined();
    }
  });
}


module.exports = {
  bootstrap: startTestServer,
  teardown: stopTestServer,
};
