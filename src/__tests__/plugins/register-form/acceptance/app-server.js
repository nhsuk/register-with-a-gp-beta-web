import * as server from '../../../../server/index';

module.exports = {
  bootstrap: server.start,
  teardown: process.exit,
};
