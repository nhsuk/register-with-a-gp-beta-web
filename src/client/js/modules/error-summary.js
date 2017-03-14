/* If the current page shows errors, set the focus to the error messages */
const $ = require('jquery');

const ErrorSummary = function () {
  this.el = '.error-summary';
};

ErrorSummary.prototype.init = function() {
  this.cacheEls();
  this.bindEvents();
  this.render();
};

ErrorSummary.prototype.cacheEls = function() {
  this.$summary = $(this.el);
};

ErrorSummary.prototype.bindEvents = function() {
  this.$summary.on('click', 'a', this.onErrorClick);
};

ErrorSummary.prototype.onErrorClick = function(event) {
  event.preventDefault();

  const $link = $(event.target);
  const href = $link.attr('href');
  const target = href.substr(href.indexOf('#'));
  const $target = $(target);

  if ($target.is(':input')) {
    $target.focus();
  } else {
    $target.find(':input').first().focus();
  }

  $(document).scrollTop($target.offset().top);
};

ErrorSummary.prototype.render = function() {
  if (this.$summary.length === 1) {
    // If there is an error summary, set focus to the summary
    this.$summary.focus();
  } else {
    // Otherwise, set focus to the field with the error
    $('.error input:first').focus();
  }
};

module.exports = new ErrorSummary();
