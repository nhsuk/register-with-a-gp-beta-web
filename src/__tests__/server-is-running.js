import request from 'request';
import {startTestServer, stopTestServer, resolveUrl} from './helpers';

const context = {};

beforeAll(() => {
  return startTestServer(context);
});

describe('http server', () => {
  it('should return a 200 status code', () => {
    return new Promise((resolve) => {
      request(resolveUrl('start'), (err,res) => {
        expect(res.statusCode).toEqual(200);
        resolve();
      });
    });
  });
});

afterAll(() => {
  return stopTestServer(context.runningInstance);
});
