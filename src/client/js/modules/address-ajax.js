const $ = require('jquery');

class AddressAjax {
  init(){
    this.housenumber = $('#input-houseNumber');
    this.postcode = $('#input-postcode');
    this.csrf = $('input[name=\'csrf\']').val();
    this.addressButton = $('#addressbutton');
    this.endpoint = '/address';
    this.formFields = $('.form-fields');
    this.addressButton.on('click', this.formHandler.bind(this));
    this.resultListContainerElem = $('.address-results');
    this.resultListContainerElem.on('click', '.select-link', this.resultItemClickHandler.bind(this));
    this.addressContinue = $('#address-lookup-continue');
    this.manualContinue = $('#manualcontinue');
    this.manualContinue.on('click', this.fillManual.bind(this));
    this.manualDiv = $('#manualDiv');
    this.manualDiv.on('click', '.details__summary', this.cleanResults.bind(this));
    this.confirmContainer = $('.address-confirm');
    this.confirmResetButton = $('.confirm-reset');
    this.confirmResetButton.on('click',this.confirmReset.bind(this));
    this.disableEnter();
  }

  static getResultTemplate (){
    return $.parseHTML('' +
          '<li class="address-item result">' +
            '<div class="first-line">' +
              '<span class="name"></span>' +
              '<a href="#" class="select-link">Select</a>' +
            '</div>' +
            '<small class="address"></small>' +
          '</li>'
        );
  }
  confirmReset(){
    this.housenumber.val('');
    this.postcode.val('');
    this.confirmContainer.hide();
    this.addressButton.show();
    this.addressContinue.hide();
    this.formFields.show();
  }

  validationFunction() {
    if($('#addresscontinue') === null) {
      return true;
    } else if($('#addresscontinue').is(':focus')) {
      return true;
    }
    return false;
  }

  disableEnter() {
    const _this = this;
    $(document).ready(function() {
      $(window).keydown(function(event){
        if( (event.keyCode == 13) && (_this.validationFunction() === false) ) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  selectAddress (elem){
    $('#input-address1').val(elem.data('address1'));
    $('#input-address2').val(elem.data('address2'));
    $('#input-address3').val(elem.data('address3'));
    $('#input-town').val(elem.data('town'));
    $('#input-county').val(elem.data('county'));
    $('#confirmAddress1').text(elem.data('address1'));
    $('#confirmAddress2').text(elem.data('address2'));
    $('#confirmAddress3').text(elem.data('address3'));
    $('#confirmTown').text(elem.data('town'));
    $('#confirmCounty').text(elem.data('county'));
    $('#confirmPostcode').text(this.postcode.val());
    this.confirmContainer.show();
    this.resultListContainerElem.hide();
    this.formFields.hide();
    this.addressButton.hide();
    this.addressContinue.show();
  }

  fillManual(){
    $('#input-address1').val($('#manualAddress1').val());
    $('#input-address2').val($('#manualAddress2').val());
    $('#input-address3').val($('#manualAddress3').val());
    $('#input-town').val($('#manualTown').val());
    $('#input-county').val($('#manualCounty').val());
    $('#input-postcode').val($('#manualPostcode').val());
    $('#current-step-form').submit();
  }

  resultItemClickHandler (e){
    const selectedElem = $(e.target).closest('.result');
    this.selectAddress(selectedElem);
    return false;
  }

  cleanResults(){
    this.resultListContainerElem.hide();
    this.resultListContainerElem.empty().hide();
  }

  formHandler (){
    let postcode = this.postcode.val();
    postcode = postcode.replace(/\s/g, '');
    const housenumber = this.housenumber.val();
    this.manualDiv.removeAttr('open');
    this.fetchList('/' + $('#practice').val() + this.endpoint, postcode, housenumber);
  }

  fetchList (endpoint, postcode, housenumber){
    const _this = this;
    $.ajax({
      type: 'POST',
      url: endpoint,
      dataType: 'json',
      data: { postcode: postcode, housenumber: housenumber, csrf: this.csrf },
      cache: false,
      success: function(data){
        $('.address-results').show();
        $('.address-results').empty().hide();
        if (data.length > 0){
          if(data.length === 1){
            const a = data[0];
            $('#input-address1').val(a[0]);
            $('#input-address2').val(a[1]);
            $('#input-address3').val(a[2]);
            $('#input-town').val(a[3]);
            $('#input-county').val(a[4]);
            $('#confirmAddress1').text(a[0]);
            $('#confirmAddress2').text(a[1]);
            $('#confirmAddress3').text(a[2]);
            $('#confirmTown').text(a[3]);
            $('#confirmCounty').text(a[4]);
            $('#confirmPostcode').text(_this.postcode.val());
            _this.confirmContainer.show();
            _this.resultListContainerElem.hide();
            _this.formFields.hide();
            _this.addressButton.hide();
            _this.addressContinue.show();
            _this.manualDiv.hide();
          } else {
            const addressList = data;
            $.each(addressList, function(i,a){
              const template = $.parseHTML('' +
                '<li class="address-item result">' +
                '<div class="address-line">' +
                '<span id="addr1"></span>' +
                '<span id="addr2"></span>' +
                '<span id="addr3"></span>' +
                '<span id="town"></span>' +
                '<span id="county"></span>' +
                '</div>'+
                '<span>'+
                '<a href="#" class="select-link" id="select-link-' + i +'">Select</a>' +
                '</span>'+
                '</li>');
              const item = $(template).clone();
              item.find('#addr1').text(a[0] + ', ');
              if(a[1].length > 0){
                item.find('#addr2').text(a[1] + ', ');
              }
              if(a[2].length > 0){
                item.find('#addr3').text(a[2] + ', ');
              }
              item.find('#town').text(a[3] + ', ');
              item.find('#county').text(a[4] + ' ');
              const adData = {
                'address1': a[0],
                'address2': a[1],
                'address3': a[2],
                'town': a[3],
                'county': a[4]
              };
              item.data(adData);
              $('.address-results').append(item);
            });
            $('.address-results').show();
          }
        }
      }
    });
  }
}

module.exports = new AddressAjax('/address');
