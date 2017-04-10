import Path from 'path';
import Mock from 'mock-fs';

import { emailGP } from '../../../server/plugins/register-form/steps/summary';

describe('summary step', () => {
  afterEach(() => {
    Mock.restore();
    delete process.env.GP_EMAIL_GP_PRACTICE_1;
  });

  beforeEach(() => {
    Mock({
      [Path.resolve(__dirname, '../../../../data/')]: {
        'practices.json': JSON.stringify([
          {
            'key': 'gp-practice-1',
            'name': 'GP Practice 1',
          },
        ]),
      },
    });
  });

  it('should email not error when emailing text and practice key', () => {
    process.env.GP_EMAIL_GP_PRACTICE_1 = 'fake@email.org';

    return emailGP('gp-practice-1', 'Test email').then((args) => {
      expect(args.ewsFunction).toBe('CreateItem');
      expect(args.ewsArgs.Items.Message.Body.$value).toBe('Test email');
    });
  });

});
