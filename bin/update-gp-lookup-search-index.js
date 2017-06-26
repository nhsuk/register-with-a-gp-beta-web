const request = require('request');
const elasticsearch = require('../src/server/plugins/gp-lookup/elasticsearch');

const GPMedicalPracticesSourceURL = process.env.GPMedicalPracticesHost || 'https://raw.githubusercontent.com/nhsuk/general-medical-practices/master/output/general-medical-practices.json';
const GPMedicalPractitionersSourceURL = process.env.GPMedicalPracticesHost || 'https://raw.githubusercontent.com/nhsuk/general-medical-practitioners/master/output/general-medical-practitioners.json';

request(GPMedicalPracticesSourceURL, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const importedJSON = JSON.parse(body);
    updateGPMedicalPractices(importedJSON);
  }
});

function ESResponse(error, reponse){
  console.log(error);
  console.log(reponse);
}

function updateGPMedicalPractices(data) {
  for(let i = 0; i < data.length; i++){
    let pratice = data[i];
    setTimeout(function () {
      elasticsearch.add(i, 'string', pratice.name, ESResponse);
    },1000);
  }
}
