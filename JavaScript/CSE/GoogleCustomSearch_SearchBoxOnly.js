google.load('search', '1', {language: 'ja', style: google.loader.themes.V2_DEFAULT});
google.setOnLoadCallback(function() {
  var customSearchOptions = {};
  var customSearchControl =   new google.search.CustomSearchControl('007629158291309610641:cuw_v2pvi2c', customSearchOptions);
  customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
  var options = new google.search.DrawOptions();
  options.enableSearchboxOnly('//kledgeb.blogspot.com/p/cseresult.html', 'cseq');
  options.setAutoComplete(true);
  customSearchControl.setAutoCompletionId('007629158291309610641:cuw_v2pvi2c+qtype:1');
  customSearchControl.draw('cse-search-form', options);
}, true);
