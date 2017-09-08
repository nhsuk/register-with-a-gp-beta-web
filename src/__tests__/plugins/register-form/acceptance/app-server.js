import * as server from '../../../../server/index';

module.exports = {
  bootstrap: server.start,
  teardown: () => {
    setTimeout(() => {
      process.exit();
    }, 1000);
  },
};
