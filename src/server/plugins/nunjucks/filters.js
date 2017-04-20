import xss from 'xss';

function getFilters(env) {
  return {
    nl2br(str) {
      var options = {
        whiteList: {
          br: []
        }
      };
      return xss(str.toString().replace(/\n/g, '<br>'), options);
    },
    render(str){
      return env.renderString(str, this.getVariables());
    }
  };
} 

export default getFilters;
