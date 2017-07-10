const elasticsearch = require('elasticsearch');

const ES_HOST = process.env.ES_HOST_TEST || 'es';
const ES_PORT = process.env.ES_PORT_TEST || '9200';

function client() {
  return new elasticsearch.Client({host: `${ES_HOST}:${ES_PORT}`});
}

module.exports = client();

