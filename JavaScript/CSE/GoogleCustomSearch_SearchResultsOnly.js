google.load('search', '1', {language: 'ja', style: google.loader.themes.V2_DEFAULT});
google.setOnLoadCallback(function() {
  var customSearchOptions = {};
  var googleAnalyticsOptions = {};
  googleAnalyticsOptions['queryParameter'] = 'cseq';
  googleAnalyticsOptions['categoryParameter'] = '';
  customSearchOptions['googleAnalyticsOptions'] = googleAnalyticsOptions;
  var customSearchControl =   new google.search.CustomSearchControl('007629158291309610641:cuw_v2pvi2c', customSearchOptions);
  customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
  var options = new google.search.DrawOptions();
  options.enableSearchResultsOnly();
  options.setAutoComplete(true);
  customSearchControl.setSearchCompleteCallback(null, onGoogleCustomSearchResult)
  customSearchControl.setAutoCompletionId('007629158291309610641:cuw_v2pvi2c+qtype:1');
  customSearchControl.draw('cse', options);
  function parseParamsFromUrl() {
    var params = {};
    var parts = window.location.search.substr(1).split('&');
    for (var i = 0; i < parts.length; i++) {
      var keyValuePair = parts[i].split('=');
      var key = decodeURIComponent(keyValuePair[0]);
      params[key] = keyValuePair[1] ?
          decodeURIComponent(keyValuePair[1].replace(/\+/g, ' ')) :
          keyValuePair[1];
    }
    return params;
  }
  var urlParams = parseParamsFromUrl();
  var queryParamName = 'cseq';
  if (urlParams[queryParamName]) {
    customSearchControl.execute(urlParams[queryParamName]);
  }
}, true);

function onGoogleCustomSearchResult(object){
  var searchQuery = getGoogleCustomSearchQuery();

  if(searchQuery !== null){
    var inputsearchBox = $('#gsc-i-id1');
    inputsearchBox.val(searchQuery);
    inputsearchBox.css({'background':'none'});
  }
}


