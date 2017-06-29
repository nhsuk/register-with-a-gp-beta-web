const request = require('request');
const path = require('path');
const fs = require('fs');

const elasticsearch = require('../src/server/plugins/gp-lookup/elasticsearch');

const GPMedicalPracticesSourceURL = process.env.GPMedicalPracticesHost || 'https://raw.githubusercontent.com/nhsuk/general-medical-practices/master/output/general-medical-practices.json';

const GPMedicalPractitionersSourceURL = process.env.GPMedicalPracticesHost || 'https://raw.githubusercontent.com/nhsuk/general-medical-practitioners/master/output/general-medical-practitioners.json';

const appRootPath = path.dirname(__dirname);
const practiceDataPath = path.join(appRootPath, 'data/practiceData.json');

// request(GPMedicalPracticesSourceURL, (error, response, body) => {
//   if (response.statusCode === 200) {
//     const practicesData = JSON.parse(body);
//     request(GPMedicalPractitionersSourceURL, (error, response, body) => {
//       const practitionersData = JSON.parse(body);
//       transformPracticeData(practicesData, practitionersData);
//     });
//   }
// });
//

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
  fs.writeFile(practiceDataPath, JSON.stringify(practiceList, null, 2), function (err) {
    if (err) {
      throw err;
    }
    console.log(`${practiceDataPath} file saved`);
  });
}

function loadDataFromFile() {
  return fs.readFileSync(practiceDataPath,'utf8');
}

let data = loadDataFromFile();
updatePracticesSearchIndex(data);

function updatePracticesSearchIndex(data) {
  let items = [];
  elasticsearch.deleteIndex('gp-lookup', function (err, res) {

    elasticsearch.createGPLookupSearchIndex(function (err, res) {
      if (err) {
        throw err;
      }

      console.log('Created practice search index.');
      const practitionersData = JSON.parse(data)
      for(let i = 0; i < practitionersData.length; i++){
        let practice = practitionersData[i];
        items.push({index: {_index: elasticsearch.practiceIndexName,  _type: 'practice', _id: practice.organisation_code}});
        items.push(practice);
        console.log(practice.name);
        if (i > 1000){
          break;
        }
      }

      elasticsearch.bulkUpdate(items, function (err, res) {
        if (err) {
          throw err;
        }
        console.log(res);
        console.log('All practice data indexed.');
      });
    });
  });
}