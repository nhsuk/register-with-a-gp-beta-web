import JoiBase from 'joi';
import JoiNHSNumberExt from '../../../src/shared/lib/joi-nhs-number-validator';
const Joi = JoiBase.extend(JoiNHSNumberExt);

describe('nhs number validator', () => {

  it('should be valid', () => {
    const nhsNumber = Joi.string().nhsnumber();
    const result = Joi.validate('9434765919', nhsNumber);
    expect(result.error).toBe(null);
  });

  it('should not be valid', () => {
    const nhsNumber = Joi.string().nhsnumber();
    const result = Joi.validate('943476591', nhsNumber);
    expect(result.error.name).toBe('ValidationError');
  });

  it('should strip non numbers and be valid', () => {
    const nhsNumber = Joi.string().nhsnumber();
    const result = Joi.validate('94 347 6 5919', nhsNumber);
    expect(result.value).toBe('9434765919');
    expect(result.error).toBe(null);
  });

  it('should not strip non numbers if convert is false', () => {
    const testNum = '94 347 6 5919';
    const nhsNumber = Joi.string().nhsnumber();
    const result = Joi.validate(testNum, nhsNumber, {convert: false});
    expect(result.value).toBe(testNum);
    expect(result.error.name).toBe('ValidationError');
  });

});
