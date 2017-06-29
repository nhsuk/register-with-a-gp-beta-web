const request = require('request');
const fs = require('fs');
const elasticsearch = require('../src/server/plugins/gp-lookup/elasticsearch');

const GPMedicalPracticesSourceURL = process.env.GPMedicalPracticesHost || 'https://raw.githubusercontent.com/nhsuk/general-medical-practices/master/output/general-medical-practices.json';


const GPMedicalPractitionersSourceURL = process.env.GPMedicalPracticesHost || 'https://raw.githubusercontent.com/nhsuk/general-medical-practitioners/master/output/general-medical-practitioners.json';


request(GPMedicalPracticesSourceURL, (error, response, body) => {
  if (response.statusCode === 200) {
    const practicesData = JSON.parse(body);
    request(GPMedicalPractitionersSourceURL, (error, response, body) => {
      const practitionersData = JSON.parse(body);
      transformPracticeData(practicesData, practitionersData);
    });
  }
});


function transformPracticeData(practicesData, practitionersData) {
  let practiceList = [];
  for(let i = 0; i < practicesData.length; i++){
    let practice = practicesData[i];

    let gpPractitioners = [];
    for(let c = 0; c < practitionersData.length; c++){
      let practitioner = practitionersData[c];
      let practiceCode = `general-medical-practice:${practice.organisation_code}`;

      if (practitioner.practice === practiceCode){
        gpPractitioners.push(practitioner);
      }
    }
    practice['practitioners'] = gpPractitioners;
    practiceList.push(practice);
  }
  savePracticeData(practiceList);
}

function savePracticeData(practiceList) {
  fs.writeFileAsync('data/practiceData.json', JSON.stringify(practiceList, null, 2));
}
