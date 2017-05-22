import {dataTransformer, callLookup} from '../../../server/plugins/register-form/steps/home-address-lookup-choose';

describe('parsing address', () =>{
  it('should give back an object tree with parsed address', () => {
    const key = 'a';
    const value = {address: '1 Southcote Road,,,London,Greater London'};
    const stateData = {
      addressLookup: {
        postcode: 'NW1 5AE'
      }
    };
    const expectedObj = {
      'a': {
        'address': '1 Southcote Road,,,London,Greater London'
      },
      'address': {
        'address1': '1 Southcote Road',
        'address2': 'London',
        'address3': 'London',
        'locality': 'Greater London',
        'postcode': 'NW1 5AE'
      },
      'addressLookup': {
        'postcode': 'NW1 5AE',
      }
    };
    expect(dataTransformer(key, value, stateData)).toEqual(expectedObj);
  });
/*  
  it('should give back an object line parsed address', () => {
    const housenumber = 3;
    const postcode = 'SW170HG';
    const expectedObj = {
      'a': {
        'address': '3 Fountain Road,,,London,Greater London'
      },
      'address': {
        'address1': '3 Fountain Road',
        'address2': 'London',
        'address3': 'London',
        'locality': 'Greater London',
        'postcode': 'SW170HG'   
      },
      'addressLookup': {
        'postcode': 'SW170HG'
      }
    };
    const getAddresses = function(a, b){
      return a+b;
    };
    
    expect(callLookup(postcode, housenumber)).toEqual(expectedObj);
  });
*/
});