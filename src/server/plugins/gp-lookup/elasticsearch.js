const elasticsearchClient = require('./elasticsearchClient');
const GPlookupIndexName = process.env.GPlookupIndexName || 'gp-lookup';


let elasticsearch = {};

elasticsearch.indexName = GPlookupIndexName;

elasticsearch.createGPLookupSearchIndex = () => {
  return elasticsearchClient.indices.create({
    index: GPlookupIndexName,
    mapping: {
      practice: {
        name: {
          type: 'string'
        },
        organisation_code: {
          type: 'string'
        }
      }
    }
  });
};

elasticsearch.addToIndex = (id, type, document, next) => {
  elasticsearchClient.index({
    index: GPlookupIndexName,
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
    index: GPlookupIndexName,
    type: type,
    id: id.toString()
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.get = (type, id, next) => {
  elasticsearchClient.get({
    index: GPlookupIndexName,
    type: type,
    id: id.toString()
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.getAll = (type, next) => {
  elasticsearchClient.search({
    index: GPlookupIndexName,
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
    index: GPlookupIndexName,
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

module.exports = elasticsearch;