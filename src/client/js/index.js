const labelFocus = require('./modules/label-focus');
const labelSelect = require('./modules/label-select');
import title from './lib/title';

labelFocus.init();
labelSelect.init();
title.init();

if (module.hot) {
  module.hot.accept();
}
