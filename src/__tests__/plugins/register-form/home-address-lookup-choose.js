import {dataTransformer} from '../../../server/plugins/register-form/steps/home-address-lookup-choose';

describe('parsing address', () =>{
  it('should fail', () => {
    const key = 'a';
    const value = {address: '1 Southcote Road,,,London,Greater London'};
    
    const stateData = {
      addressLookup: {
        postcode: 'NW1 5AE'
      }
    };
    const expectedObj = {
      "a": {
        "address": "1 Southcote Road,,,London,Greater London"
      },
      "address": {
        "address1": "1 Southcote Road",
        "address2": "London",
        "address3": "London",
        "locality": "Greater London",
        "postcode": "NW1 5AE"
      },
      "addressLookup": {
        "postcode": "NW1 5AE",
      }
    };
    expect(dataTransformer(key, value, stateData)).toEqual(expectedObj);    
  });
  
});