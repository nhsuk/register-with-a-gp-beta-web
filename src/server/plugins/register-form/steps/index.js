import nameStep from './your-name';
import genderStep from './gender';
import dateOfBirthStep from './date-of-birth';
import homeAddressLookupStep from './home-address-lookup';
import homeAddressLookupPickStep from './home-address-lookup-choose';
import homeAddressStep from './home-address';
import contactDetailsStep from './contact-details';
import previouslyArmedStep from './previously-armed';
import armedStaffNumberStep from './armed-staff-number';
import armedEnlistDateStep from './armed-enlist-date';
import previouslyRegisteredStep from './previously-registered';
import currentGP from './current-gp';
import enterGpAddress from './current-gp-address';
import registeredAddressStep from './registered-address';
import registeredAddressDetailsStep from './registered-address-details';
import registeredNameStep from './registered-name';
import registeredNameDetailsStep from './registered-name-details';
import nhsNumberStep from './nhs-number';
import nhsNumberDetailsStep from './nhs-number-details';
import currentMedicationStep from './current-medication';
import currentMedicationDetailsStep from './current-medication-details';
import allergiesStep from './allergies';
import allergiesDetailsStep from './allergies-details';
import medicalHistoryStep from './medical-history';
import countryAndTown from './countries-and-town';
import summaryStep from './summary';
/**
 * @typedef {object} InputField
 * @property {string} ID - maps to HTML element ID
 * @property {string} label - maps to HTML <label> text
 * @property {string} type - maps to HTML <input> type
 */

/**
 * A step in the registration journey
 * Each step will map to a page with a form that renders the defined
 * @Step#fields
 *
 * @typedef {object} Step
 * @property {string} key - a unique ID for url-helpers like request.aka.
 * @property {string} slug - slug used to make up the last part of the url
 * @property {string} title - Title of the page and what is asked to the user,
 * this is also slugified into the url for the page.
 * @property {string} beforeTemplate - A template to include before the fields
 * @property {object} schema - a Joi schema to validate the supplied data
 * against.
 * @property {object} handlers - a GET and POST handler, typically created
 * using the postHandlerFactory and getHandlerFactory defined in 'common.js'.
 * @property {Function} [checkApplies] - function that checks if this step
 * should be run.
 */

/**
 * A list of registration @Steps, where order is important because
 * that will control the order in which they'll be asked.
 * @type {Array.<Step>}
 */
const steps = [
  nhsNumberStep,
  nhsNumberDetailsStep,
  genderStep,
  nameStep,
  dateOfBirthStep,
  homeAddressLookupStep,
  homeAddressLookupPickStep,
  homeAddressStep,
  countryAndTown,
  contactDetailsStep,
  previouslyArmedStep,
  armedStaffNumberStep,
  armedEnlistDateStep,
  previouslyRegisteredStep,
  currentGP,
  enterGpAddress,
  registeredAddressStep,
  registeredAddressDetailsStep,
  registeredNameStep,
  registeredNameDetailsStep,
  currentMedicationStep,
  currentMedicationDetailsStep,
  allergiesStep,
  allergiesDetailsStep,
  medicalHistoryStep,
  summaryStep
];

export const stepDependency = {
  'nhs-number': [
    'nhs-number-details'
  ],
  'home-address-lookup': [
    'home-address-manual',
    'home-address-lookup-choose'
  ],
  'previously-armed': [
    'armed-staff-number',
    'armed-enlist-date'
  ],
  'previously-registered': [
    'registered-address',
    'registered-address-manual',
    'registered-name',
    'registered-name-details'
  ],
  'current-medication': [
    'current-medication-details',
  ],
  'allergies': [
    'allergies-details'
  ]
};
export default steps;