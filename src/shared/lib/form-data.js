import Path from 'path';

import LoadFile from './load-file';

const DATA_PATH = Path.resolve(__dirname, '../../../data/formdata.json');

const FormData = {
  getFormData() {
    return LoadFile.readJson(DATA_PATH);
  }

};

export default FormData;
