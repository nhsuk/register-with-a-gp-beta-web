const labelFocus = require('./modules/label-focus');
const labelSelect = require('./modules/label-select');
const NestedRadioSelect = require('./modules/nested-radio-select');
const NestedInline = require('./modules/nested-inline');
const errorSummary = require('./modules/error-summary');
const GPAutoComplete = require('./modules/gp-autocomplete');
const btnDisable = require('./modules/disable-button');
import title from './lib/title';
const gaEvents = require('./modules/ga-events');
const AddressAjax = require('./modules/address-ajax');
const closeCookieBar = require('./modules/close-cookiebar');

labelFocus.init();
labelSelect.init();
errorSummary.init();
title.init();

GPAutoComplete.init();
if(pageKey === 'addressLookup'){
  AddressAjax.init();
}

NestedInline.init();
NestedRadioSelect.init();

btnDisable.init();

if (module.hot) {
  module.hot.accept();
}
gaEvents.init();
closeCookieBar.init();