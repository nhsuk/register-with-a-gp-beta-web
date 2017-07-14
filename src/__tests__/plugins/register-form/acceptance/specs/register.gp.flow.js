/*global $*/
const ContentPage = require('../pageobjects/content.page');
const config = require('../config');

describe('a content page', () => {
  it('should contain a local header', () => {
    ContentPage.open();
    ContentPage.header.isVisible().should.be.true;
  });

  it('should contain a heading level 1', () => {
    ContentPage.open();
    ContentPage.h1.isVisible().should.be.true;
  });

  it('Test all yes/no question with "no" answer on gp registration flow', () => {
    browser.url('/');
    $('a=Wallington Family Practice').click();
    $('a=Start').click();

    /*Do you know your NHS number?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*What is your sex?*/
    $('label=Male').click();
    ContentPage.nextStep();

    /*What is your name?*/
    $('#input-nameTitle').selectByValue('Mr');
    browser.setValue('#input-firstName', 'George');
    browser.setValue('#input-middleNames', 'Alexander');
    browser.setValue('#input-lastName', 'Louis');
    ContentPage.nextStep();

    /*What is your date of birth?*/
    browser.setValue('#input-day', '01');
    browser.setValue('#input-month', '12');
    browser.setValue('#input-year', '1976');
    ContentPage.nextStep();

    /*What is your address?*/
    browser.setValue('#input-postcode', 'SW1A1AA');
    ContentPage.nextStep();
    /*Select your address*/
    ContentPage.nextStep();

    /*How can the GP contact you?*/
    browser.setValue('#input-bestPhone', '07779998833');
    browser.setValue('#input-email', 'test@test.com');
    ContentPage.nextStep();

    /*Have you served in the armed forces?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*Are you already registered with a GP?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*Are you taking any medication?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*Do you have any allergies?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*Have you ever had any of these conditions?*/
    $('label=Asthma').click();
    $('label=Cancer').click();
    $('label=Diabetes').click();
    ContentPage.nextStep();

    /*Check your details*/
    $('#sendBtn').click();
    browser.pause(1000);

  });

  it('Test all yes/no question with "yes" answer on gp registration flow', () => {
    browser.url('/');
    $('a=Wallington Family Practice').click();
    $('a=Start').click();

    /*Do you know your NHS number?*/
    $('label=Yes').click();
    ContentPage.nextStep();

    /*What is your NHS number?*/
    browser.setValue('#input-nhs-number', '943 476 5919');
    ContentPage.nextStep();

    /*What is your sex?*/
    $('label=Female').click();
    ContentPage.nextStep();

    /*What is your name?*/
    $('#input-nameTitle').selectByValue('Mrs');
    browser.setValue('#input-firstName', 'Elizabeth');
    browser.setValue('#input-middleNames', 'Alexandra');
    browser.setValue('#input-lastName', 'Mary');
    ContentPage.nextStep();

    /*What is your date of birth?*/
    browser.setValue('#input-day', '01');
    browser.setValue('#input-month', '12');
    browser.setValue('#input-year', '1976');
    ContentPage.nextStep();

    /*What is your address?*/
    browser.setValue('#input-postcode', 'SW1A1AA');
    ContentPage.nextStep();
    /*Select your address*/
    ContentPage.nextStep();

    /*How can the GP contact you?*/
    browser.setValue('#input-bestPhone', '07779998833');
    ContentPage.nextStep();

    /*Have you served in the armed forces?*/
    $('label=Yes').click();
    ContentPage.nextStep();

    /*What was your service or staff number?*/
    browser.setValue('#input-armedStaffNumber', '11111112233');
    ContentPage.nextStep();

    /*When did you enlist?*/
    browser.setValue('#input-day', '01');
    browser.setValue('#input-month', '01');
    browser.setValue('#input-year', '2010');
    ContentPage.nextStep();

    if (!config.skipGPAutoCompleteTests){
      /*Are you already registered with a GP?*/
      $('label=Yes').click();
      ContentPage.nextStep();

      /*What is the name and address of your current GP practice?*/
      browser.setValue('#gp-search', 'peelcroft');
      browser.waitForVisible('.result', 5000);
      browser.click('.result');
      ContentPage.nextStep();

      /*Are you registered at Lifton Surgery with this address?*/
      $('label=Yes').click();
      ContentPage.nextStep();

      /*Are you registered at the GP with this name?*/
      $('label=Yes').click();
      ContentPage.nextStep();
    }else{
      $('label=No').click();
      ContentPage.nextStep();
    }

    /*Are you taking any medication?*/
    $('label=Yes').click();
    ContentPage.nextStep();

    /*List your regular medicines*/
    browser.setValue('#input-medication', 'Lorem Ipsum is simply dummy text');
    ContentPage.nextStep();

    /*Do you have any allergies?*/
    $('label=Yes').click();
    ContentPage.nextStep();

    /*List your allergies*/
    browser.setValue('#input-allergies', 'Lorem Ipsum is simply dummy text');
    ContentPage.nextStep();

    /*Have you ever had any of these conditions?*/
    $('label=Asthma').click();
    $('label=Cancer').click();
    $('label=Diabetes').click();
    ContentPage.nextStep();

    /*Check your details*/
    $('#sendBtn').click();
    browser.pause(1000);

  });

});
