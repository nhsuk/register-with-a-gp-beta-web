let server;
let _runningInstance;

class ServerInstanceUndefined {
  constructor(message = 'Server Instance is Undefined') {
    this.name = 'ServerInstanceUndefined';
    this.message = message;
    this.stack = (new Error()).stack;
  }
}

function startTestServer(context = {}) {
  return new Promise((resolve) => {
    process.env.PORT = '0';
    server = require('../../server/');
    server.start().then((instance) => {
      context.runningInstance = _runningInstance = instance;
      resolve();
    });
  });
}
function stopTestServer(instance = _runningInstance) {
  if (instance) {
    server.stop(instance);
  } else {
    throw ServerInstanceUndefined();
  }
}

function resolveUrl(
  id,
  instance = _runningInstance,
  params = {}) {
  const relativeUrl = instance.aka(id, params);
  return `http://localhost:${instance.info.port}${relativeUrl}`;
}

export {startTestServer, stopTestServer, resolveUrl};
