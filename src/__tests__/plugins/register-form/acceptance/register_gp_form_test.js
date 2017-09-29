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

  I.see('Where were you born?');
  I.selectOption('Country','United Kingdom');
  I.fillField('Town or City', 'London');
  I.click('Continue');

  I.see('What is your address?');
  I.fillField('Postcode', 'SW1W 9SZ');
  I.click('Find address');
  I.waitForElement('#select-link-0', 3);
  I.click('#select-link-0');
  I.waitForElement('#address-confirm', 3);
  I.click('Continue');

  I.see(`How can ${firstPractice.name} contact you?`);
  I.fillField('#input-bestPhone','07779998833');
  I.fillField('#input-backUpPhone','07779998833');
  I.fillField('#input-email','test@test.com');
  I.click('Continue');

  I.see('Have you served in the armed forces?');
  I.click('label[data-label=No]');
  I.click('Continue');

  I.see('Are you already registered with a GP?');
  I.click('label[data-label=No]');
  I.click('Continue');

  I.see('Are you taking any medication?');
  I.click('label[data-label=Yes]');
  I.waitForElement('.nested-fields-container', 3);
  I.fillField('#input-medications', 'FLU \n Dyslexia');
  I.click('Continue');

  I.see('Do you have any allergies?');
  I.click('label[data-label=Yes]');
  I.fillField('#input-allergies', 'Gluten\nHay fever');
  I.click('Continue');

  I.see('Have you ever had any of these conditions?');
  I.click('label[data-label=Asthma]');
  I.click('label[data-label=Cancer]');
  I.click('label[data-label=Diabetes]');
  I.fillField('#input-medical-history', 'Cardiology');
  I.fillField('#input-medical-history-details', 'Radiology');
  I.click('Continue');


  I.see('Check your details');
  I.click('Send to surgery');

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

  I.see('What is your sex?');
  I.click('label[data-label=Female]');
  I.click('Continue');

  I.see('What is your name?');
  I.selectOption('Title','Mrs');
  I.fillField('First name', 'Elizabeth');
  I.fillField('Middle names', 'Alexandra');
  I.fillField('Last name', 'Mary');
  I.click('Continue');

  I.see('What is your date of birth?');
  I.fillField('#input-day', '01');
  I.fillField('#input-month','12');
  I.fillField('#input-year','1976');
  I.click('Continue');

  I.see('Where were you born?');
  I.selectOption('Country','United Kingdom');
  I.fillField('Town or City', 'London');
  I.click('Continue');

  I.see('What is your address?');
  I.fillField('Postcode', 'SW1W 9SZ');
  I.click('Find address');
  I.waitForElement('#select-link-0', 3);
  I.click('#select-link-0');
  I.waitForElement('#address-confirm', 3);
  I.click('Continue');

  I.see(`How can ${firstPractice.name} contact you?`);
  I.fillField('#input-bestPhone','07779998833');
  I.fillField('#input-backUpPhone','07779998833');
  I.fillField('#input-email','test@test.com');
  I.click('Continue');

  I.see('Have you served in the armed forces?');
  I.click('label[data-label=Yes]');
  I.waitForElement('.nested-fields-container', 3);
  I.fillField('Service or staff number', '11111112233');
  I.fillField('Day', '11');
  I.fillField('Month', '11');
  I.fillField('Year', '2011');
  I.click('Continue');

  I.see('Are you already registered with a GP?');
  I.click('label[data-label=Yes]');
  I.fillField('#input-gp-lookup', 'South Chinnor');
  I.waitForElement('#select-link-0', 5);
  I.click('#select-link-0');
  I.waitForElement('#selected-gp-summary', 5);
  I.click('Continue');

  // todo selected GP data here
  // I.see(`Are you registered at ${firstPractice.name} with this address?`);
  I.click('label[data-label=Yes]');
  I.click('Continue');

  // todo selected GP data here
  I.click('label[data-label=Yes]');
  I.click('Continue');

  I.see('Are you taking any medication?');
  I.click('label[data-label=Yes]');
  I.waitForElement('.nested-fields-container', 3);
  I.fillField('#input-medications', 'FLU \n Dyslexia');
  I.click('Continue');

  I.see('Do you have any allergies?');
  I.click('label[data-label=Yes]');
  I.fillField('#input-allergies', 'Gluten\nHay fever');
  I.click('Continue');

  I.see('Have you ever had any of these conditions?');
  I.click('label[data-label=Asthma]');
  I.click('label[data-label=Cancer]');
  I.click('label[data-label=Diabetes]');

  I.fillField('#input-medical-history', 'Cardiology');
  I.fillField('#input-medical-history-details', 'Radiology');
  I.click('Continue');

  I.see('Check your details');
  I.click('Send to surgery');

});

Scenario.only('test all mandatory fields',(I)=>{

  I.amOnPage('/');
  I.see('Apply to register with a GP practice');
  I.click(firstPractice.name);
  I.seeElement({css: '#start-button'});
  I.click('#start-button');

  I.see('Do you know your NHS number?');
  I.click('Continue');
  I.seeElement({css: ".callout--error"});
  I.see('There was a problem submitting this page');
  I.click('label[data-label=No]');
  I.click('Continue');
  I.click({css:".button--back"});
  I.see('Do you know your NHS number?');
  I.click('label[data-label=Yes]');
  I.waitForElement('.nested-fields-container', 3);
  I.click('Continue');
  I.see('Please enter a valid NHS number - it’s a 10 digit number');
  I.fillField('NHS number', '943 476 5919');
  I.click('Continue');

  I.see('What is your sex?');
  I.click('Continue');
  I.waitForElement({css: ".callout--error"},5);
  I.click('label[data-label=Female]');
  I.click('Continue');

  I.see('What is your name?');
  I.click('Continue');
  I.waitForElement({css: ".callout--error"},5);
  I.see('Please select a title');
  I.see('Please enter your first name');
  I.see('Please enter your last name');
  I.click('#input-nameTitle');
  I.selectOption('Title','Mrs');
  I.click('#input-firstName');
  I.fillField('First name', 'Elizabeth');
  I.click('#input-lastName');
  I.fillField('Last name', 'Mary');
  I.click('Continue');

  I.see('What is your date of birth?');
  I.click('Continue');
  I.seeElement({css: ".callout--error"});
  I.fillField('#input-day', '01');
  I.fillField('#input-month','12');
  I.fillField('#input-year','0000');
  I.click('Continue');
  I.see("Please enter a year after 1885");
  I.fillField('#input-year','1980');
  I.click('Continue');  

  I.see('Where were you born?');
  I.selectOption('Country','United Kingdom');
  I.click('Continue');
  I.see("Please enter your town or city");
  I.fillField('Town or City', 'London');
  I.click('Continue');

  I.see('What is your address?');//todo
  I.fillField('Postcode', 'SW1W 9SZ');
  I.click('Find address');
  I.waitForElement('#select-link-0', 3);
  I.click('#select-link-0');
  I.waitForElement('#address-confirm', 3);
  I.click('Continue');
  
  I.see(`How can ${firstPractice.name} contact you?`);
  I.click('Continue');
  I.waitForElement({css: ".callout--error"},5);
  I.see("Please enter a phone number");
  I.fillField('#input-bestPhone','07779998833');// valid phone number validation is missing
  I.click('Continue');

  I.see('Have you served in the armed forces?');
  I.click('Continue');
  I.waitForElement({css: ".callout--error"},3);
  I.click('label[data-label=Yes]');
  I.waitForElement('.nested-fields-container', 3);
  I.click('Continue');
  I.waitForElement({css: ".callout--error"},3);
  I.fillField('Service or staff number', '11111112233');
  I.fillField('Day', '11');
  I.fillField('Month', '11');
  I.fillField('Year', '2011');
  I.click('Continue');

  I.see('Are you already registered with a GP?');
  I.click('Continue');
  I.seeElement({css: ".callout--error"},3);
  I.click('label[data-label=Yes]');
  I.click({css: '.details__summary'});
  I.waitForElement({css: '#input-manual-gp-name'},5);
  I.fillField('#input-manual-gp-name', ' P T Morris & Partners');
  I.fillField('#input-manualPostcode', 'OL3 7EQ');
  I.click('Continue');
  I.waitForElement({css : '.callout--medium'},3);
  //I.see('Are you registered at ${firstPractice.name} with this address?');
  I.click('label[data-label=No]');
  I.click('Continue');
  I.see('What was your address?');
  I.click('Continue');
  I.seeElement({css: ".callout--error"},3);
  I.see('Please enter a postcode');
  I.fillField('#input-postcode','SW3 6NA');
  I.click('Continue');
   //I.see(`Are you registered at ${firstPractice.name} with this name?`);
  I.waitForElement({css: ".registered-name"},10);
  I.see("Mrs Elizabeth Mary");
  I.click('Continue');
  I.seeElement({css: ".callout--error"},3);
  I.click('label[data-label=Yes]');
  I.click('Continue');


  I.see('Are you taking any medication?');
  I.click('Continue');
  I.seeElement({css: ".callout--error"},3);
  I.click('label[data-label=No]');
  I.click('Continue');

  I.see('Do you have any allergies?');
  I.click('Continue');
  I.seeElement({css: ".callout--error"},3);
  I.click('label[data-label=No]');
  I.click('Continue');

  I.see('Have you ever had any of these conditions?');


  
  


});