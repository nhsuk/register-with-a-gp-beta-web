function Page() {}

Page.prototype.open = (path = '') => {
  browser.url(`/${path}`);
};

Page.prototype.getTitle = () => {
  return browser.getTitle();
};

module.exports = new Page();
