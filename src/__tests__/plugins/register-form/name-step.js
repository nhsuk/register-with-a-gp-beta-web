import Joi from 'joi';
import yourName from '../../../server/plugins/register-form/steps/your-name';


describe('name step schema', () => {
  it('should be valid', () => {
    return new Promise((resolve, reject) => {
      const validData = {
        'first-name': 'a',
        'last-name': 'b',
        'submit': 'submit'
      };

      Joi.validate(validData, yourName.schema, (err, value) => {
        if (err) reject(err);
        expect(value).toEqual({'first-name': 'a', 'last-name': 'b'});
        resolve();
      });
    });
  });
});
