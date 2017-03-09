import {emailGP} from '../../../server/plugins/register-form/steps/summary';


describe('summary step', () => {

  it('should email not error when emailing text', () => {
    return emailGP('Test email').then((args) => {
      expect(args.ewsFunction).toBe('CreateItem');
      expect(args.ewsArgs.Items.Message.Body.$value).toBe('Test email');
    });
  });

});
