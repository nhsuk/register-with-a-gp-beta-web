const elasticsearch = require('elasticsearch');

const ES_HOST = process.env.ES_HOST || 'es';
const ES_PORT = process.env.ES_PORT || '9200';

function client() {
  return new elasticsearch.Client({host: `${ES_HOST}:${ES_PORT}`});
}

module.exports = client();

