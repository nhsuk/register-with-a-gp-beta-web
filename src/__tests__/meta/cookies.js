import http from 'http';
import post from 'http-post';

import {startTestServer, stopTestServer, resolveUrl} from '../helpers';

beforeAll(() => {
  return startTestServer();
});

describe('cache headers', () => {

  it('should not return a cookie on start page', () => {
    // const server = context.runningInstance;
    return new Promise((resolve) => {
      http.get(resolveUrl('start'), res => {
        expect(res.statusCode).toEqual(200);
        expect('set-cookie' in res.headers).toBe(false);
        resolve();
      });
    });
  });

  it('should return a cookie after form post', () => {
    return new Promise((resolve) => {
      const data = {
        'first-name': 'a',
        'middle-names': '',
        'last-name': 'test'
      };
      post(
        resolveUrl('register-form:name'),
        data,
        res => {
          expect('set-cookie' in res.headers).toBe(true);
          resolve();
        });
    });
  });

});

afterAll(() => {
  return stopTestServer();
});
