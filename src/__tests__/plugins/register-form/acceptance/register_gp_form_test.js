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

  I.see('What is your sex?');
  I.click('label[data-label=Male]');
  I.click('Continue');

  I.see('What is your name?');
  I.selectOption('Title','Mr');
  I.fillField('First name', 'George');
  I.fillField('Middle names', 'Alexander');
  I.fillField('Last name', 'Louis');
  I.click('Continue');

  I.see('What is your date of birth?');
  I.fillField('#input-day', '01');
  I.fillField('#input-month','12');
  I.fillField('#input-year','1976');
  I.click('Continue');
  //
  // I.see('Where were you born?');
  // I.selectOption('Country','United Kingdom');
  // I.fillField('Town or City', 'London');
  // I.click('Continue');
  //
  // I.see('What is your address?');
  // I.fillField('Postcode', 'SW1A1AA');
  // I.click('Find address');
  // I.waitForElement('#addresscontinue', 5);
  // I.click('button[type=submit]');
  //
  // I.see(`How can ${firstPractice.name} contact you?`);
  // I.fillField('#input-bestPhone','07779998833');
  // I.fillField('#input-backUpPhone','07779998833');
  // I.fillField('#input-email','test@test.com');
  // I.click('Continue');
  //
  // I.see('Have you served in the armed forces?');
  // I.click('label[data-label=No]');
  // I.click('Continue');
  //
  // I.see('Are you already registered with a GP?');
  // I.click('label[data-label=No]');
  // I.click('Continue');
  //
  // I.see('Are you taking any medication?');
  // I.click('label[data-label=No]');
  // I.click('Continue');
  //
  // I.see('Do you have any allergies?');
  // I.click('label[data-label=No]');
  // I.click('Continue');
  //
  // I.see('Have you ever had any of these conditions?');
  // I.click('label[data-label=Asthma]');
  // I.click('label[data-label=Cancer]');
  // I.click('label[data-label=Diabetes]');
  // I.fillField('#input-medical-history-0', 'FLU');
  // I.click('Add another condition');
  // I.waitForElement('#input-medical-history-1', 3);
  // I.fillField('#input-medical-history-1', 'Dyslexia');
  // I.fillField('#input-medical-history-details-0', 'Cardiology');
  // I.click('Add another surgery');
  // I.waitForElement('#input-medical-history-1', 3);
  // I.fillField('#input-medical-history-details-1', 'Dentist');
  // I.click('Continue');
  //
  // I.see('Check your details');
  // I.click('Send to surgery');
  //
  // I.see(`Your application has been sent to ${firstPractice.name}`);
});

//
// Scenario('Test all yes/no question with "yes" answer on gp registration flow', (I) => {
//   I.amOnPage('/');
//   I.see('Apply to register with a GP practice');
//   I.click(firstPractice.name);
//   I.seeElement({css: '#start-button'});
//   I.click('#start-button');
//
//   I.see('Do you know your NHS number?');
//   I.click('label[data-label=Yes]');
//   I.waitForElement('.nested-fields-container', 3);
//   I.fillField('NHS number', '943 476 5919');
//   I.click('Continue');
//
//   I.see('What is your sex?');
//   I.click('label[data-label=Female]');
//   I.click('Continue');
//
//   I.see('What is your name?');
//   I.selectOption('Title','Mrs');
//   I.fillField('First name', 'Elizabeth');
//   I.fillField('Middle names', 'Alexandra');
//   I.fillField('Last name', 'Mary');
//   I.click('Continue');
//
//   I.see('What is your date of birth?');
//   I.fillField('#input-day', '01');
//   I.fillField('#input-month','12');
//   I.fillField('#input-year','1976');
//   I.click('Continue');
//
//   I.see('Where were you born?');
//   I.selectOption('Country','United Kingdom');
//   I.fillField('Town or City', 'London');
//   I.click('Continue');
//
//   I.see('What is your address?');
//   I.fillField('Postcode', 'SW1A1AA');
//   I.click('Find address');
//   I.waitForElement('#addresscontinue', 5);
//   I.click('button[type=submit]');
//
//   I.see(`How can ${firstPractice.name} contact you?`);
//   I.fillField('#input-bestPhone','07779998833');
//   I.fillField('#input-backUpPhone','07779998833');
//   I.fillField('#input-email','test@test.com');
//   I.click('Continue');
//
//   I.see('Have you served in the armed forces?');
//   I.click('label[data-label=Yes]');
//   I.waitForElement('.nested-fields-container', 3);
//   I.fillField('Service or staff number', '11111112233');
//   I.fillField('Day', '11');
//   I.fillField('Month', '11');
//   I.fillField('Year', '2011');
//   I.click('Continue');
//
//   I.see('Are you already registered with a GP?');
//   I.click('label[data-label=Yes]');
//   I.fillField('#input-gp-lookup', 'South Chinnor');
//   I.waitForElement('#select-link-0', 5);
//   I.click('#select-link-0');
//   I.waitForElement('#selected-gp-summary', 5);
//   I.click('Continue');
//
//   // todo check selected GP data here
//   // I.see(`Are you registered at ${firstPractice.name} with this address?`);
//   I.click('label[data-label=Yes]');
//   I.click('Continue');
//
//   // todo check selected GP data here
//   // I.see(`Are you registered at ${firstPractice.name} with this address?`);
//   I.click('label[data-label=Yes]');
//   I.click('Continue');
//
//   I.see('Are you taking any medication?');
//   I.click('label[data-label=Yes]');
//   I.waitForElement('.nested-fields-container', 3);
//   I.fillField('#input-medications-0', 'Nurofen');
//   I.fillField('#input-medications-1', 'Vitamin');
//   I.click('Add another medication');
//   I.waitForElement('#input-medications-2', 3);
//   I.fillField('#input-medications-2', 'Pain Killer');
//   I.click('Continue');
//
//   I.see('Do you have any allergies?');
//   I.click('label[data-label=Yes]');
//   I.fillField('#input-allergies-0', 'Gluten');
//   I.fillField('#input-allergies-1', 'Hay fever');
//   I.click('Add another allergy');
//   I.waitForElement('#input-allergies-2', 3);
//   I.fillField('#input-allergies-2', 'pollen');
//   I.click('Continue');
//
//   I.see('Have you ever had any of these conditions?');
//   I.click('label[data-label=Asthma]');
//   I.click('label[data-label=Cancer]');
//   I.click('label[data-label=Diabetes]');
//   I.fillField('#input-medical-history-0', 'FLU');
//   I.click('Add another condition');
//   I.waitForElement('#input-medical-history-1', 3);
//   I.fillField('#input-medical-history-1', 'Dyslexia');
//   I.fillField('#input-medical-history-details-0', 'Cardiology');
//   I.click('Add another surgery');
//   I.waitForElement('#input-medical-history-1', 3);
//   I.fillField('#input-medical-history-details-1', 'Dentist');
//   I.click('Continue');
//
//   I.see('Check your details');
//   I.click('Send to surgery');
//
//   I.see(`Your application has been sent to ${firstPractice.name}`);
// });