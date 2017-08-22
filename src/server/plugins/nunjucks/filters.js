import _ from 'lodash';
import xss from 'xss';

function getFilters(env) {
  return {
    nl2br(line) {
      if (Array.isArray(line)){
        line = _.join(_.compact(_.map(line, x => _.trim(x))), ', ');
      }

      const options = {
        whiteList: {
          br: []
        }
      };

      return xss(line.toString().replace(/\n/g, '<br>'), options);
    },
    render(str){
      return env.renderString(str, this.getVariables());
    },
    fulldateerror(str){
      if (str.includes('Fulldate error')){
        return 'This is not a valid date';
      } else {
        return str;
      }
    }
  };
}

export default getFilters;
