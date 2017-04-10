const Filters = {
  nl2br(str) {
    return str.toString().replace(/\n/g, '<br>');
  },
};

export default Filters;
