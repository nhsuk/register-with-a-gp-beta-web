const labelFocus = require('./modules/label-focus');
const labelSelect = require('./modules/label-select');
const errorSummary = require('./modules/error-summary');
import title from './lib/title';

labelFocus.init();
labelSelect.init();
errorSummary.init();
title.init();

if (module.hot) {
  module.hot.accept();
}
