function getFilters(env) {
  return {
    nl2br(str) {
      return str.toString().replace(/\n/g, '<br>');
    },
    render(str){
      return env.renderString(str, this.getVariables());
    }
  };
} 

export default getFilters;
