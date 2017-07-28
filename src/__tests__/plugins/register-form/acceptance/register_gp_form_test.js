/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import practiceLookup from '../../../../shared/lib/practice-lookup';

const firstPractice = practiceLookup.getPractices()[0];

Feature('GP Registration Form');

Scenario('Test Start Page', (I) => {
  I.amOnPage('/');
  I.see('Apply to register with a GP practice');
  I.click(firstPractice.name);
  I.seeElement({css: '#start-button'});
  I.click('#start-button');
});
