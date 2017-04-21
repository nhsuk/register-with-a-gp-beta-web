import Joi from 'joi';
import moment from 'moment';

const validate = function(value){
  console.log("datevalue === "+ value);
  return moment(value, 'DDMMYYYY').isValid();
}
let DateConcat = '';

const invalidFullDateRule = {
  name: 'fulldate',
  description: 'should be a valid Date',
  validate(params, value, state, options){
    DateConcat = value.day.toString() + value.month.toString() + value.year.toString();
    if(validate(DateConcat)){
      return value;
    } else {
      return this.createError('object.fulldate', { v: value }, state, options);
    }
  }
};

export default {
  base: Joi.object(),
  name: 'object',
  language: {
    fulldate: 'date is not valid',
  },
  rules: [invalidFullDateRule]
};
