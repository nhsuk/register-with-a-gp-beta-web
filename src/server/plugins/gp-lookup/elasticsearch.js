const elasticsearchClient = require('./elasticsearchClient');
const GPlookupIndexName = process.env.GPlookupIndexName || 'gp-lookup';

let elasticsearch = {};

elasticsearch.add = (type, document, next) => {
  elasticsearchClient.create({
    index: GPlookupIndexName,
    type: type,
    id: document.id,
    timestamp: new Date().getTime(),
    body: document
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.update = (type, document, next) => {
  elasticsearchClient.index({
    index: GPlookupIndexName,
    type: type,
    id: document.id,
    timestamp: new Date().getTime(),
    body: document
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

module.exports = elasticsearch;