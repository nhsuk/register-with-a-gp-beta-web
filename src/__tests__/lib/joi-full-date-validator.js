import JoiBase from 'joi';
import JoiFullDateExt from '../../../src/shared/lib/joi-full-date-validator';
const Joi = JoiBase.extend(JoiFullDateExt);

describe('full date validator', () => {

  it('should be valid', () => {
    const FullDate = Joi.object().fulldate();
    const result = Joi.validate({day: 21, month: 11, year: 1980}, FullDate);
    expect(result.error).toBe(null);
  });

  it('should not be valid', () => {
    const FullDate = Joi.object().fulldate();
    const result = Joi.validate({day: 30, month: 2, year: 1982}, FullDate);
    expect(result.error.name).toBe('ValidationError');
  });

});
