import Path from 'path';
import Mock from 'mock-fs';

import PracticeLookup from '../../shared/lib/practice-lookup';

describe('PracticeLookup library', () => {
  afterEach(() => {
    Mock.restore();
  });

  beforeEach(() => {
    Mock({
      [Path.resolve(__dirname, '../../../data/')]: {
        'practices.json': JSON.stringify([
          {
            'key': 'gp-practice-1',
            'name': 'GP Practice 1',
          },{
            'key': 'gp-practice-2',
            'name': 'GP Practice 2',
          },
        ]),
      },
    });
  });

  describe('getPractices()', () => {

    it('should return all practices', () => {
      const data = PracticeLookup.getPractices();

      expect(data).toEqual([
        {
          'key': 'gp-practice-1',
          'name': 'GP Practice 1',
        },{
          'key': 'gp-practice-2',
          'name': 'GP Practice 2',
        },
      ]);
    });

  });

  describe('getPractice()', () => {

    describe('when a practice exists', () => {

      it('should return a single practice', () => {
        const data = PracticeLookup.getPractice('gp-practice-1');

        expect(data).toEqual({
          'key': 'gp-practice-1',
          'name': 'GP Practice 1',
        });
      });

    });

    describe('when a practice doesn\'t exist', () => {

      it('should return a single practice', () => {
        const data = PracticeLookup.getPractice('made-up-name');

        expect(data).toBe(undefined);
      });

    });

  });

});
