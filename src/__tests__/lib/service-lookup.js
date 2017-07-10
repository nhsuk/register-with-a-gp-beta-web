const ServiceLookup = require('../../shared/lib/service-lookup');
jest.mock('./load-file');

describe('getService()', () => {
  it('should return true or false', () => {
//    console.log(lf.readJson());
    const data = ServiceLookup.getService();
console.log(data);    
//    expect(data).toEqual('true');
  });

});
