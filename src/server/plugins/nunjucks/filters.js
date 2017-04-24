function getFilters(env) {
  return {
    nl2br(str) {
      return str.toString().replace(/\n/g, '<br>');
    },
    render(str){
      return env.renderString(str, this.getVariables());
    },
    fulldateerror(str){
      if (str.includes('Fulldate error')){
        return 'This is not a valid date';
      }
      else {
        return str;
      }
    }
  };
} 

export default getFilters;
