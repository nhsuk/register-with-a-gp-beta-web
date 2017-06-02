const $ = require('jquery');

class gaEvents{
  init(){
    $('.details__summary').each(function(){
      $(this).click( function() {
        ga_event('Disclosure', $(this).html());
      });
  
    });
    $('#cookieLink').click( function() {
      ga_event('Cookies', 'link clicked');
    });
  }

}
module.exports = new gaEvents();