import {summaryGetHandler} from '../../../server/plugins/register-form/steps/summary';

describe('gethandler', () =>{
  const mockGet = jest.fn();
  mockGet.mockReturnValueOnce({
    state: {data: {medicalHistory: 'c'}},
    params: {practice: 'b'}
  });
  mockGet.mockReturnValueOnce({
    state: {},
    params: {practice: 'b'}
  });
  mockGet.mockReturnValueOnce({
    state: {data: {}},
    params: {practice: 'b'}
  });
  const gReply = {
    view: function(a,b){
      const r = a + b;
      this.unstate = function(a=r){
        return a;
      };
      return this;
    },
    redirect: function(a){
      return a;
    }
  };
  gReply.view.prototype.unstate = function(a) {
    return a;
  };

  it('should give back register-form/summary{\"fromsummaryTo"}', () => {
    expect(summaryGetHandler(mockGet(), gReply)).toBe('fromSummaryTo');
  });
  it('should give back a redirect to nhs-number', () => {
    expect(summaryGetHandler(mockGet(), gReply)).toBe('/b/register/nhs-number');
  });
  it('should give back a redirect to nhs-number', () => {
    expect(summaryGetHandler(mockGet(), gReply)).toBe('/b/register/nhs-number');
  });
});