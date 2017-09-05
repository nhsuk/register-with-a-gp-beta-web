let server;
let _runningInstance;

class ServerInstanceUndefined {
  constructor(message = 'Server Instance is Undefined') {
    this.name = 'ServerInstanceUndefined';
    this.message = message;
    this.stack = (new Error()).stack;
  }
}

function startTestServer(context = {}) {
  return new Promise((resolve) => {
    process.env.PORT = '0';
    server = require('../../server/');
    server.start().then((instance) => {
      context.runningInstance = _runningInstance = instance;
      resolve();
    });
  });
}
function stopTestServer(instance = _runningInstance) {
  if (instance) {
    server.stop(instance);
  } else {
    throw ServerInstanceUndefined();
  }
}

function resolveUrl(
  id,
  instance = _runningInstance) {
  let relativeUrl = '/';
  if(id.length > 0){
    relativeUrl = '/peel-croft-surgery/'+ id;
  }
  return `http://localhost:${instance.info.port}${relativeUrl}`;
}

const GPLookupData = [{'_index':'gp-lookup','_type':'practice','_id':'J81032','_score':22.547205,'_source':{'organisation_code':'J81032','name':'Newland Surgery','address':'Newland Surgery, Grove Med Ctr, Wootton Gr, Sherborne, Dorset, DT9 4DL','contact_telephone_number':'01935 813438','practitioners':[]}}];

function getMockedGPLookupData() {
  return JSON.stringify(GPLookupData);
}


export {startTestServer, stopTestServer, resolveUrl, getMockedGPLookupData};
