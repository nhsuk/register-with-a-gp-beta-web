import * as server from "../../../../server/index";
const event = require('codeceptjs').event;


// codeceptJS not calling 'teardown' hook when acceptance tests failed.
// That's why this codeceptJS event handler killing Hapi server process
event.dispatcher.on(event.test.failed, function () {
  process.exit();
});


module.exports = {
  bootstrap: server.start,
  teardown: () => {
    process.exit();
  },
};
