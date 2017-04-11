import homeAddress from '../../../server/plugins/register-form/steps/home-address';
import { validate } from '../../../server/plugins/register-form/steps/common';


describe('home address step schema', () => {

  it('should be valid', () => {
    return new Promise((resolve, reject) => {
      const validData = {
        'address1': 'a',
        'address2': 'b',
        'address3': 'c',
        'locality': 'd',
        'submit': 'submit'
      };

      validate(validData, homeAddress.schema)
        .then(value => {
          expect(value).toEqual({
            'address1': 'a',
            'address2': 'b',
            'address3': 'c',
            'locality': 'd'
          });
          resolve();
        })
        .catch(err => reject(err));
    });
  });
});
