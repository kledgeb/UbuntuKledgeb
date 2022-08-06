//  https://googledrive.com/host/0B0PaLJkr8DuFR3BVdkZ6ekhpUUk
/*-- --------------------------------------------------------------------------------
Post Utility
-------------------------------------------------------------------------------- --*/

function setPostDate (spanID, postDate) {
  var spanSelector = "#" + spanID;
  $(spanSelector).append(adjustPostDate(postDate));
}

function getSizedThumbnailURL(thumbnailURL,thumbnailSize){
  return adjustURLProtocol(thumbnailURL.replace('/s72-','/s' + thumbnailSize + '-'));
}

function adjustPostDate(postDate){
  var tempDate = postDate.split("/");

  return tempDate[2] + "/" + tempDate[0] + "/" + tempDate[1];
}

function adjustURLProtocol(url){
  if("https:"== document.location.protocol){
    if(url.startsWith('http:')){
      url = 'https:' + url.substr(5);
    }
  }else{
    if(url.startsWith('https:')){
      url = 'http:' + url.substr(6);
    }
  }

  return url;
}

function isTestSite(){
  var testSite = false;

  if(getHomepageURL().indexOf('kledgeb2') != -1){
    testSite = true;
  }

  return testSite;
}

function getRandomInt(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

/*-- --------------------------------------------------------------------------------
URL Utility
-------------------------------------------------------------------------------- --*/

function isLabel(){
  return ($(location).attr('pathname').indexOf('/search/label') != -1);
}

function isSearch(){
  var isSearchURL = false;

  if((!isLabel()) && ($(location).attr('pathname').indexOf('/search') != -1)){
    isSearchURL = !hasURLQueryString('pageNum');
    //isSearchURL = true;
  }

  return isSearchURL;
}

function getLabelName(){
  var labelName = null;

  if(isLabel()){
    var pathComponent = $(location).attr('pathname').split('/');

    labelName = pathComponent[pathComponent.length - 1];
  }

  return labelName;
}

function getSearchQuery(){
  var searchQuery = null;

  if(isSearch()){
    searchQuery = getURLQueryString('q');
  }

  return searchQuery;
}

function getGoogleCustomSearchQuery(){
  var searchQuery = null;

  searchQuery = getURLQueryString('cseq');

  return searchQuery;
}

function getURLQueryStrings(){
  var queryStrings = {};
  var urlSplit = $(location).attr('href').split('?');

  if((urlSplit.length == 2) && (urlSplit[1].length > 0)){
    var i;
    var queryStringSet;
    var queryStringSplit = urlSplit[1].split('&');

    for(i = 0 ; i < queryStringSplit.length ; i ++){
      queryStringSet = queryStringSplit[i].split('=');

      if(queryStringSet.length == 2){
        queryStrings[queryStringSet[0]] = queryStringSet[1];
      }
    }
  }

  return queryStrings;
}

function hasURLQueryString(key){
  return (getURLQueryString(key) !== null);
}

function getURLQueryString(key){
  var queryStrings = getURLQueryStrings();
  var queryString = null;

  if(key in queryStrings){
    queryString = queryStrings[key];
  }

  if(queryString){
    queryString = decodeURIComponent(queryString);
  }

  return queryString;
}

function getMaxResults(){
  var maxResults = gPostCountPerPage;
  var queryString = getURLQueryString('max-results');

  if(queryString){
    maxResults = parseInt(queryString,10);
  }else if(isLabel() || isSearch()){
    maxResults = 20;
  }

  return maxResults;
}

function createParameterizeURL(params){
  var href = getHomepageURL();

  if((params) && (Object.keys(params).length)){
    var paramURL = '';

    href += 'search?';

    if(params.searchQuery){
      paramURL += '&q=' + params.searchQuery;
    }

    if(params.startIndex !== undefined){
      paramURL += '&start=' + params.startIndex;
    }

    if(params.maxResults){
      paramURL += '&max-results=' + params.maxResults;
    }

    if(params.updatedMax){
      paramURL += '&updated-max=' + params.updatedMax;
    }

    if(params.updatedMin){
      paramURL += '&updated-min=' + params.updatedMin;
    }

    if(params.byDate){
      paramURL += '&by-date=' + params.byDate;
    }

    href += paramURL.slice(1);
  }

  return href;
}

var gRealHomepageURL = null;

function getHomepageURL(){
  /*var homepageURL = null;

  if(!gRealHomepageURL){
    if(gHomepageURL.indexOf('?') != -1){
      gRealHomepageURL = gHomepageURL.slice(0,gHomepageURL.indexOf('?'));
    }else{
      gRealHomepageURL = gHomepageURL;
    }
  }

  return gRealHomepageURL;*/

  return gHomepageURL;
}

function adjustURLForMobile(url){
  /*var adjustedURL = url;

  if(gIsMobile){
    if(adjustedURL.indexOf('?') != -1){
      adjustedURL += '&m=1';
    }else{
      adjustedURL += '?m=1';
    }
  }

  return adjustedURL;*/

  return url;
}

/*-- --------------------------------------------------------------------------------
Feed Utility
-------------------------------------------------------------------------------- --*/
/*-------- Feed parse --------*/

function parsePostID(tag){
  var index = tag.indexOf('post-');
  var postID = null;

  if(index != -1){
    postID = tag.substring(index + 'post-'.length);
  }

  return postID;
}

function parsePostLink(link){
  return parseFeedLink(link,'alternate');
}

function parseFeedLink(link,key){
  var i;
  var feedLink = null;

  for (i = (link.length - 1) ; i >= 0 ; i --) {
    if(link[i].rel == key){
      feedLink = adjustURLProtocol(link[i].href);
      break;
    }
  }

  return feedLink;
}

function parsePostThumbnail(mediathumbnail,thumbnailSize){
  var postThumbnail = null;

  if(mediathumbnail){
    var size = 960;

    if(thumbnailSize){
      size = thumbnailSize;
    }

    postThumbnail = getSizedThumbnailURL(mediathumbnail.url,size);
  }

  return postThumbnail;
}

function relatedPostsCompare(post1,post2){
  var result = 0;

  if(post1.published.$t > post2.published.$t){
    result = -1;
  }else if(post1.published.$t < post2.published.$t){
    result = 1;
  }

  return result;
}

function adjustPostSummary(summary){
  var strBR = '<br />';

  summary = summary.replace(/(\n\r)|\n/g,strBR);
  summary = summary.replace(/(<br \/>){3,}/g,strBR + strBR);

  if(summary.length >= strBR.length){
    if(summary.substr(0,strBR.length) == strBR){
      summary = summary.replace(strBR,'','');
    }
  }

  return summary;
}

function parsePostDay(date){
  return date.substring(0,10);
}

/*-------- Post Count --------*/
function getCurrentTotalPostCount(label,successCallback){

  if(isLabel()){
    if((label === null) || (label === undefined)){
      label = getLabelName();
    }

    getTotalLabelPostCount(label,successCallback);
  }else if(isSearch()){
    successCallback(0);
  }else{
    getTotalAllPostCount(successCallback);
  }
}

/*-------- TotalAllPostCount --------*/

var totalAllPostCountCallback = function(callbackData) {
  return function(jsonData) {
    callbackData['successCallback'](parseInt(jsonData.feed.openSearch$totalResults.$t,10));
  };
};

function getTotalAllPostCount(successCallback){
  var feedURL = getHomepageURL() + 'feeds/posts/summary?alt=json&max-results=1';
  var callbackData = {successCallback:successCallback};

  $.ajax(feedURL, {
    success: totalAllPostCountCallback(callbackData),
  });
}

/*-------- TotalLabelPostCount --------*/

var totalLabelPostCountCallback = function(callbackData) {
  return function(jsonData) {
    callbackData['successCallback'](parseInt(jsonData.feed.openSearch$totalResults.$t,10),callbackData.userData);
  };
};

function getTotalLabelPostCount(label,successCallback,userData){
  var feedURL;
  var callbackData = {successCallback:successCallback,userData:userData};

  feedURL = getHomepageURL() + 'feeds/posts/summary/-/' + label + '?alt=json&max-results=1';

  $.ajax(feedURL, {
    success: totalLabelPostCountCallback(callbackData),
  });
}

/*-------- Post Time --------*/
function adjustPostTimeForURL(postTime){
  var postTimeForURL;

  postTimeParts = postTime.split('.');
  postTimeForURL = postTimeParts[0] + postTimeParts[1].substring(3);

  return postTimeForURL.replace('+','%2B');
}

/*-------- Post published Time --------*/
var postPublishedTimeCallback = function(callbackData) {
  return function(jsonData) {
    var publishedTime = null;

    if((jsonData.feed.entry) && (jsonData.feed.entry.length > 0)){
      var entry = jsonData.feed.entry[0];

      publishedTime = entry.published.$t;
    }

    callbackData['successCallback'](publishedTime,callbackData['userData1'],callbackData['userData2']);
  };
};

function getPostPublishedTime(index,successCallback,userData1,userData2){
  var feedURL;
  var callbackData = {successCallback:successCallback,userData1:userData1,userData2:userData2};

  feedURL = getHomepageURL() + 'feeds/posts/summary?alt=json&max-results=1&start-index=' + index;

  $.ajax(feedURL,{
    success:postPublishedTimeCallback(callbackData)
  });
}

var labelPostPublishedTimeCallback = function(callbackData) {
  return function(jsonData) {
    var publishedTime = null;

    if((jsonData.feed.entry) && (jsonData.feed.entry.length > 0)){
      var entry = jsonData.feed.entry[0];

      publishedTime = entry.published.$t;
    }

    callbackData['successCallback'](publishedTime,callbackData['userData1'],callbackData['userData2']);
  };
};

function getLabelPostPublishedTime(index,label,successCallback,userData1,userData2){
  var feedURL;
  var callbackData = {successCallback:successCallback,userData1:userData1,userData2:userData2};

  feedURL = getHomepageURL() + 'feeds/posts/summary/-/' + label + '?alt=json&max-results=1&start-index=' + index;

  $.ajax(feedURL,{
    success: labelPostPublishedTimeCallback(callbackData)
  });
}

var searchPostPublishedTimeCallback = function(callbackData) {
  return function(jsonData) {
    var publishedTime = null;

    if((jsonData.feed.entry) && (jsonData.feed.entry.length > 0)){
      var entry = jsonData.feed.entry[0];

      publishedTime = entry.published.$t;
    }

    callbackData['successCallback'](publishedTime,callbackData['userData1'],callbackData['userData2']);
  };
};

function getSearchPostPublishedTime(index,query,updatedMax,updatedMin,byDate,successCallback,userData1,userData2){
  var feedURL;
  var callbackData = {successCallback:successCallback,userData1:userData1,userData2:userData2};

  feedURL = getHomepageURL() + 'feeds/posts/summary?alt=json&q=' + query + '&max-results=1&start-index=' + index;

  if(updatedMax){
    feedURL += '&updated-max=' + updatedMax;
  }

  if(updatedMin){
    feedURL += '&updated-min=' + updatedMin;
  }

  if(byDate){
    feedURL += '&byDate=' + byDate;
  }

  $.ajax(feedURL,{
    success: searchPostPublishedTimeCallback(callbackData)
  });
}
/*-------- Post Update Time --------*/
function getPostUpdatedTime(index){
  var feedURL;
  var postUpdatedTime = null;

  feedURL = getHomepageURL() + 'feeds/posts/summary?alt=json&max-results=1&start-index=' + index;

  $.ajax(feedURL,
  {
    async: false,
    success: function(jsonData){
      postUpdatedTime = jsonData.feed.entry[0].updated.$t;
    }
  });

  return postUpdatedTime;
}

function getLabelPostUpdatedTime(index,label){
  var feedURL;
  var labelPostUpdatedTime = null;

  feedURL = getHomepageURL() + 'feeds/posts/summary/-/' + label + '?alt=json&max-results=1&start-index=' + index;

  $.ajax(feedURL,
  {
    async: false,
    success: function(jsonData){
      labelPostUpdatedTime = jsonData.feed.entry[0].updated.$t;
    }
  });

  return labelPostUpdatedTime;
}

/*-- --------------------------------------------------------------------------------
Feed Latest Post Utility
-------------------------------------------------------------------------------- --*/

var latestPostByIndexCallback = function(callbackData) {
  return function(jsonData) {
    callbackData['successCallback'](jsonData.feed.entry,callbackData['userData']);
  };
};

function getLatestPostByIndex(index,maxResults,successCallback,userData){
  var feedURL;
  var callbackData = {successCallback:successCallback,userData:userData};

  feedURL = getHomepageURL() + 'feeds/posts/summary?alt=json&max-results=' + maxResults + '&start-index=' + index;

  $.ajax(feedURL,{
    success:latestPostByIndexCallback(callbackData)
  });
}

/*-- --------------------------------------------------------------------------------
Feed Label Post Utility
-------------------------------------------------------------------------------- --*/

var labelPostByIndexCallback = function(callbackData) {
  return function(jsonData) {
    var entry = jsonData.feed.entry;

    if(!entry){
      entry = [];
    }

    callbackData['successCallback'](entry,jsonData.feed,callbackData['userData']);
  };
};

function getLabelPostByIndex(index,label,maxResults,successCallback,userData){
  var feedURL;
  var callbackData = {successCallback:successCallback,userData:userData};

  feedURL = getHomepageURL() + 'feeds/posts/summary/-/' + label + '?alt=json&max-results=' + maxResults + '&start-index=' + index;

  $.ajax(feedURL,{
    success:labelPostByIndexCallback(callbackData)
  });
}


/*-- --------------------------------------------------------------------------------
Feed Category Utility
-------------------------------------------------------------------------------- --*/
var allCategoryCallback = function(callbackData) {
  return function(jsonData) {
    callbackData['successCallback'](jsonData.feed.category,callbackData['userData']);
  };
};

function getAllCategory(successCallback,userData){
  var feedURL;
  var callbackData = {successCallback:successCallback,userData:userData};

  feedURL = getHomepageURL() + 'feeds/posts/summary?alt=json&max-results=1&start-index=1';

  $.ajax(feedURL,{
    success:allCategoryCallback(callbackData)
  });
}

/*-- --------------------------------------------------------------------------------
Feed Search Post Utility
-------------------------------------------------------------------------------- --*/

var searchPostCallback = function(callbackData) {
  return function(jsonData) {
    var entry = jsonData.feed.entry;

    if(!entry){
      entry = [];
    }

    callbackData['successCallback'](entry,jsonData.feed,callbackData['userData']);
  };
};

function getSearchPost(params,successCallback,userData){
  var feedURL;
  var callbackData = {successCallback:successCallback,userData:userData};

  feedURL = getHomepageURL() + 'feeds/posts/summary?alt=json';

  if(params.searchQuery){
    feedURL += '&q=' + params.searchQuery;
  }

  if(params.startIndex !== undefined){
    feedURL += '&start-index=' + params.startIndex;
  }

  if(params.maxResults){
    feedURL += '&max-results=' + params.maxResults;
  }

  $.ajax(feedURL,{
    success:searchPostCallback(callbackData)
  });
}
