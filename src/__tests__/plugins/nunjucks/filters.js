import getFilters from '../../../server/plugins/nunjucks/filters';


describe('Nunjucks global filters', () => {

  it('nl2br should return a string with line breaks', () => {
    expect(getFilters.nl2br('Line one\nline two')).toBe('Line one<br>line two');
  });

});
