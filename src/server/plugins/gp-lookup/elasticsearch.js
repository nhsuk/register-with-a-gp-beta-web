const elasticsearchClient = require('./elasticsearchClient');

const GPlookupIndexName = process.env.GPlookupIndexName;


const ES_MAPPINGS = {
  'mappings': {
    'gps': {
      'properties': {
        'address': {
          'properties': {
            'addressLines': {
              'type': 'text',
              'fields': {
                'keyword': {
                  'type': 'keyword',
                  'ignore_above': 256
                }
              }
            },
            'postcode': {
              'type': 'text',
              'fields': {
                'keyword': {
                  'type': 'keyword',
                  'ignore_above': 256
                }
              }
            }
          }
        },
        'displayName': {
          'type': 'text',
          'fields': {
            'keyword': {
              'type': 'keyword',
              'ignore_above': 256
            }
          }
        },
        'doctors': {
          'type': 'nested',
          'properties': {
            'name' : {
              'type': 'string',
              'analyzer': 'gp_name_analyzer'
            }
          }
        },
        'location' : {
          'properties' : {
            'coordinates' : {
              'type' : 'geo_point'
            }
          }
        },
        'name': {
          'type': 'text',
          'fields': {
            'keyword': {
              'type': 'keyword',
              'ignore_above': 256
            }
          }
        }
      }
    }
  }
};

let elasticsearch = {};

elasticsearch.GPlookupIndexName = GPlookupIndexName;

elasticsearch.createGPLookupSearchIndex = (next) => {
  return elasticsearchClient.indices.create({
    index: GPlookupIndexName,
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
    index: GPlookupIndexName,
    type: type,
    id: id,
    body: document,
    timestamp: new Date().getTime()
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