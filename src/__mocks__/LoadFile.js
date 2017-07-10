const LoadFile = jest.genMockFromModule('./load-file');

LoadFile.prototype.readJson = () => {
  return JSON.stringify({ enabled: 'false'});
};


module.exports = LoadFile;