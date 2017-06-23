const elasticsearchClient = require('./elasticsearchClient');

let elasticsearch = {};

elasticsearch.add = (type, document, next) => {
  elasticsearchClient.create({
    index: process.env.MAIN_INDICE,
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
    index: process.env.MAIN_INDICE,
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
    index: process.env.MAIN_INDICE,
    type: type,
    id: id.toString()
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.get = (type, id, next) => {
  elasticsearchClient.get({
    index: process.env.MAIN_INDICE,
    type: type,
    id: id.toString()
  }, (error, response) => {
    next(error, response);
  });
};

elasticsearch.getAll = (type, next) => {
  elasticsearchClient.search({
    index: process.env.MAIN_INDICE,
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