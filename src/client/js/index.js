const labelFocus = require('./modules/label-focus');
const labelSelect = require('./modules/label-select');
const errorSummary = require('./modules/error-summary');
const GPAutoComplete = require('./modules/gp-autocomplete');
import title from './lib/title';

labelFocus.init();
labelSelect.init();
errorSummary.init();
GPAutoComplete.init();
title.init();


if (module.hot) {
  module.hot.accept();
}
