import {summaryGetHandler} from '../../../server/plugins/register-form/steps/summary';

describe('gethandler', () =>{
  const mockGet = jest.fn();
  mockGet.mockReturnValueOnce({
    state: {data: {medicalHistory: 'c'}},
    params: {practice: 'b'}
  });
  const gReply = {
    view: function(a,b){
      return a + JSON.stringify(b.data);
    },
    redirect: function(a){
      return a;
    }
  };
  it('should give back register-form/summary{\"medicalHistory\":\"c\"}', () => {
    expect(summaryGetHandler(mockGet(), gReply)).toBe('register-form/summary{\"medicalHistory\":\"c\"}');
  });
  it('should give back a redirect to nhs-number', () => {
    expect(summaryGetHandler(mockGet(), gReply)).toBe('/b/register/nhs-number');
  });
  it('should give back a redirect to nhs-number', () => {
    expect(summaryGetHandler(mockGet(), gReply)).toBe('/b/register/nhs-number');
  });
});