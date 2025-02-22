/*-- --------------------------------------------------------------------------------
Dash Contents Search
-------------------------------------------------------------------------------- --*/
function setupSearchLensContents(showParams){
  var inputSearchBox = $('#id_Dash_inputSearchBox')

  gCurrentLensArrowID = 'id_Dash_SearchLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  {
    var searchQuery = getGoogleCustomSearchQuery();

    inputSearchBox.attr('placeholder','検索');

    if(searchQuery !== null){
      inputSearchBox.val(searchQuery);
    }
  }

  var divSearchCategory;
  var divSearchCategoryHead;
  var divSearchCategoryContents;
  var divButton;
  var categoryName = 'Search';

  {
    var divContents = $('#id_Dash_divContents');

    divSearchCategory = $('<div>');
    divSearchCategory.attr('id','id_Dash_Category_div' + categoryName);
    divSearchCategory.attr('class','cls_Dash_Category_div' + categoryName);

    divSearchCategory.data('categoryName',categoryName);
    divContents.append(divSearchCategory);
  }

  {
    divSearchCategoryHead = $('<div>');
    divSearchCategoryHead.attr('class','cls_Dash_Category_Head_div' + categoryName + ' cls_Dash_Category_Head_' + categoryName + '_divSearchRun');
    divSearchCategoryHead.text('検索の実行');

    divSearchCategory.append(divSearchCategoryHead);
  }

  {
    divSearchCategoryContents = $('<div>');
    divSearchCategoryContents.attr('class','cls_Dash_Category_Contents_div' + categoryName + ' cls_Dash_Category_Contents_' + categoryName + '_divSearchRun');

    divButton = $('<div>');
    divButton.attr('id','id_Dash_Category_Contents_' + categoryName + '_divQuickSearch');
    divButton.attr('class','userNoSelect cls_Dash_Category_Contents_' + categoryName + '_divQuickSearch' + ' cls_Dash_ButtonAnimation');
    divButton.text('クイック検索');
    divButton.on('click',onDashCategoryContentsQuickSearchClick);
    divButton.data('searchType','quickSearch');
    divSearchCategoryContents.append(divButton);

    divButton = $('<div>');
    divButton.attr('id','id_Dash_Category_Contents_' + categoryName + '_divGoogleCustomSearch');
    divButton.attr('class','userNoSelect cls_Dash_Category_Contents_' + categoryName + '_divGoogleCustomSearch' + ' cls_Dash_ButtonAnimation');
    divButton.text('検索');
    divButton.on('click',onDashCategoryContentsGoogleCustomSearchClick);
    divButton.data('searchType','googleCustomSearch');
    divSearchCategoryContents.append(divButton);

    divSearchCategoryContents.append("<div class='clear'></div>");

    divSearchCategory.append(divSearchCategoryContents);
  }

  {
    var divMessageIcon;
    var divMessageText;

    divSearchCategoryContents = $('<div>');
    divSearchCategoryContents.attr('class','cls_Dash_Category_Contents_div' + categoryName + ' cls_Dash_Category_Contents_' + categoryName + '_divMessage');

    divMessageIcon = $('<div>');
    divMessageIcon.attr('id','id_Dash_Category_Contents_' + categoryName + '_divMessageIcon');
    divMessageIcon.attr('class','cls_Dash_Category_Contents_' + categoryName + '_divMessageIcon');
    divSearchCategoryContents.append(divMessageIcon);

    divMessageText = $('<div>');
    divMessageText.attr('id','id_Dash_Category_Contents_' + categoryName + '_divMessageText');
    divMessageText.attr('class','cls_Dash_Category_Contents_' + categoryName + '_divMessageText');
    divSearchCategoryContents.append(divMessageText);

    divSearchCategoryContents.append("<div class='clear'></div>");
    divSearchCategory.append(divSearchCategoryContents);

    setDefaultMessage(categoryName);
  }

}

function setDefaultMessage(categoryName){
  var divMessageIcon = $('#id_Dash_Category_Contents_' + categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + categoryName + '_divMessageText');

  divMessageIcon.css('background-image','url("//kledgeb.github.io/UbuntuKledgeb/Image/Dash_Information.svg")');
  divMessageText.html('検索を行うには、検索キーワードを入力し「検索の実行」から検索方法をクリックしてください。<br>「エンター」キーを押してクイック検索を実行することもできます。');
}

function onDashCategoryContentsQuickSearchClick(){
  doDashCategoryContentsQuickSearchClick();
}

function onDashCategoryContentsGoogleCustomSearchClick(){
  doDashCategoryContentsGoogleCustomSearchClick();
}

function doDashCategoryContentsQuickSearchClick(){
  var itemInfo = createSearchItemInfo('quickSearch');
  var divMessageIcon = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageText');

  if(itemInfo.itemData.errorMessage){
    divMessageIcon.css('background-image','url("//kledgeb.github.io/UbuntuKledgeb/Image/Dash_Error.svg")');
    divMessageText.html(itemInfo.itemData.errorMessage);
  }else{
    setDefaultMessage(itemInfo.categoryName);
    setupDashContentsDetail(null);
  }
}

function doDashCategoryContentsGoogleCustomSearchClick(){
  var itemInfo = createSearchItemInfo('googleCustomSearch');

  var divMessageIcon = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageText');

  if(itemInfo.itemData.errorMessage){
    divMessageIcon.css('background-image','url("//kledgeb.github.io/UbuntuKledgeb/Image/Dash_Error.svg")');
    divMessageText.html(itemInfo.itemData.errorMessage);
  }else{
    var params = createSearchPostParams(itemInfo,'googleCustomSearch');
    var href = '//kledgeb.blogspot.com/p/cseresult.html?cseq=' + params.searchQuery;
    window.location.href = href;
  }
}

function createSearchPostParams(itemInfo,searchType){
  var params = null;

  if(searchType == 'quickSearch'){
    params = {
      searchQuery:encodeURIComponent(itemInfo.itemTitle),
      startIndex:itemInfo.itemData.postIndex,
      maxResults:itemInfo.itemData.postCountPerPage,
    };
  }else if(searchType == 'normalSearch'){
    params = {
      searchQuery:encodeURIComponent(itemInfo.itemTitle),
      startIndex:itemInfo.itemData.postIndex - 1,
      maxResults:getMaxResults(),
      byDate:itemInfo.itemData.orderBy,
    };
  }else if(searchType == 'termSearch'){
    params = {
      startIndex:itemInfo.itemData.postIndex - 1,
      maxResults:getMaxResults(),
      updatedMin:itemInfo.itemData.stratDate,
      updatedMax:itemInfo.itemData.endDate,
    };
  }else if(searchType == 'googleCustomSearch'){
    params = {
      searchQuery:encodeURIComponent(itemInfo.itemTitle),
    };
  }

  return params;
}

function createSearchItemInfo(searchType){
  var itemTitle;
  var errorMessage = null;
  var inputSearchBox = $('#id_Dash_inputSearchBox');
  var divSearchCategory = $('#id_Dash_Category_divSearch');
  var categoryName = divSearchCategory.data('categoryName');

  itemTitle = inputSearchBox.val().trim();

  if(!errorMessage){

    if(itemTitle.length === 0){
      errorMessage = '検索キーワードが入力されていません。<br>検索キーワードを入力してください。';
    }
  }

  return {
        itemIndex:0,
        itemTotalCount:1,
        categoryName:categoryName,
        itemLink:null,
        itemIconURL:null,
        itemTitle:itemTitle,
        itemData:{
          postIndex:1,
          pageIndex:1,
          postCountPerPage:20,
          errorMessage:errorMessage
          },
      };
}

function setupSearchContentsDetail(divItem){
  var itemInfo = createSearchItemInfo('quickSearch');
  var divSearch = $('#id_Dash_Category_divSearch');
  var params;

  divSearch.data('itemInfo',itemInfo);
  setupContentsDetail_createSectionElement(itemInfo);
  setupContentsDetail_createSearchResultElement(itemInfo);

  {
    setupContentsDetail_createButtonContainer(itemInfo);
    setupContentsDetail_createBackButton(itemInfo,'検索画面に戻る');

    var divButtonContainer = $('#id_DashContentsDetail_' + itemInfo.categoryName + '_divButtonContainer');
    divButtonContainer.append("<div class='clear'></div>");
  }

  params = createSearchPostParams(itemInfo,'quickSearch');

  {
    var divSearchResultPostContainer = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostContainer');

    divSearchResultPostContainer.css('background-image','url("//kledgeb.github.io/UbuntuKledgeb/Image/Loading.svg")');
  }

  getSearchPost(params,setupSearchContentsDetail_SearchPostCallback,itemInfo);
}

function setupSearchContentsDetail_SearchPostCallback(entry,feed,itemInfo){
  var divSearchResultPostContainer = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostContainer');
  var divLeftSection = $('#id_DashContentsDetail_divLeftSection');
  var divRightSection = $('#id_DashContentsDetail_divRightSection');

  divSearchResultPostContainer.css('background-image','none');

  setupContentsDetail_createSearchResultPostElement(entry,feed,itemInfo);
  setupSearchContentsDetail_SetSearchResultPostPageTitle(itemInfo);

  if(itemInfo.itemData.totalPostCount === 0){
    divLeftSection.css('visibility','hidden');
    divRightSection.css('visibility','hidden');
  }else{
    var pageIndex = itemInfo.itemData.pageIndex;

    if(pageIndex == 1){
      divLeftSection.css('visibility','hidden');
    }else{
      divLeftSection.css('visibility','visible');
    }

    if(parseFeedLink(feed.link,'next')){
      itemInfo.itemData['isQuickSearchLastPage'] = false;
      divRightSection.css('visibility','visible');
    }else{
      itemInfo.itemData['isQuickSearchLastPage'] = true;
      divRightSection.css('visibility','hidden');
    }
  }
}

function setupSearchContentsDetail_SetSearchResultPostPageTitle(itemInfo){
  var divTagSearchResultPostPageTitle = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostPageTitle');
  var title = '「' + itemInfo.itemTitle + '」の検索結果：';

  if(itemInfo.itemData.totalPostCount){
    title += itemInfo.itemData.pageIndex + 'ページ';
  }else{
    title += '見つかりませんでした。';
  }

  divTagSearchResultPostPageTitle.text(title);
}

function showPrevNextItem_Search(itemInfo,offset){
  var pageIndex = itemInfo.itemData.pageIndex;
  var newPageIndex = pageIndex + offset;
  var params;

  if(offset < 0){
    if((pageIndex === 1) && (newPageIndex === 1)){
      newPageIndex = null;
    }else if((pageIndex === 1) && (newPageIndex <= 0)){
      newPageIndex = 0;
    }
  }else if(offset > 0){
    if(itemInfo.isQuickSearchLastPage){
      newPageIndex = null;
    }
  }

  if(newPageIndex !== null){
    itemInfo.itemData.pageIndex = newPageIndex;
    itemInfo.itemData.postIndex = (newPageIndex - 1) * itemInfo.itemData.postCountPerPage + 1;

    params = createSearchPostParams(itemInfo,'quickSearch');

    getSearchPost(params,setupSearchContentsDetail_SearchPostCallback,itemInfo);
  }
}

function searchDashContents_Search(searchText,byTimer){
  if((byTimer === false) && (searchText)){
    doDashCategoryContentsQuickSearchClick();
  }
}
