import Filters from '../../../server/plugins/nunjucks/filters';


describe('Nunjucks global filters', () => {

  it('nl2br should return a string with line breaks', () => {
    expect(Filters.nl2br('Line one\nline two')).toBe('Line one<br>line two');
  });

});
