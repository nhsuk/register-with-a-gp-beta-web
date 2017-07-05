import {robotTextHandler, robotTextOptions} from '../../../server/plugins/static-files';

describe('Test robotTextHandler', () =>{
  const mockGet = jest.fn();
  const gReply = {
    view: function(){
      return gReply;
    },
    type: function(contentType){
      gReply.contentType = contentType;
      return gReply;
    }
  };

  it('Check robotTextHandler response content type is correct', () => {
    expect(robotTextHandler(mockGet(), gReply.view, robotTextOptions).contentType).toBe('text/plain');
  });
});