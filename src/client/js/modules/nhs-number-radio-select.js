const $ = require('jquery');

const NHSNumberRadioSelect = function NHSNumberRadioSelect() {
  this.delegateSelector = '.nhs-number-radio';
  this.nestedFieldContainer = '#nhs-number-nested-container';
};

NHSNumberRadioSelect.prototype.init = function init() {
  this.cacheEls();
  this.bindEvents();
};

NHSNumberRadioSelect.prototype.cacheEls = function cacheEls() {
  this.$body = $('body');
};


NHSNumberRadioSelect.prototype.bindEvents = function bindEvents() {
  $(this.$body).on('click.NHSNumberRadioSelect', this.delegateSelector, $.proxy(this.onClick, this));
};

NHSNumberRadioSelect.prototype.onClick = function onClick(e) {
  const $el = $(e.target);
  const $parent = $el.parent('label');
  const showNestedField = $($parent).data('show-nested-field');

  if (showNestedField){
    this.$body.find(this.nestedFieldContainer).show();
  }else{
    this.$body.find(this.nestedFieldContainer).hide();
  }
};


module.exports = new NHSNumberRadioSelect();
