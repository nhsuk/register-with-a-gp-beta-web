import http from 'http';
import {startTestServer, stopTestServer, resolveUrl} from '../helpers';

beforeAll(() => {
  return startTestServer();
});

describe('cache headers', () => {

  it('should return cache-control no-cache on non-cacheable page', () => {
    return new Promise((resolve) => {
      http.get(resolveUrl('register-form:nhsNumber'), res => {
        expect(res.statusCode).toEqual(200);
        expect(res.headers['cache-control']).toMatch(/no\-cache/);
        resolve();
      });
    });
  });

});

afterAll(() => {
  return stopTestServer();
});
