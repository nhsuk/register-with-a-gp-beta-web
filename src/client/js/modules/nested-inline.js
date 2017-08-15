const $ = require('jquery');

const NestedInline = function NestedInline() {
  this.addRowSelector = '.add-row';
  this.baseInputSelector = '.nested-inline-base-input';
};

NestedInline.prototype.init = function init() {
  this.cacheEls();
  this.bindEvents();
};

NestedInline.prototype.cacheEls = function cacheEls() {
  this.$body = $('body');
};


NestedInline.prototype.bindEvents = function bindEvents() {
  $(this.$body).on('click.NestedInline', this.addRowSelector, $.proxy(this.onClick, this));
};

NestedInline.prototype.onClick = function onClick() {
  $(this.addRowSelector).before($(this.baseInputSelector).clone().removeClass(this.baseInputSelector.replace('.', '')));
};


module.exports = new NestedInline();
