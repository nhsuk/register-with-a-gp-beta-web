import {robotTextHandler, robotTextOptions} from '../../../server/plugins/static-files';

describe('gethandler', () =>{
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

  it('check robotTextHandler response content type ', () => {
    expect(robotTextHandler(mockGet(), gReply.view, robotTextOptions).contentType).toBe('text/plain');
  });
});