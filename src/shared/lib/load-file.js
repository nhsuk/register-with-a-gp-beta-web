import fs from 'fs';

const LoadFile = {
  readJson(filepath) {
    let contents;

    try {
      fs.accessSync(filepath, fs.F_OK);
      contents = fs.readFileSync(filepath, 'utf8').trim();
    } catch (e) {
      contents = null;
    }

    return JSON.parse(contents);
  },
};

export default LoadFile;
