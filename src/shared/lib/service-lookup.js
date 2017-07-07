import Path from 'path';
import LoadFile from './load-file';

const DATA_PATH = Path.resolve(__dirname, '../../../data/service.json');

const ServiceLookup = {
  getService() {
    const service = LoadFile.readJson(DATA_PATH);
    const enabled = service.enabled;

    return enabled;
  },
};

export default ServiceLookup;
