import nameStep from './your-name';
import dateOfBirthStep from './date-of-birth';
import homeAddressStep from './home-address';
import contactEmailStep from './contact-email';
import contactTelephoneStep from './contact-telephone';
import previouslyRegisteredStep from './previously-registered';
import previousAddressStep from './previous-address';
import previousNameStep from './previous-name';
import nhsNumberStep from './nhs-number';
import currentMedicationStep from './current-medication';
import allergiesStep from './allergies';
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
 * @property {string} title - Title of the page and what is asked to the user,
 * this is also slugified into the url for the page.
 * @property {[InputField]} fields - list of fields with data required.
 * @property {Array.<InputField>} fields - list of fields with data required.
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
  nameStep,
  dateOfBirthStep,
  homeAddressStep,
  contactEmailStep,
  contactTelephoneStep,
  // armed forces?
  previouslyRegisteredStep,
  previousAddressStep,
  previousNameStep,
  nhsNumberStep,
  currentMedicationStep,
  allergiesStep,
  summaryStep
];

export default steps;
