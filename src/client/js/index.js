const labelFocus = require('./modules/label-focus');
const labelSelect = require('./modules/label-select');
const NestedRadioSelect = require('./modules/nested-radio-select');
const errorSummary = require('./modules/error-summary');
const GPAutoComplete = require('./modules/gp-autocomplete');
const btnDisable = require('./modules/disable-button');
import title from './lib/title';
const gaEvents = require('./modules/ga-events');

labelFocus.init();
labelSelect.init();
errorSummary.init();
title.init();

GPAutoComplete.init();
NestedRadioSelect.init();
btnDisable.init();

if (module.hot) {
  module.hot.accept();
}
gaEvents.init();