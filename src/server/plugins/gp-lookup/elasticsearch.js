const elasticsearchClient = require('./elasticsearchClient');

const ES_MAPPINGS = {
  mappings: {
    practice: {
      properties: {
        name: {
          type: 'string'
        },
        organisation_code: {
          type: 'string',
          index: 'no'
        },
        address: {
          type: 'string'
        },
        contact_telephone_number: {
          type: 'string',
          index: 'no'
        },
        practitioners: {
          type: 'nested',
          properties: {
            general_medical_practitioner_code: {
              type: 'string',
              index: 'no'
            },
            name: {
              type: 'string',
            },
            practice: {
              type: 'string',
              index: 'no',
            }
          }
        }
      }
    }
  }
};

let elasticsearch = {};

elasticsearch.GPlookupIndexName = process.env.GPlookupIndexName || 'gp-lookup';

elasticsearch.createGPLookupSearchIndex = (next) => {
  return elasticsearchClient.indices.create({
    index: elasticsearch.GPlookupIndexName,
    body: ES_MAPPINGS
  }, next);
};

elasticsearch.indexIsExists = (name, next) => {
  return elasticsearchClient.indices.exists({
    index: name,
  }, next);
};

elasticsearch.addToIndex = (id, type, document, next) => {
  elasticsearchClient.index({
    index: elasticsearch.GPlookupIndexName,
    type: type,
    id: id,
    body: document,
    timestamp: new Date().getTime()
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.bulkUpdate = (items, next) => {
  elasticsearchClient.bulk({
    body: items
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.delete = (type, id, next) => {
  elasticsearchClient.delete({
    index: elasticsearch.GPlookupIndexName,
    type: type,
    id: id.toString()
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.get = (type, id, next) => {
  elasticsearchClient.get({
    index: elasticsearch.GPlookupIndexName,
    type: type,
    id: id.toString()
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.getAll = (type, next) => {
  elasticsearchClient.search({
    index: elasticsearch.GPlookupIndexName,
    type: type,
    body: {
      query: {
        match_all: {}
      }
    }
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.search = (type, query, next) => {
  elasticsearchClient.search({
    index: elasticsearch.GPlookupIndexName,
    type: type,
    body: query
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.deleteIndex = (name, next) => {
  elasticsearchClient.indices.delete({
    index: name
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.deleteAllIndexes = (next) => {
  elasticsearchClient.indices.delete({
    index: '_all'
  }, (error, response) => {
    next(error, response);
  });
};

module.exports = elasticsearch;