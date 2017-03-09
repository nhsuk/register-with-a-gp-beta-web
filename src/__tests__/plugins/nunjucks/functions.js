import {formatDate} from '../../../server/plugins/nunjucks/functions';


describe('Nunjucks global functions', () => {

  it('formatDate should return correct date format', () => {
    expect(formatDate(1977, 3, 14)).toBe('14/3/1977');
  });

});
