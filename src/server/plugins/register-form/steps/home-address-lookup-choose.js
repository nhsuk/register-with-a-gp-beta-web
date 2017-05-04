import _ from 'lodash';
import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import { postHandlerFactory, getPrevStep, getFieldData } from './common';
import {getAddresses} from '../../getaddressio/index';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const schema = Joi.object().keys({
  'address': Joi.string().max(150).label('Address').required(),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your address?';
const key = 'addressLookupChoose';
const slug = 'home-address-lookup-choose';

function formatAddressForDisplay(addressItem) {
  return _.join(_.compact(addressItem), ', ');
}

function getHandlerFactory(prevSteps) {
  return (request, reply) => {
    const postcodeData = _.get(request, 'state.data.addressLookup', {});
    const stepData = _.get(request, `state.data.${key}`, {});
    const prevStep = getPrevStep(prevSteps, request.state.data, request);
    const template = 'register-form/address-choose-step';
    getAddresses(postcodeData.postcode)
      .then(addressList => {
        const addressOptions = _.map(addressList, item => {
          return {label: formatAddressForDisplay(item), value: item};
        });
        return reply.view(template, {
          fields: getFieldData(schema),
          data: request.state.data,
          stepData,
          title,
          prevStep,
          addressOptions
        });
      })
      .catch(err => {
        throw err;
      });
  };
}

function joinStrStripEmpty(vals) {
  return _.join(_.compact(_.map(vals, x => _.trim(x))), ' ,');
}
function parseAddress(value, stateData) {
  const postcode = _.get(stateData, 'addressLookup.postcode');
  const [
    line1,
    line2,
    line3,
    line4,
    locality,
    townCity,
    county
  ] = value.split(',');

  return  {
    address1: joinStrStripEmpty([line1, line2]),
    address2: joinStrStripEmpty([line3, line4]),
    address3: joinStrStripEmpty([line4]),
    locality:  joinStrStripEmpty([locality, townCity, county]),
    postcode
  };
}

export function dataTransformer(key, value, stateData, template = {}) {
  // save into our own key
  const newData = Object.assign(template, stateData, {[key]: value});

  // transform into manual entry format and save into the address key
  return Object.assign(
    {},
    newData,
    {['address']: parseAddress(value.address, stateData)});
}

const handlers = {
  GET: getHandlerFactory,
  POST: (prevSteps, nextSteps) => postHandlerFactory(
    key,
    title,
    schema,
    prevSteps,
    nextSteps,
    {transformData: dataTransformer}
    )
};

const checkApplies = function(cookieData, direction) {
  return direction !== 'prev';
};

/**
 * @type Step
 */
export default {
  key,
  slug,
  title,
  schema,
  handlers,
  checkApplies
};
