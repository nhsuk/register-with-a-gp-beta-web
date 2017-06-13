const $ = require('jquery');
 /*global ga_event*/
class gaEvents{
  init(){
    $('.details__summary').each(function(){
      $(this).click( function() {
        ga_event('Disclosure', 'Opened', $(this).html());
      });
    });
    $('#cookieLink').click( function() {
      ga_event('Cookies', 'Cookies link clicked', 'Cookies link clicked');
    });
  }
}
module.exports = new gaEvents();
