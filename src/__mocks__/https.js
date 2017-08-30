import {EventEmitter} from 'events';

const https = jest.genMockFromModule('https');


const mockResponseData = {
  'Addresses': [
    ['1 Southcote Road', '', '', 'London', 'Greater London'],
    ['10 Southcote Road', '', '', 'London', 'Greater London'],
    ['10a Southcote Road', '', '', 'London', 'Greater London'],
    ['11 Southcote Road', '', '', 'London', 'Greater London'],
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
    ['9 Southcote Road', '', '', 'London', 'Greater London']
  ]
};

const mockedGet = jest.fn((options, callback) => {
  const response = new EventEmitter();
  response.statusCode = 200;
  response.statusMessage = 'OK';
  callback(response);
  response.emit('data', JSON.stringify(mockResponseData));
  response.emit('end');
});

https.get = mockedGet;

export default https;