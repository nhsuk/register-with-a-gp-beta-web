import Joi from 'joi';
import moment from 'moment';

const validate = function(value){
  return moment(value, 'DDMMYYYY').isValid();
};
let DateConcat = '';

const invalidFullDateRule = {
  name: 'fulldate',
  description: 'should be a valid Date',
  validate(params, value, state, options){
    let mm = "0" + value.month.toString();
    mm.slice(-2);
    DateConcat = value.day.toString() + mm + value.year.toString();
    console.log(DateConcat);
    if(validate(DateConcat)){
      return value;
    } else {
      return this.createError('object.fulldate', { v: value.day }, state, options);
    }
  }
};

export default {
  base: Joi.object(),
  name: 'object',
  language: {
    fulldate: 'Fulldate error',
  },
  rules: [invalidFullDateRule]
};
