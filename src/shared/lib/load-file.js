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

    if (contents !== null) {
      return JSON.parse(contents);
    } else {
      return contents;
    }
  },
};

export default LoadFile;
