import Joi from 'joi';
import yourName from '../../../server/plugins/register-form/steps/your-name';


describe('name step schema', () => {
  it('should be valid', () => {
    return new Promise((resolve, reject) => {
      const validData = {
        'firstName': 'a',
        'lastName': 'b',
        'submit': 'submit'
      };

      Joi.validate(validData, yourName.schema, (err, value) => {
        if (err) {
          reject(err);
        }
        expect(value).toEqual({'firstName': 'a', 'lastName': 'b'});
        resolve();
      });
    });
  });
});
