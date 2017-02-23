import http from 'http';
import {startTestServer, stopTestServer, resolveUrl} from '../helpers';

beforeAll(() => {
  return startTestServer();
});

describe('cache headers', () => {

  it('should return cache-control public on cacheable page', () => {
    return new Promise((resolve) => {
      http.get(resolveUrl('start'), res => {
        expect(res.statusCode).toEqual(200);
        expect(res.headers['cache-control']).toMatch(/public/);
        resolve();
      });
    });
  });

  it('should return cache-control max age on cacheable page', () => {
    return new Promise((resolve) => {
      http.get(resolveUrl('start'), res => {
        expect(res.statusCode).toEqual(200);
        expect(res.headers['cache-control']).toMatch(/max\-age=600/);
        resolve();
      });
    });
  });

  it('should return cache-control no-cache on non-cacheable page', () => {
    return new Promise((resolve) => {
      http.get(resolveUrl('register-form:name'), res => {
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
