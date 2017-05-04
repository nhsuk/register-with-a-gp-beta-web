import getFilters from '../../../server/plugins/nunjucks/filters';
import Nunjucks from 'nunjucks';

const env = Nunjucks.configure(process.env.path, {});
describe('Nunjucks global filters', () => {

  it('nl2br should return a string with line breaks', () => {
    expect(getFilters(env).nl2br('Line one\nline two')).toBe('Line one<br>line two');
  });

  it('nl2br should return a string with line breaks', () => {
    expect(getFilters(env).fulldateerror('Fulldate error')).toBe('This is not a valid date');
  });

});
