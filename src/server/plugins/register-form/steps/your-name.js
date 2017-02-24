import Joi from 'joi';

const fields = [
  {id: 'first-name', label: 'First name'},
  {id: 'middle-names', label: 'Middle names'},
  {id: 'last-name', label: 'Last name'}
];

const schema = Joi.object().keys({
  'first-name': Joi.string(),
  'middle-names': Joi.string(),
  'last-name': Joi.string(),
  'submit': Joi.any().optional().strip()
}).or('first-name', 'middle-names', 'last-name');

const title = 'What is your name?';
const key = 'name';

const handlers = {
  GET: (request, reply) => {
    request.log(['cookie'], request.state.data);
    return reply
      .view('register-form/step', {fields: fields});
  },
  POST: (request, reply) => {
    // if form valid then redirect to next step
    // else return normal template with form.errors in context
    return reply
      .redirect(request.aka('register-form:name'))
      .state('data', {[key]: request.payload});
  }
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};
const nameStep = [key, exports.options];

export default nameStep;
