import _ from 'lodash';
import {summaryGetHandler} from '../../../server/plugins/register-form/steps/summary';
import {summaryPostHandler} from '../../../server/plugins/register-form/steps/summary';

describe('gethandler', () =>{
  it('should give back a', () => {
    const mockGet = jest.fn();
    mockGet.mockReturnValueOnce({
        state: {data: {name: 'dfdsfds'}}
    });
    const gReply = {
      view: function(a,b){ return 'a'; }
    };
    expect(summaryGetHandler(mockGet, gReply)).toBe('a');
  });
  
});