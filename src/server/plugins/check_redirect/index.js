var Plugin = {};
import {stepDependency} from './../register-form/steps';
//import {whichStep} from './../register-form/steps/common';

Plugin.register = function(server, options, next) {
  server.ext('onPreResponse', function (request, reply) {
    const url = request.url.path;
    const regIndex = url.indexOf('/register/');
//    const assetIndex = url.indexOf('/assets/');
//    const staticIndex = url.indexOf('/static/');
    const confirmIndex = url.indexOf('/register/confirm-details');
    if(regIndex > -1) {
      if(! (confirmIndex > -1)){
        const slug = url.substr(regIndex + 10);
        const jumpBack = request.state.fromSummaryTo;
        if(jumpBack !== undefined ){
          if(jumpBack !== slug){
            if(stepDependency[jumpBack] !== undefined){
              const dep = stepDependency[jumpBack];
              let found = false;
              dep.forEach((d) => {
                if(d == slug){
                  found = true;
                }
              });
              if(!found ){
                return reply
                  .redirect('/' + request.params.practice + '/register/confirm-details');
              }
            } else {
              return reply
                .redirect('/' + request.params.practice + '/register/confirm-details');
            }
          }
        }
      }
    }
    return reply.continue();
  });
  next();
};

Plugin.register.attributes = {
  name: 'check_redirect',
  version: '0.1'
};

module.exports = Plugin;