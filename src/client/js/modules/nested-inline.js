const $ = require('jquery');

const NestedInline = function NestedInline() {
  this.addRowSelector = '.add-row';
  this.baseNestedInputSelector = '.nested-inline-base-input';
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

NestedInline.prototype.onClick = function onClick(e) {
  const nestedInlineLabel = $(e.target).closest('.nested-fields-container').find('label');
  const newNestedInput = nestedInlineLabel.find(this.baseNestedInputSelector).clone().val('');
  const lastNestedInput = nestedInlineLabel.find('.nested-input').last();
  const lastNestedInputID = lastNestedInput.attr('id');
  const numberPattern = /\d+/g;
  const rowIndex = parseInt(lastNestedInputID.match(numberPattern)) +1;
  const nestedInputIDPrefix = $(newNestedInput).attr('id').replace(/\d/g,'');
  const newNestedInputID = nestedInputIDPrefix+rowIndex;
  newNestedInput.attr('id', newNestedInputID).removeClass(this.baseNestedInputSelector.replace('.', ''));
  nestedInlineLabel.append(newNestedInput);
  return false;
};


module.exports = new NestedInline();
