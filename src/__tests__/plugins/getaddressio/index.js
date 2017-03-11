import {getAddresses} from '../../../server/plugins/getaddressio/index';

jest.mock('https');


const expectedData = [
  ['1 Southcote Road', '', '', 'London', 'Greater London'],
  ['1a Southcote Road', '', '', 'London', 'Greater London'],
  ['2a Southcote Road', '', '', 'London', 'Greater London'],
  ['2b-2c Southcote Road', '', '', 'London', 'Greater London'],
  ['3 Southcote Road', '', '', 'London', 'Greater London'],
  ['4a Southcote Road', '', '', 'London', 'Greater London'],
  ['4b Southcote Road', '', '', 'London', 'Greater London'],
  ['5 Southcote Road', '', '', 'London', 'Greater London'],
  ['6 Southcote Road', '', '', 'London', 'Greater London'],
  ['7a Southcote Road', '', '', 'London', 'Greater London'],
  ['7b Southcote Road', '', '', 'London', 'Greater London'],
  ['8 Southcote Road', '', '', 'London', 'Greater London'],
  ['9 Southcote Road', '', '', 'London', 'Greater London'],
  ['10 Southcote Road', '', '', 'London', 'Greater London'],
  ['10a Southcote Road', '', '', 'London', 'Greater London'],
  ['11 Southcote Road', '', '', 'London', 'Greater London']
];


describe('gett addresses from postcode', () => {

  it('should return ordered data', () => {
    return getAddresses('NW1 5AE').then(addresses => {
      expect(addresses).toEqual(expectedData);
    });
  });

});
