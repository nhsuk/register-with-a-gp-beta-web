/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import practiceLookup from '../../../../shared/lib/practice-lookup';

const firstPractice = practiceLookup.getPractices()[0];

Feature('GP Registration Form');

Scenario('Test all yes/no question with "no" answer on gp registration flow', (I) => {
  I.amOnPage('/');
  I.see('Apply to register with a GP practice');
  I.click(firstPractice.name);
  I.seeElement({css: '#start-button'});
  I.click('#start-button');

  I.see('Do you know your NHS number?');
  I.click('label[data-label=No]');
  I.click('Continue');
});


Scenario('Test all yes/no question with "yes" answer on gp registration flow', (I) => {
  I.amOnPage('/');
  I.see('Apply to register with a GP practice');
  I.click(firstPractice.name);
  I.seeElement({css: '#start-button'});
  I.click('#start-button');

  I.see('Do you know your NHS number?');
  I.click('label[data-label=Yes]');
  I.waitForElement('.nested-fields-container', 3);
  I.fillField('NHS number', '943 476 5919');
  I.click('Continue');
});