const $ = require('jquery');

class closeCookieBar {
  init() {
    if(document.cookie.indexOf('hideCookieBar=true')>=0){
      $('#global-cookies-banner').empty();
    }

    $('.close').on('click',function(){
      let d = new Date();
      d.setTime( d.getTime()+ 30*24*60*60*1000);
      let expireTime = 'expires='+d.toUTCString();

      $('#global-cookies-banner').empty();
      document.cookie='hideCookieBar='+true +';'+expireTime;
    });
  }

}

module.exports = new closeCookieBar();