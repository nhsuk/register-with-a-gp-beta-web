const $ = require('jquery');
/*global ga_event*/


class GPAutoComplete {
  constructor(endpoint, queryParam='search', showFirstItemsNumber = 4, showTotalItemsNumber = 10){
    this.endpoint = endpoint;
    this.queryParam = queryParam;
    this.showFirstItemsNumber = showFirstItemsNumber;
    this.showTotalItemsNumber = showTotalItemsNumber;
  }

  init(){
    this.formElem = $('#current-step-form');
    this.resultListContainerElem = $('.gp-finder-results');
    this.autoCompleteInput = $('#gp-search');
    this.autoCompleteInput.on('keyup', this.autoCompleteInputKeyUpHandler.bind(this));
    this.autoCompleteInput.on('keydown', this.autoCompleteInputKeyDownHandler.bind(this));
    this.resultListContainerElem.on('click', '.result', this.resultItemClickHandler.bind(this));
    this.resultListContainerElem.on('mouseover', '.result', this.resultItemHoverHandler.bind(this));
  }

  static getResultTemplate (){
    return $.parseHTML('' +
          '<div class="result">' +
          '<h4 class="result-title"></h4>' +
          '<p class="address"></p>'
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
    this.resultListContainerElem.find('.active').removeClass('active');
    var selectedElem = $(e.target).closest('.result');
    selectedElem.addClass('active');
    this.selectGP(selectedElem);
  }

  resultItemHoverHandler (e){
    this.resultListContainerElem.find('.active').removeClass('active');
    var selectedElem = $(e.target).closest('.result');
    selectedElem.addClass('active');
  }

  cleanResults (){
    this.resultListContainerElem.empty().hide();
  }

  seeMoreResultClickHandler (){
    this.resultListContainerElem.find('.result').show();
    $('.see-more-results').remove();
    ga_event('GP Lookup', 'More results click');
  }

  createSeeMoreBtn (){
    const seeMoreBtn = $('<a\>').text('See more').addClass('see-more-results btn-link');
    seeMoreBtn.on('click', this.seeMoreResultClickHandler.bind(this));
    this.resultListContainerElem.append(seeMoreBtn);
    return false;
  }

  autoCompleteInputKeyUpHandler (e){
    var keyCode = e.keyCode || e.which;
    if (keyCode == 40 || keyCode == 38 || keyCode == 13){
      return false;
    }

    this.cleanSelectedGP();
    var keywords = $(e.target).val();
    clearTimeout(this.timer);
    if (keywords){
      this.timer = setTimeout(this.fetchList.bind(this, this.endpoint, this.queryParam, keywords), 400);
    }else{
      this.cleanResults();
    }
  }

  autoCompleteInputKeyDownHandler (e){
    var elem = this.resultListContainerElem;
    if (elem.children().length > 0){
      if (e.keyCode == 40){  // down key

        const nextElem = elem.find('.active').removeClass('active').nextAll(':visible').first();
        nextElem.addClass('active');

        if (!elem.find('.active').length){
          elem.find('.result').first().addClass('active');
        }
      }

      if (e.keyCode == 38){  // up key
        const prevElem = elem.find('.active').removeClass('active').prevAll(':visible').first();
        prevElem.addClass('active');
        if (!elem.find('.active').length){
          if (elem.find('.see-more-results').length > 0){
            elem.find('.see-more-results').addClass('active');
          }else{
            elem.find('.result:visible').last().addClass('active');
          }
        }
      }
      if (e.keyCode == 13){
        const isSeeMoreBtn = elem.find('.see-more-results.active').length > 0;
        if (isSeeMoreBtn){
          this.seeMoreResultClickHandler();
        }else{
          var selectedElem = elem.find('.result.active');
          this.selectGP(selectedElem);
        }
        return false;
      }
    }
  }

  appendResultListItem (i, d){
    var template = GPAutoComplete.getResultTemplate();
    var item = $(template).clone();
    item.find('.result-title').text(d.name.value);
    item.find('.address').text(d.address.value);
    var gpData = {
      'code': d.code,
      'name': d.name.value || '',
      'address': d.address.value || ''
    };
    item.data(gpData);
    if (i==0){
      item.addClass('active');
    }

    if (i >= this.showFirstItemsNumber){
      item.hide();
    }

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
          var gpList = data.slice(0, this.showTotalItemsNumber);
          $.each(gpList, this.appendResultListItem.bind(this));
          if (data.length > this.showFirstItemsNumber){
            this.createSeeMoreBtn();
          }
          this.resultListContainerElem.show();
        }
      }.bind(this)
    });
  }
}



module.exports = new GPAutoComplete('/gp-lookup');
