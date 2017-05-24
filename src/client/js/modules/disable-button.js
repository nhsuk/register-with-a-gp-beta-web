const $ = require('jquery');

class btnDisable{
  init(){
    $('form').submit(function() {
      $(this).find('button[type=\'submit\']').prop('disabled',true);
    });
  }

}
module.exports = new btnDisable();