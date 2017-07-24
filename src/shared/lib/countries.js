import Path from 'path';

import LoadFile from './load-file';

const DATA_PATH = Path.resolve(__dirname, '../../../data/countries.json');

const COUNTRIES = LoadFile.readJson(DATA_PATH);

export default COUNTRIES;