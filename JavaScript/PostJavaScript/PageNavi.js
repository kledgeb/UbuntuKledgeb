/*-- --------------------------------------------------------------------------------
Page Navi
-------------------------------------------------------------------------------- --*/

function onPageNaviOuterAppear(){
  getCurrentTotalPostCount(null,createPageNaviElement);
}

function createPageNaviElement(totalPostCount){
  var divPageNaviNext = $("#id_PageNavi_divNext");
  var divPageNaviPrev = $("#id_PageNavi_divPrev");

  if(totalPostCount){
    var postCountPerPage = getMaxResults();
    var currentPageIndex;

    //Page Navi
    var pageBoxNum = Math.floor($('#id_divContents').width() / 48) - 2;
    var totalPageBoxNum = Math.ceil(totalPostCount / postCountPerPage);
    var lastPageIndex = totalPageBoxNum - 1;

    currentPageIndex = getCurrentPageIndex();

    //page index
    var startPageIndex;
    var endPageIndex;

    if(currentPageIndex == -1){
      startPageIndex = 0;
    }else{
      var startOffset = Math.ceil(pageBoxNum / 2) - 1;

      if(currentPageIndex >= startOffset){
        startPageIndex = currentPageIndex - startOffset;
      }else{
        startPageIndex = 0;
      }
    }

    endPageIndex = startPageIndex + pageBoxNum - 1;
    if(endPageIndex > lastPageIndex){
      endPageIndex = lastPageIndex;
    }

    pageBoxNum = endPageIndex - startPageIndex + 1;

    //page or label
    var labelName = getLabelName();

    //search
    var searchQueryInfo = null;

    if(isSearch()){
      searchQueryInfo = {
        searchQuery:getSearchQuery(),
        updatedMax:getURLQueryString('updated-max'),
        updatedMin:getURLQueryString('updated-min'),
        byDate:getURLQueryString('by-date'),
      };
    }

    //create
    var divAppend = $('#id_PageNavi_divNext');
    var i;
    var pageIndexDIV;
    var pageIndexAnchor;
    var pageIndex;
    var pageIndexAnchorInfos = [];

    for(i = 0 ; i < pageBoxNum ; i ++){
      pageIndexDIV = $('<div>');
      pageIndexAnchor = $('<a>');
      pageIndex = startPageIndex + i;

      pageIndexDIV.attr('class','cls_PageNavi_divPageBox');
      pageIndexAnchor.attr('class','cls_PageNavi_anchorPageBox cls_DarkButtonAnimation');
      pageIndexAnchor.text(pageIndex + 1);

      pageIndexDIV.append(pageIndexAnchor);
      divAppend.after(pageIndexDIV);

      if(currentPageIndex == pageIndex){
        pageIndexAnchor.addClass('cls_PageNavi_anchorPageBox_Current');
      }

      divAppend = pageIndexDIV;
      pageIndexAnchorInfos.push({pageIndexAnchorObject:pageIndexAnchor,pageIndex:pageIndex,labelName:labelName,searchQueryInfo:searchQueryInfo,postCountPerPage:postCountPerPage});
    }

    if((currentPageIndex != -1) && (currentPageIndex > 0)){
      pageIndex = currentPageIndex - 1;

      divPageNaviNext.css('visibility','visible');
      pageIndexAnchorInfos.push({pageIndexAnchorObject:$('#id_PageNavi_anchorNext'),pageIndex:pageIndex,labelName:labelName,searchQueryInfo:searchQueryInfo,postCountPerPage:postCountPerPage});
    }

    if((currentPageIndex != -1) && (currentPageIndex < lastPageIndex)){
      pageIndex = currentPageIndex + 1;

      divPageNaviPrev.css('visibility','visible');
      pageIndexAnchorInfos.push({pageIndexAnchorObject:$('#id_PageNavi_anchorPrev'),pageIndex:pageIndex,labelName:labelName,searchQueryInfo:searchQueryInfo,postCountPerPage:postCountPerPage});
    }

    var width = (pageBoxNum + 2) * 48;
    $('#id_divPageNaviContainer').width(width);

    setupPageNaviURL(pageIndexAnchorInfos,totalPostCount);
  }else{
    var anchorPageNaviNext = $("#id_PageNavi_anchorNext");
    var anchorPageNaviPrev = $("#id_PageNavi_anchorPrev");
    var isShowdivPageNaviContainer = false;

    if(anchorPageNaviNext.attr('pageLink')){
      anchorPageNaviNext.attr('href',anchorPageNaviNext.attr('pageLink'));
      divPageNaviNext.css('visibility','visible');
      isShowdivPageNaviContainer = true;
    }

    if(anchorPageNaviPrev.attr('pageLink')){
      anchorPageNaviPrev.attr('href',anchorPageNaviPrev.attr('pageLink'));
      divPageNaviPrev.css('visibility','visible');
      isShowdivPageNaviContainer = true;
    }

    $('#id_PageNav_divLoading').css('display','none');

    if(isShowdivPageNaviContainer){
      $('#id_divPageNaviContainer').css('display','block');
      $('#id_divPageNaviContainer').width(divPageNaviNext.outerWidth(true) + divPageNaviPrev.outerWidth(true));
    }
  }
}

function getCurrentPageIndex(){
  var currentPageIndex = -1;
  var urlQueryStrings = getURLQueryStrings();

  if(Object.keys(urlQueryStrings).length === 0){
    currentPageIndex = 0;
  }else{

    if('pageNum' in urlQueryStrings){
      currentPageIndex = parseInt(urlQueryStrings['pageNum'],10);
    }else{
      if(isLabel()){
        if( (('updated-max' in urlQueryStrings) === false) && ('max-results' in urlQueryStrings) === true){
          currentPageIndex = 0;
        }
      }else if(isSearch()){

        if('start' in urlQueryStrings){
          currentPageIndex = parseInt(urlQueryStrings['start'],10);
        }
      }else if((Object.keys(urlQueryStrings).length == 1) && ('m' in urlQueryStrings)){
        currentPageIndex = 0;
      }
    }
  }

  return currentPageIndex;
}

function setupPageNaviURL(pageIndexAnchorInfos,totalPostCount){
  var pageIndexAnchorInfo;
  var i;
  var length = pageIndexAnchorInfos.length;
  var processedInfo = {totalCount:length,processedCount:0};
  var index;

  for(i = 0 ; i < length ; i ++){
    pageIndexAnchorInfo = pageIndexAnchorInfos[i];
    index = pageIndexAnchorInfo['pageIndex'] * pageIndexAnchorInfo['postCountPerPage'];

    if(index === 0){
      //we don't need feed at page index 0 and index 0 is invalid
      //but get as 1 for common process
      index = 1;
    }
    else if(index > totalPostCount){
      index = totalPostCount;
    }

    if(pageIndexAnchorInfo['labelName']){
      getLabelPostPublishedTime(index,pageIndexAnchorInfo['labelName'],successSetupPageNaviURLCallback,pageIndexAnchorInfo,processedInfo);
    }else if(pageIndexAnchorInfo.searchQueryInfo){
      getSearchPostPublishedTime(index,pageIndexAnchorInfo.
          searchQueryInfo.searchQuery,
          pageIndexAnchorInfo.searchQueryInfo.updatedMax,
          pageIndexAnchorInfo.searchQueryInfo.updatedMin,
          pageIndexAnchorInfo.searchQueryInfo.byDate,
          successSetupPageNaviURLCallback,pageIndexAnchorInfo,processedInfo);
    }
    else{
      getPostPublishedTime(index,successSetupPageNaviURLCallback,pageIndexAnchorInfo,processedInfo);
    }
  }
}

function successSetupPageNaviURLCallback(publishedTime,pageIndexAnchorInfo,processedInfo){
  var href = getHomepageURL();

  if(publishedTime){
    var postPublishedTime;
    var labelName = pageIndexAnchorInfo['labelName'];
    var searchQueryInfo = pageIndexAnchorInfo.searchQueryInfo;

    if(searchQueryInfo){
      searchQueryInfo.startIndex = pageIndexAnchorInfo.pageIndex * pageIndexAnchorInfo.postCountPerPage;
      searchQueryInfo.maxResults = pageIndexAnchorInfo.postCountPerPage;
      href = createParameterizeURL(searchQueryInfo) + '&pageNum=' + pageIndexAnchorInfo.pageIndex;
    }else{

      if(labelName){
        href += 'search/label/' + labelName;
      }

      if(pageIndexAnchorInfo['pageIndex'] === 0){
        if(labelName){
          href += '?max-results=' + pageIndexAnchorInfo['postCountPerPage'];
        }
      }else{
        postPublishedTime = adjustPostTimeForURL(publishedTime);

        if(labelName){
          href += '?updated-max=' + postPublishedTime;
        }else{
          href += 'search?updated-max=' + postPublishedTime;
        }

        href += '&max-results=' + pageIndexAnchorInfo['postCountPerPage'];
        href += '&by-date=true';
        href += '&pageNum=' + pageIndexAnchorInfo['pageIndex'];
      }
    }
  }

  href = adjustURLForMobile(href);

  pageIndexAnchorInfo['pageIndexAnchorObject'].attr('href',href);
  processedInfo['processedCount'] ++;

  if(processedInfo['processedCount'] == processedInfo['totalCount']){
    //Show
    $('#id_PageNav_divLoading').css('display','none');
    $('#id_divPageNaviContainer').css('display','block');
  }
}
