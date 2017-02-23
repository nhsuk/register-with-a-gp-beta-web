let server;

function startTestServer(context) {
  return new Promise((resolve) => {
    process.env.PORT = '0';
    server = require('../../server/');
    server.start().then((instance) => {
      context.runningInstance = instance;
      resolve();
    });
  });
}
function stopTestServer(instance) {
  server.stop(instance);
}
export {startTestServer, stopTestServer};
