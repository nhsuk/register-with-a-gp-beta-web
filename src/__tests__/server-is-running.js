const http = require('http');
const randomPort = require('random-port');

let server;
let running_instance;


beforeAll(() => {
  return new Promise((resolve) => {
    randomPort({from: 3000}, (port) => {
      process.env.PORT = port.toString();
      server = require('../server/');
      server.start().then((instance) => {
        running_instance = instance;
        resolve();
      });
    });
  });

});

describe('http server', () => {

  it.only('should return a 200 status code', () => {
    return new Promise((resolve) => {
      http.get(`http://localhost:${process.env.PORT}/`, res => {
        expect(res.statusCode).toEqual(200);
        resolve();
      });
    });
  });
});

afterAll(() => {
  return server.stop(running_instance);
});
