import Path from 'path';
import Mock from 'mock-fs';

import LoadFile from '../../shared/lib/load-file';

describe('LoadFile library', () => {
  afterEach(() => {
    Mock.restore();
  });

  describe('load a JSON file', () => {

    describe('when file exists', () => {
      beforeEach(() => {
        Mock({
          [Path.resolve(__dirname, 'test')]: {
            'data.json': JSON.stringify([ { 'foo': 'bar' } ]),
          },
        });
      });

      it('should return a JavaScript object', () => {
        const data = LoadFile.readJson(Path.resolve(__dirname, 'test', 'data.json'));

        expect(data).toEqual([ {'foo': 'bar'} ]);
      });
    });

    describe('when file doesn\'t exists', () => {
      it('should return null', () => {
        const data = LoadFile.readJson(Path.resolve(__dirname, 'test', 'not-exist.json'));

        expect(data).toBe(null);
      });
    });

  });

});
