/* eslint-disable no-console */
/* This command print the full registration journey URLs
as a schema for all practices, require by analysis team. */

import _ from 'lodash';
import steps from '../src/server/plugins/register-form/steps/index';
import practiceLookup from '../src/shared/lib/practice-lookup';
const baseDomain = 'https://register-with-a-gp-beta.service.nhs.uk';

let subStepContinue = false;
const practices = practiceLookup.getPractices();


_.each(practices, (p) => {
  console.log(p.name);
  console.log('\n');
  _.each(steps, (m) => {
    const check = _.get(m, 'checkApplies');
    const slug = _.get(m, 'slug');
    const url = `${baseDomain}/${p.key}/${slug}`;
    if (check){
      if (!subStepContinue){
        console.log(`|-----> ${url}`);
        subStepContinue = true;
      }else{
        console.log(`        ${url}`);
      }
    }else{
      console.log(`${url}`);
      subStepContinue = false;
    }
  });
  console.log('\n\n\n\n\n\n\n');
});