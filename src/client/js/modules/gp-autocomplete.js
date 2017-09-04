const $ = require('jquery');

class GPAutoComplete {
  constructor(endpoint, queryParam='search', showTotalItemsNumber = 10){
    this.endpoint = endpoint;
    this.queryParam = queryParam;
    this.showTotalItemsNumber = showTotalItemsNumber;
  }

  init(){
    this.formElem = $('#current-step-form');
    this.resultListContainer = $('.gp-results');
    this.autoCompleteInput = $('#input-gp-lookup');
    this.nestedFieldsContainer = $('.inputs-container');
    this.summaryContainer = $('#selected-gp-summary');
    this.resetButton = $('.confirm-reset', '#selected-gp-summary');
    this.findSurgeryButton = $('.gp-lookup-btn', '#previously-registered-nested-container');
    this.manualAddressContainer = $('#gp-manual-address');
    this.resetButton.on('click', this.resetBtnClickHandler.bind(this));
    this.findSurgeryButton.on('click', this.findSurgeryButtonClickHandler.bind(this));
    this.autoCompleteInput.on('keyup', this.autoCompleteInputKeyUpHandler.bind(this));
    this.resultListContainer.on('click', '.select-link', this.resultItemClickHandler.bind(this));
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

  updateSummaryContainer (name, address){
    $('.gp-title', this.summaryContainer).text(name);
    if (address){
      const addressLines = address.split(',');
      $.each(addressLines, (i, line) => {
        $('.gp-address', this.summaryContainer).append($('<p\>', {'class': 'confirm-block-line'}).text(line));
      });
    }
  }

  selectGP (elem){
    const name = elem.data('name');
    const address = elem.data('address');
    $('#gp-name').val(name);
    $('#gp-address').val(address);
    this.updateSummaryContainer(name, address);
    this.summaryContainer.show();
    this.nestedFieldsContainer.hide();
    this.manualAddressContainer.hide();
  }

  cleanSelectedGP (){
    $('#gp-code').val('');
    $('#gp-name').val('');
    $('#gp-address').val('');
  }

  resetBtnClickHandler (){
    $('#gp-code').val('');
    $('#gp-name').val('');
    $('#gp-address').val('');
    this.summaryContainer.hide();
    this.nestedFieldsContainer.show();
    this.resultListContainer.empty();
    this.autoCompleteInput.val('');
    $('.gp-title', this.summaryContainer).empty();
    $('.gp-address', this.summaryContainer).empty();
    this.manualAddressContainer.show();
    return false;
  }

  resultItemClickHandler (e){
    const selectedElem = $(e.target).closest('.result');
    this.selectGP(selectedElem);
    return false;
  }

  cleanResults (){
    this.resultListContainer.empty().hide();
  }

  findSurgeryButtonClickHandler (){
    this.fetchList(this.endpoint, this.queryParam, this.autoCompleteInput.val());
    return false;
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

    this.resultListContainer.append(item);
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
          this.resultListContainer.show();
        }
      }.bind(this)
    });
  }
}



module.exports = new GPAutoComplete('/gp-lookup');
