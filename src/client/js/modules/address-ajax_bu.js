const $ = require('jquery');

class AddressAjax {
  init(){
    this.housenumber = $('#housenumber');
    this.postcode = $('#postcode');
    this.csrf = $('input[name=\'csrf\']');
    this.button = $('#addressbutton');
    this.endpoint = '/address';
    this.button.on('click', this.formHandler.bind(this));
    this.resultListContainerElem = $('.address-results');
    this.resultListContainerElem.on('click', '.select-link', this.resultItemClickHandler.bind(this));
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

  selectAddress (elem){
    $('#address').val(elem.data('address'));
    this.formElem.submit();
  }

  cleanSelectedAddress (){
    $('#address').val('');
  }

  resultItemClickHandler (e){
    const selectedElem = $(e.target).closest('.result');
    this.selectGP(selectedElem);
    return false;
  }

  cleanResults (){
    this.resultListContainerElem.empty().hide();
  }

  formHandler (e){
    e.preventDefault();
    this.cleanSelectedAddress();
    const postcode = this.postcode.val();
    const housenumber = this.housenumber.val();
    return false;
    this.fetchList.bind(this, this.endpoint, postcode, housenumber);
    return false;
  }

  appendResultListItem (i, d){
    const template = AddressAjax.getResultTemplate();
    const item = $(template).clone();
    item.find('.name').text(d._source.name);
    item.find('.address').text(d._source.address);
    const gpData = {
      'code': d._source.organisation_code,
      'name': d._source.name || '',
      'address': d._source.address || ''
    };
    item.data(gpData);

    this.resultListContainerElem.append(item);
  }

  fetchList (endpoint, postcode, housenumber){
  console.log('endpoint:'+endpoint);
    $.ajax({
      type: 'POST',
      url: endpoint,
      dataType: 'json',
      data: { postcode: postcode, housenumber: housenumber },
      cache: false,
      success: function(data){
        this.cleanResults();
        if (data.length > 0){
          const addressList = data.slice(0, this.showTotalItemsNumber);
          $.each(addressList, this.appendResultListItem.bind(this));
          this.resultListContainerElem.show();
        }
      }.bind(this)
    });
  }
}



module.exports = new AddressAjax('/address');
