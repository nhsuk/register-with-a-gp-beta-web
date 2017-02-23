import http from 'http';
import {startTestServer, stopTestServer} from './helpers';

const context = {};

beforeAll(() => {
  return startTestServer(context);
});

describe('http server', () => {
  it('should return a 200 status code', () => {
    return new Promise((resolve) => {
      http.get(`http://localhost:${context.runningInstance.info.port}/`, res => {
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/start');
        resolve();
      });
    });
  });
});

afterAll(() => {
  return stopTestServer(context.runningInstance);
});
