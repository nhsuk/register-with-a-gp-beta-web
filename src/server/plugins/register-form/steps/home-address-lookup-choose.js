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
    let addressError = false;
    let inputValue = '';
    callLookup(postcodeData.postcode, postcodeData.houseNumber)
      .then(addressOptions => {
        if(addressOptions.length ===0){
          addressError = true;
          callLookup(postcodeData.postcode)
          .then(addressOptions => {
             reply.view(template, {
              fields: getFieldData(schema),
              data: request.state.data,
              stepData,
              title,
              prevStep,
              addressOptions,
              error: addressError,
              postcode: postcodeData.postcode,
              housenumber: postcodeData.houseNumber
            });
          });
        }
        else{
          if(addressOptions.length == 1){
            inputValue = addressOptions[0].value;
          }
          reply.view(template, {
            fields: getFieldData(schema),
            data: request.state.data,
            stepData,
            title,
            prevStep,
            addressOptions,
            value: inputValue,
            error: addressError
          });
        }      
      });
  };
}

function callLookup(pcode,hnumber=''){
  return getAddresses(pcode, hnumber)
    .then(addressList => {
      if(addressList.length === 0){
       return [];
      }
      const addressOpts = _.map(addressList, item => {
        return {label: formatAddressForDisplay(item), value: item};
      });
      return addressOpts;
    })
    .catch(err => {throw err;});
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

function dataTransformer(key, value, stateData, template = {}) {
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
