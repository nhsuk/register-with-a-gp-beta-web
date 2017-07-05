import elasticsearch from '../../../server/plugins/gp-lookup/elasticsearch';

const testGPOrganisationID = 'A9999';
const testGPPostCode = 'TZ12 1NN';
const indexDataType = 'practice';
const testGPData = [
  {
    'organisation_code': testGPOrganisationID,
    'name': 'Test Surgery',
    'address': `The Health Centre, Bakery Street, Stockton, Cleveland, ${testGPPostCode}`,
    'contact_telephone_number': '1111 222222',
    'practitioners': [
      {
        'general_medical_practitioner_code': 'XX168324',
        'name': 'CF William',
        'practice': 'general-medical-practice:XX168324'
      },
    ]
  }
];

describe('Test ElasticSearch wrapper', () =>{
  const GPlookupIndexName = `gp-lookup-${process.env.NODE_ENV}`;
  elasticsearch.GPlookupIndexName = GPlookupIndexName;

  it('Should create and delete the search index', () => {
    elasticsearch.indexIsExists(elasticsearch.GPlookupIndexName, (err, exists) => {
      if (exists){
        elasticsearch.deleteIndex(elasticsearch.GPlookupIndexName, (err, res) => {
          expect(res.acknowledged).toEqual(true);
          elasticsearch.createGPLookupSearchIndex((err, res) => {
            expect(res.acknowledged).toEqual(true);
          });
        });
      }else{
        elasticsearch.createGPLookupSearchIndex((err, res) => {
          expect(res.acknowledged).toEqual(true);
          elasticsearch.deleteIndex(elasticsearch.GPlookupIndexName, (err, res) => {
            expect(res.acknowledged).toEqual(true);
          });
        });
      }
    });
  });

  it('Should update and search on the ES search index', () => {

    elasticsearch.deleteAllIndexes((err, res) => {

      elasticsearch.createGPLookupSearchIndex((err, res) => {
        if (err) {
          throw err;
        }
        let items = [];
        for(let i = 0; i < testGPData.length; i++){
          let practice = testGPData[i];
          items.push({index: {_index: elasticsearch.GPlookupIndexName,  _type: indexDataType, _id: practice.organisation_code}});
          items.push(practice);
        }

        elasticsearch.bulkUpdate(items, function (err, res) {
          const bulkUpdateItems = res.items && res.items[0];
          const search_query = {
            query: {
              multi_match: {
                query: testGPPostCode,
                fields: ['name^3', 'address^2', 'practitioners.name']
              }
            }
          };

          elasticsearch.search(indexDataType, search_query, (err, res) => {
            expect(bulkUpdateItems).to.have.be.keys([{'index': 1}]);
            expect(res.items).to.have.be.keys([{'hits': 1}]);
          });

        });
      });
    });
  });

});