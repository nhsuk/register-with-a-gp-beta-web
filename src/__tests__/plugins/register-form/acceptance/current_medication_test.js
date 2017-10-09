/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import currentMedicationStep from '../../../../server/plugins/register-form/steps/current-medication';
import practiceLookup from '../../../../shared/lib/practice-lookup';

const firstPractice = practiceLookup.getPractices()[0];

Feature('GP Registration Form');


Scenario('Test Current Medication submit for both choises(yes/no)', (I) => {
  I.amOnPage('/fakeform/K76hgyO76655ghkH'+'?url='+`/${firstPractice.key}/register/${currentMedicationStep.slug}`);

  I.click('label[data-label=Yes]');
  I.waitForElement('.nested-fields-container', 3);
  I.fillField('#input-medications', 'FLU \n Dyslexia');
  I.click('Continue');
  I.see('Do you have any allergies?');

  I.amOnPage('/fakeform/K76hgyO76655ghkH'+'?url='+`/${firstPractice.key}/register/${currentMedicationStep.slug}`);
  I.click('label[data-label=No]');
  I.click('Continue');
  I.see('Do you have any allergies?');
});