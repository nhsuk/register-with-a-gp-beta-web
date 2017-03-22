import Path from 'path';
import _ from 'lodash';

import LoadFile from './load-file';

const DATA_PATH = Path.resolve(__dirname, '../../../data/practices.json');

const PracticeLookup = {
  getPractices() {
    return LoadFile.readJson(DATA_PATH);
  },

  getPractice(path) {
    const practices = LoadFile.readJson(DATA_PATH);
    const practice = _.find(practices, { 'key': path });

    return practice;
  },
};

export default PracticeLookup;
