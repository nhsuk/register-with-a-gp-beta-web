const $ = require('jquery');

class GPAutoComplete {
  constructor(endpoint, queryParam='search', showTotalItemsNumber = 10){
    this.endpoint = endpoint;
    this.queryParam = queryParam;
    this.showTotalItemsNumber = showTotalItemsNumber;
  }

  init(){
    this.formElem = $('#current-step-form');
    this.resultListContainerElem = $('.gp-results');
    this.autoCompleteInput = $('#gp-search');
    this.autoCompleteInput.on('keyup', this.autoCompleteInputKeyUpHandler.bind(this));
    this.resultListContainerElem.on('click', '.select-link', this.resultItemClickHandler.bind(this));
  }

  static getResultTemplate (){
    return $.parseHTML('' +
          '<li class="gp-item result">' +
            '<div class="first-line">' +
              '<span class="name"></span>' +
              '<a href="#" class="select-link">Select</a>' +
            '</div>' +
            '<small class="address"></small>' +
          '</li>'
        );
  }

  selectGP (elem){
    $('#gp-code').val(elem.data('code'));
    $('#gp-name').val(elem.data('name'));
    $('#gp-address').val(elem.data('address'));
    this.formElem.submit();
  }

  cleanSelectedGP (){
    $('#gp-code').val('');
    $('#gp-name').val('');
    $('#gp-address').val('');
  }

  resultItemClickHandler (e){
    const selectedElem = $(e.target).closest('.result');
    this.selectGP(selectedElem);
    return false;
  }

  cleanResults (){
    this.resultListContainerElem.empty().hide();
  }

  autoCompleteInputKeyUpHandler (e){
    const keyCode = e.keyCode || e.which;
    if (keyCode === 40 || keyCode === 38 || keyCode === 13){
      return false;
    }

    this.cleanSelectedGP();
    const keywords = $(e.target).val();
    clearTimeout(this.timer);
    if (keywords){
      this.timer = setTimeout(this.fetchList.bind(this, this.endpoint, this.queryParam, keywords), 400);
    }else{
      this.cleanResults();
    }
  }

  appendResultListItem (i, d){
    const template = GPAutoComplete.getResultTemplate();
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

  fetchList (endpoint, queryParam, keywords){
    const queryData = {};
    queryData[queryParam] = keywords;
    $.ajax({
      type: 'get',
      url: endpoint,
      data: queryData,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.cleanResults();
        if (data.length > 0){
          const gpList = data.slice(0, this.showTotalItemsNumber);
          $.each(gpList, this.appendResultListItem.bind(this));
          this.resultListContainerElem.show();
        }
      }.bind(this)
    });
  }
}



module.exports = new GPAutoComplete('/gp-lookup');
