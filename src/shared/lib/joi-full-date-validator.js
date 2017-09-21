import Joi from 'joi';
import moment from 'moment';

const dValidate = function(value){
  return moment(value, 'DDMMYYYY').isValid();
};
let DateConcat = '';

const invalidFullDateRule = {
  name: 'fulldate',
  description: 'Please enter a valid date / month / year using numbers only',
  validate(params, value, state, options){
    let mm = '0' + value.month.toString();
    let dd = '0' + value.day.toString();
    mm = mm.slice(-2);
    dd = dd.slice(-2);
    DateConcat = dd + mm + value.year.toString();
    if(dValidate(DateConcat)){
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
    fulldate: 'Please enter a valid date using numbers only',
  },
  rules: [invalidFullDateRule]
};
