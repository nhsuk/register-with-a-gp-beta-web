const $ = require('jquery');

class closeCookieBar {
  init() {
    $('#global-cookies-banner').on('click',function(){
      $('#global-cookies-banner').hide();
    });
  }

}

module.exports = new closeCookieBar();