import * as server from '../../../../server/index';

function stopServer(){
  setTimeout(function () {
    process.exit();
  }, 2000);
}

module.exports = {
  bootstrap: server.start,
  teardown: stopServer
};
