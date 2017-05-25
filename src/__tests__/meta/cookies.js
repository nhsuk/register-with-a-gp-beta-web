import request from 'request';

import {startTestServer, stopTestServer, resolveUrl} from '../helpers';

beforeAll(() => {
  return startTestServer();
});

describe('cache headers', () => {

  it('should not return a cookie on service start page', () => {
    // const server = context.runningInstance;
    return new Promise((resolve) => {
      request(resolveUrl('choose'), (err, res) => {
        expect(res.statusCode).toEqual(200);
        expect('set-cookie' in res.headers).toBe(false);
        resolve();
      });
    });
  });

  it('should return a cookie after form post', () => {
    return new Promise((resolve) => {
      request(resolveUrl('register-form:name'), (err, res) => {
        const csrf = /csrf=(.*?);/.exec(res.headers['set-cookie'])[1];
        const data = {
          'firstName': 'a',
          'middleNames': '',
          'lastName': 'test',
          csrf
        };

        request.post({
          url: resolveUrl('register-form:name'),
          headers: {
            Cookie: `csrf=${csrf}`
          },
          form: data
        }, (err, res2) => {
          expect(res2.statusCode).toBeLessThan(400);
          expect('set-cookie' in res.headers).toBe(true);
          resolve();
        });
      });
    });
  });

});

afterAll(() => {
  return stopTestServer();
});
