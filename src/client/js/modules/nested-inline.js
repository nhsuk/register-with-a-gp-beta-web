const $ = require('jquery');

const NestedInline = function NestedInline() {
  this.addRowSelector = '.add-row';
  this.baseNestedInputSelector = '.nested-inline-base-input';
  this.nestedInputIDPrefix = 'input-medications';
  this.nestedInlineLabelClass = '.nested-inline-label';
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
  const newNestedInput = $(this.baseNestedInputSelector).clone().val('');
  const lastNestedInput = $(this.nestedInlineLabelClass).find('.nested-input').last();
  const lastNestedInputID = lastNestedInput.attr('id');
  const numberPattern = /\d+/g;
  const rowIndex = parseInt(lastNestedInputID.match(numberPattern)) +1;
  const newNestedInputID = `${this.nestedInputIDPrefix}-${rowIndex}`;
  newNestedInput.attr('id', newNestedInputID).removeClass(this.baseNestedInputSelector.replace('.', ''));
  $(this.nestedInlineLabelClass).append(newNestedInput);
  return false;
};


module.exports = new NestedInline();
