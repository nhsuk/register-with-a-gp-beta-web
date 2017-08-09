const $ = require('jquery');

const NestedRadioSelect = function NestedRadioSelect() {
  this.delegateSelector = '.nested-radio-button';
  this.nestedFieldContainer = '.nested-fields-container';
};

NestedRadioSelect.prototype.init = function init() {
  this.cacheEls();
  this.bindEvents();
};

NestedRadioSelect.prototype.cacheEls = function cacheEls() {
  this.$body = $('body');
};


NestedRadioSelect.prototype.bindEvents = function bindEvents() {
  $(this.$body).on('click.NestedRadioSelect', this.delegateSelector, $.proxy(this.onClick, this));
};

NestedRadioSelect.prototype.onClick = function onClick(e) {
  const $el = $(e.target);
  const $parent = $el.parent('label');
  const showNestedField = $($parent).data('show-nested-field');
  if (showNestedField){
    this.$body.find(this.nestedFieldContainer).show();
  }else{
    this.$body.find(this.nestedFieldContainer).hide();
  }
};


module.exports = new NestedRadioSelect();
