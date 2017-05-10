const labelFocus = require('./modules/label-focus');
const labelSelect = require('./modules/label-select');
const errorSummary = require('./modules/error-summary');
const jQuery = require('./lib/jquery-1.12.4.min.js');
const jQueryClass = require('./lib/jquery-class.js');
const autoCompleteComponent = require('./lib/autocomplete-component.js');
import title from './lib/title';

labelFocus.init();
labelSelect.init();
errorSummary.init();
title.init();

if (module.hot) {
  module.hot.accept();
}
