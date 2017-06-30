const request = require('request');
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');

const elasticsearch = require('../src/server/plugins/gp-lookup/elasticsearch');

const GPMedicalPracticesSourceURL = process.env.GPMedicalPracticesHost || 'https://raw.githubusercontent.com/nhsuk/general-medical-practices/master/output/general-medical-practices.json';

const GPMedicalPractitionersSourceURL = process.env.GPMedicalPracticesHost || 'https://raw.githubusercontent.com/nhsuk/general-medical-practitioners/master/output/general-medical-practitioners.json';

const appRootPath = path.dirname(__dirname);
const practiceDataPath = path.join(appRootPath, 'data/practiceData.json');

const requestAsync = Promise.promisify(request);

Promise.all([requestAsync(GPMedicalPracticesSourceURL), requestAsync(GPMedicalPractitionersSourceURL)])
    .then(function(allData) {
      const practicesData = JSON.parse(allData[0].body);
      const practitionersData = JSON.parse(allData[1].body);
      transformPracticeData(practicesData, practitionersData);
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
  fs.writeFile(practiceDataPath, JSON.stringify(practiceList, null, 2), function (err) {
    if (err) {
      throw err;
    }
    let data = loadDataFromFile();
    updatePracticesSearchIndex(data);
  });
}

function loadDataFromFile() {
  return fs.readFileSync(practiceDataPath,'utf8');
}

function updatePracticesSearchIndex(data) {
  let items = [];
  elasticsearch.deleteIndex(elasticsearch.GPlookupIndexName, function (err, res) {
    elasticsearch.createGPLookupSearchIndex(function (err, res) {
      if (err) {
        throw err;
      }

      const practitionersData = JSON.parse(data);
      for(let i = 0; i < practitionersData.length; i++){
        let practice = practitionersData[i];
        items.push({index: {_index: elasticsearch.GPlookupIndexName,  _type: 'practice', _id: practice.organisation_code}});
        items.push(practice);
      }

      elasticsearch.bulkUpdate(items, function (err, res) {
        if (err) {
          throw err;
        }
        console.log('All practice data are indexed.');
      });
    });
  });
}