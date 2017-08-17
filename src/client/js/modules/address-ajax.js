const $ = require('jquery');

class AddressAjax {
  init(){
    this.housenumber = $('#input-housenumber');
    this.postcode = $('#input-postcode');
    this.csrf = $('input[name=\'csrf\']').val();
    this.button = $('#addressbutton');
    this.endpoint = '/address';
    this.formFields = $('.form-fields');
    this.button.on('click', this.formHandler.bind(this));
    this.resultListContainerElem = $('.address-results');
    this.resultListContainerElem.on('click', '.select-link', this.resultItemClickHandler.bind(this));
    this.confirmContainer = $('.address-confirm');
    this.confirmContainer.hide();
    this.confirmResetButton = $('.confirm-reset');
    this.confirmResetButton.on('click',this.confirmReset.bind(this));
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
    this.formFields.show();
  }
  
  selectAddress (elem){
    $('#selectedAddress1').val(elem.data('address1'));
    $('#selectedAddress2').val(elem.data('address2'));
    $('#selectedAddress3').val(elem.data('address3'));
    $('#selectedTown').val(elem.data('town'));
    $('#selectedCounty').val(elem.data('county'));
    $('#confirmAddress1').text(elem.data('address1'));
    $('#confirmAddress2').text(elem.data('address2'));
    $('#confirmAddress3').text(elem.data('address3'));
    $('#confirmTown').text(elem.data('town'));
    $('#confirmCounty').text(elem.data('county'));
    this.confirmContainer.show();
    this.resultListContainerElem.hide();
    this.formFields.hide();
    
  }

  cleanSelectedAddress (){
    $('#address').val('');
  }

  resultItemClickHandler (e){
    const selectedElem = $(e.target).closest('.result');
    this.selectAddress(selectedElem);
    return false;
  }

  cleanResults(){
    this.resultListContainerElem.empty().hide();
  }

  formHandler (){
 //   this.cleanSelectedAddress();
    let postcode = this.postcode.val();
    const housenumber = this.housenumber.val();
    this.fetchList('/' + $('#practice').val() + '/' + this.endpoint, postcode, housenumber);
    postcode = postcode.replace(/\s/g, '');
  }

  fetchList (endpoint, postcode, housenumber){
    $.ajax({
      type: 'POST',
      url: endpoint,
      dataType: 'json',
      data: { postcode: postcode, housenumber: housenumber, csrf: this.csrf },
      cache: false,
      success: function(data){
        $('.address-results').empty().hide();
        if (data.length > 0){
          const addressList = data;
          $.each(addressList, function(i,a){
            const template = $.parseHTML('' +
              '<li class="address-item result">' +
              '<div class="first-line">' +
              '<span id="addr1"></span>' +
              '<span id="addr2"></span>' +
              '<span id="addr3"></span>' +
              '<span id="town"></span>' +
              '<span id="county"></span>' +
              '<a href="#" class="select-link">Select</a>' +
              '</div></li>');
            const item = $(template).clone();
            item.find('#addr1').text(a[0] + ', ');
            item.find('#addr2').text(a[1] + ', ');
            item.find('#addr3').text(a[2] + ', ');
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
    });
  }
}

module.exports = new AddressAjax('/address');
