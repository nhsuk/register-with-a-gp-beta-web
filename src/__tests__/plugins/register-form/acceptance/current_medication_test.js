/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import currentMedicationStep from '../../../../server/plugins/register-form/steps/current-medication';
import practiceLookup from '../../../../shared/lib/practice-lookup';

const firstPractice = practiceLookup.getPractices()[0];

Feature('GP Registration Form');

Scenario('Test Current Medication validation error messages shows up', (I) => {
  I.amOnPage(`/${firstPractice.key}/register/${currentMedicationStep.slug}`);
  I.see('Are you taking any medication?');

  I.click('Continue');
  I.see('There’s a problem');
  I.see('Please answer this question');
});


Scenario('Test Current Medication submit for both choises(yes/no)', (I) => {
  I.amOnPage(`/${firstPractice.key}/register/${currentMedicationStep.slug}`);

  I.click('label[data-label=Yes]');
  I.waitForElement('.nested-fields-container', 3);
  I.fillField('#input-medications', 'FLU \n Dyslexia');
  I.click('Continue');
  I.see('Do you have any allergies?');

  I.amOnPage(`/${firstPractice.key}/register/${currentMedicationStep.slug}`);
  I.click('label[data-label=No]');
  I.click('Continue');
  I.see('Do you have any allergies?');
});