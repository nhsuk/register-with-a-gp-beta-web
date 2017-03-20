import Path from 'path';
import fs from 'fs';
import _ from 'lodash';

const DATA_PATH = Path.resolve(__dirname, '../../../data/practices.json');

function readJson(path) {
  const text = fs.readFileSync(require.resolve(path), 'utf8');
  return JSON.parse(text);
}

const PracticeLookup = {
  getPractices() {
    return readJson(DATA_PATH);
  },

  getPractice(path) {
    const practices = readJson(DATA_PATH);
    const practice = _.find(practices, { 'key': path });

    return practice;
  },
};

export default PracticeLookup;
