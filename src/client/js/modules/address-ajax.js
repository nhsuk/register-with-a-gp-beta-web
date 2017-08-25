const $ = require('jquery');

class AddressAjax {
  init(){
    this.housenumber = $('#input-housenumber');
    this.postcode = $('#input-postcode');
    this.csrf = $('input[name=\'csrf\']').val();
    this.addressButton = $('#addressbutton');
    this.endpoint = '/address';
    this.formFields = $('.form-fields');
    this.addressButton.on('click', this.formHandler.bind(this));
    this.resultListContainerElem = $('.address-results');
    this.resultListContainerElem.on('click', '.select-link', this.resultItemClickHandler.bind(this));
    this.addressContinue = $('#addresscontinue');
    this.manualContinue = $('#manualcontinue');
    this.resultListContainerElem.on('click', '#manualcontinue', this.fillManual.bind(this));
    this.manualDiv = $('#manualDiv');
    this.manualDiv.on('click', '.details__summary', this.cleanResults.bind(this));
    this.confirmContainer = $('.address-confirm');
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
    this.addressButton.show();
    this.addressContinue.hide();
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
    this.addressButton.hide();
    this.addressContinue.show();
  }
  
  fillManual(){
    $('#selectedAddress1').val($('#manualAddress1').val());
    $('#selectedAddress2').val($('#manualAddress2').val());
    $('#selectedAddress3').val($('#manualAddress3').val());
    $('#selectedTown').val($('#manualTown').val());
    $('#selectedCounty').val($('#manualCounty').val());
    $('#input-postcode').val($('#manualPostcode').val());
    console.log("send");
    document.getElementById('current-step-form').submit();
  }
  
  resultItemClickHandler (e){
    const selectedElem = $(e.target).closest('.result');
    this.selectAddress(selectedElem);
    return false;
  }

  cleanResults(){
    console.log('clean');
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
              '<a href="#" class="select-link">Select</a>' +
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
    });
  }
}

module.exports = new AddressAjax('/address');
