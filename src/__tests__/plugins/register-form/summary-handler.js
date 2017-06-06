import {summaryGetHandler} from '../../../server/plugins/register-form/steps/summary';

describe('gethandler', () =>{
  it('should give back a', () => {
    const mockGet = jest.fn();
    mockGet.mockReturnValueOnce({
      state: {data: {name: 'dfdsfds'}}
    });
    const gReply = {
      view: function(a,b){
        return a + JSON.stringify(b.data);
      },
      redirect: function(a,b){
        return a+JSON.stringify(b.data);
      }
    };
    expect(summaryGetHandler(mockGet, gReply)).toBe('register-form/summary{}');
  });

});