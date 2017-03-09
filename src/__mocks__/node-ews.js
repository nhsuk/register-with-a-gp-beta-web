const EWS = jest.genMockFromModule('node-ews');


EWS.prototype.run = (ewsFunction, ewsArgs) => {
  return new Promise((resolve) => {
    process.nextTick(() => {
      resolve({
        ewsFunction: ewsFunction,
        ewsArgs: ewsArgs
      });
    });
  });
};

export default EWS;
