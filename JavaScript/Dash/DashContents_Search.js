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
  /*
  {  
    divSearchCategoryHead = $('<div>');
    divSearchCategoryHead.attr('class','cls_Dash_Category_Head_div' + categoryName + ' cls_Dash_Category_Head_' + categoryName + '_divSearchOrderBy');
    divSearchCategoryHead.text('検索結果の表示順');
    
    divSearchCategory.append(divSearchCategoryHead);
  }
  
  {    
    divSearchCategoryContents = $('<div>');
    divSearchCategoryContents.attr('class','cls_Dash_Category_Contents_div' + categoryName + ' cls_Dash_Category_Contents_' + categoryName + '_divSearchOrderBy');
    
    divButton = $('<div>');
    divButton.attr('id','id_Dash_Category_Contents_' + categoryName + '_divSearchOrderByDate');
    divButton.attr('class','userNoSelect cls_Dash_Category_Contents_' + categoryName + '_divSearchOrderByDate');
    divButton.text('記事の日付順');
    divButton.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    divButton.on('click',onDashSearchCategoryContentsSearchOrderByClick);
    divSearchCategoryContents.append(divButton);

    divButton = $('<div>');
    divButton.attr('id','id_Dash_Category_Contents_' + categoryName + '_divSearchOrderByRelativity');
    divButton.attr('class','userNoSelect cls_Dash_Category_Contents_' + categoryName + '_divSearchOrderByRelativity');
    divButton.text('関連性の高い順');    
    divButton.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    divButton.on('click',onDashSearchCategoryContentsSearchOrderByClick);
    divSearchCategoryContents.append(divButton);

    divSearchCategoryContents.append("<div class='clear'></div>");

    divSearchCategory.append(divSearchCategoryContents);
    
    setupSearchOrderBy('id_Dash_Category_Contents_' + categoryName + '_divSearchOrderByDate');
  }

  {
    divSearchCategoryHead = $('<div>');
    divSearchCategoryHead.attr('class','cls_Dash_Category_Head_div' + categoryName + ' cls_Dash_Category_Head_' + categoryName + '_divSearchDate');
    divSearchCategoryHead.text('検索する記事の日付');

    divSearchCategory.append(divSearchCategoryHead);
  }
  
  {
    var inputDate;
    var spanSearchItemTitle;
    var divDateContainer;
    
    divSearchCategoryContents = $('<div>');
    divSearchCategoryContents.attr('class','cls_Dash_Category_Contents_div' + categoryName + ' cls_Dash_Category_Contents_' + categoryName + '_divSearchDate');
    
    divDateContainer = $('<div>');
    divDateContainer.attr('class','cls_Dash_Category_Contents_' + categoryName + '_divStartSearchDateContainer');
    divSearchCategoryContents.append(divDateContainer);
    
    spanSearchItemTitle = $('<span>');
    spanSearchItemTitle.attr('class','cls_Dash_Category_Contents_' + categoryName + '_divStartSearchDate');
    spanSearchItemTitle.text('開始日：');
    divDateContainer.append(spanSearchItemTitle);
    
    inputDate = $('<input>');
    inputDate.attr('id','id_Dash_Category_Contents_' + categoryName + '_inputStartSearchDate');
    inputDate.attr('class','cls_Dash_Category_Contents_' + categoryName + '_inputStartSearchDate');
    divDateContainer.append(inputDate);

    inputDate.datepicker({
        beforeShow:onDashBeforeShowDatepicker,
        onChangeMonthYear:onDasChangeMonthYearDatepicker,
        onClose:onDasCloseDatepicker,
    　});

    divDateContainer = $('<div>');
    divDateContainer.attr('class','cls_Dash_Category_Contents_' + categoryName + '_divEndSearchDateContainer');
    divSearchCategoryContents.append(divDateContainer);

    spanSearchItemTitle = $('<span>');
    spanSearchItemTitle.attr('class','cls_Dash_Category_Contents_' + categoryName + '_divEndSearchDate');
    spanSearchItemTitle.text('終了日：');
    divDateContainer.append(spanSearchItemTitle);

    inputDate = $('<input>');
    inputDate.attr('id','id_Dash_Category_Contents_' + categoryName + '_inputEndSearchDate');
    inputDate.attr('class','cls_Dash_Category_Contents_' + categoryName + '_inputEndSearchDate');
    divDateContainer.append(inputDate);

    inputDate.datepicker({
        beforeShow:onDashBeforeShowDatepicker,
        onChangeMonthYear:onDasChangeMonthYearDatepicker,
        onClose:onDasCloseDatepicker,        
    　});

    divSearchCategoryContents.append("<div class='clear'></div>");

    divSearchCategory.append(divSearchCategoryContents);
  }

  {
    divSearchCategoryHead = $('<div>');
    divSearchCategoryHead.attr('class','cls_Dash_Category_Head_div' + categoryName + ' cls_Dash_Category_Head_' + categoryName + '_divSearchRun');
    divSearchCategoryHead.text('検索の実行');

    divSearchCategory.append(divSearchCategoryHead);
  }
*/

/*
  {    
    divSearchCategoryContents = $('<div>');
    divSearchCategoryContents.attr('class','cls_Dash_Category_Contents_div' + categoryName + ' cls_Dash_Category_Contents_' + categoryName + '_divSearchRun');
    
    divButton = $('<div>');
    divButton.attr('id','id_Dash_Category_Contents_' + categoryName + '_divQuickSearch');
    divButton.attr('class','userNoSelect cls_Dash_Category_Contents_' + categoryName + '_divQuickSearch');
    divButton.text('クイック検索');
    divButton.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    divButton.on('click',onDashCategoryContentsQuickSearchClick);
    divButton.data('searchType','quickSearch');
    divSearchCategoryContents.append(divButton);

    divButton = $('<div>');
    divButton.attr('id','id_Dash_Category_Contents_' + categoryName + '_divNormalSearch');
    divButton.attr('class','userNoSelect cls_Dash_Category_Contents_' + categoryName + '_divNormalSearch');
    divButton.text('検索');    
    divButton.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    divButton.on('click',onDashCategoryContentsNormalSearchClick);
    divButton.data('searchType','normalSearch');
    divSearchCategoryContents.append(divButton);

    divButton = $('<div>');
    divButton.attr('id','id_Dash_Category_Contents_' + categoryName + '_divTermSearch');
    divButton.attr('class','userNoSelect cls_Dash_Category_Contents_' + categoryName + '_divTermSearch');
    divButton.text('期間検索');    
    divButton.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    divButton.on('click',onDashCategoryContentsTermSearchClick);
    divButton.data('searchType','termSearch');
    divSearchCategoryContents.append(divButton);
    
    divButton = $('<div>');
    divButton.attr('id','id_Dash_Category_Contents_' + categoryName + '_divGoogleCustomSearch');
    divButton.attr('class','userNoSelect cls_Dash_Category_Contents_' + categoryName + '_divGoogleCustomSearch');
    divButton.text('検索');    
    divButton.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    divButton.on('click',onDashCategoryContentsGoogleCustomSearchClick);
    divButton.data('searchType','googleCustomSearch');
    divSearchCategoryContents.append(divButton);

    divSearchCategoryContents.append("<div class='clear'></div>");

    divSearchCategory.append(divSearchCategoryContents);    
  }
  */
  
  
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

function onDashSearchCategoryContentsSearchOrderByClick(event){
  setupSearchOrderBy($(this).attr('id'));
}

function setupSearchOrderBy(buttonID){
  var divSearchCategory = $('#id_Dash_Category_divSearch');
  var categoryName = divSearchCategory.data('categoryName');
  var divOrderByDate = $('#id_Dash_Category_Contents_' + categoryName + '_divSearchOrderByDate');
  var divOrderByRelativity = $('#id_Dash_Category_Contents_' + categoryName + '_divSearchOrderByRelativity');
  
  divSearchCategory.data('checkedButtonID',buttonID);
  
  if(buttonID == divOrderByDate.attr('id')){
    divOrderByDate.hover(onDash_HoverOut_Animate,onDash_HoverIn_Animate);
    divOrderByDate.css('background-color','rgba(157,156,156,0.4)');
    divOrderByRelativity.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    divOrderByRelativity.css('background-color','transparent');
  }else if(buttonID == divOrderByRelativity.attr('id')){
    divOrderByRelativity.hover(onDash_HoverOut_Animate,onDash_HoverIn_Animate);
    divOrderByRelativity.css('background-color','rgba(157,156,156,0.4)');
    divOrderByDate.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    divOrderByDate.css('background-color','transparent');
  }
}

function onDashCategoryContentsQuickSearchClick(event){  
  doDashCategoryContentsQuickSearchClick();
}

function doDashCategoryContentsQuickSearchClick(){
  var itemInfo = createSearchItemInfo('quickSearch');
  var divMessageIcon = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageText');
    
  if(itemInfo.itemData.errorMessage){
    divMessageIcon.css('background-image','url("//lh5.googleusercontent.com/-eAlUY5qd_7k/VQeuIk1rJrI/AAAAAAAA_s0/RN506olTU48/s800/Dash_Search_ErrorIcon.png")');
    divMessageText.html(itemInfo.itemData.errorMessage);
  }else{
    setDefaultMessage(itemInfo.categoryName);
    setupDashContentsDetail(null);
  }
}

function setDefaultMessage(categoryName){
  var divMessageIcon = $('#id_Dash_Category_Contents_' + categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + categoryName + '_divMessageText');
 
  divMessageIcon.css('background-image','url("//lh4.googleusercontent.com/-ySGf4MAzLx4/VQfAxiLWcSI/AAAAAAAA_tE/gD3zQsb5fnU/s800/Dash_Search_InfoIcon.png")');
  divMessageText.html('検索を実行するには、検索キーワードを入力し「エンター」キーを押してください。');
  
}

function onDashCategoryContentsNormalSearchClick(event){
  var searchType = $(this).data('searchType');
  var itemInfo = createSearchItemInfo(searchType);

  var divMessageIcon = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageText');
    
  if(itemInfo.itemData.errorMessage){
    divMessageIcon.css('background-image','url("//lh5.googleusercontent.com/-eAlUY5qd_7k/VQeuIk1rJrI/AAAAAAAA_s0/RN506olTU48/s800/Dash_Search_ErrorIcon.png")');
    divMessageText.html(itemInfo.itemData.errorMessage);
  }else{
    var params = createSearchPostParams(itemInfo,searchType);
    var href = createParameterizeURL(params);
    
    window.location.href = href;
  }
}

function onDashCategoryContentsTermSearchClick(event){
  var searchType = $(this).data('searchType');
  var itemInfo = createSearchItemInfo(searchType);

  var divMessageIcon = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageText');
    
  if(itemInfo.itemData.errorMessage){
    divMessageIcon.css('background-image','url("//lh5.googleusercontent.com/-eAlUY5qd_7k/VQeuIk1rJrI/AAAAAAAA_s0/RN506olTU48/s800/Dash_Search_ErrorIcon.png")');
    divMessageText.html(itemInfo.itemData.errorMessage);
  }else{
    var params = createSearchPostParams(itemInfo,searchType);
    var href = createParameterizeURL(params);
    
    window.location.href = href;
  }
}

function doDashCategoryContentsGoogleCustomSearchClick(){
  var searchType = 'googleCustomSearch';
  var itemInfo = createSearchItemInfo(searchType);

  var divMessageIcon = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageText');
    
  if(itemInfo.itemData.errorMessage){
    divMessageIcon.css('background-image','url("//lh5.googleusercontent.com/-eAlUY5qd_7k/VQeuIk1rJrI/AAAAAAAA_s0/RN506olTU48/s800/Dash_Search_ErrorIcon.png")');
    divMessageText.html(itemInfo.itemData.errorMessage);
  }else{
    var params = createSearchPostParams(itemInfo,searchType);
    var href = '//kledgeb.blogspot.com/p/cseresult.html?cseq=' + params.searchQuery;
    
    window.location.href = href;
  }  
}

function onDashCategoryContentsGoogleCustomSearchClick(event){
  doDashCategoryContentsGoogleCustomSearchClick();
}

function onDashBeforeShowDatepicker(input, inst){
  $('#ui-datepicker-div').addClass('cls_Dash_Carendar');

  setTimeout(setHoverEvent,1);
}

function onDasChangeMonthYearDatepicker(year,month,inst){
  setTimeout(setHoverEvent,1);
}

function onDasCloseDatepicker(date,inst){
  $('#ui-datepicker-div').removeClass('cls_Dash_Carendar');
}

function setHoverEvent(){
  $('#ui-datepicker-div.cls_Dash_Carendar .ui-icon-circle-triangle-w').hover(onDashDatepicker_HoverIn_Animate,onDashDatepicker_HoverOut_Animate);
  $('#ui-datepicker-div.cls_Dash_Carendar .ui-icon-circle-triangle-e').hover(onDashDatepicker_HoverIn_Animate,onDashDatepicker_HoverOut_Animate);
  $('#ui-datepicker-div.cls_Dash_Carendar .ui-datepicker-calendar a.ui-state-default').hover(onDashDatepicker_HoverIn_Animate,onDashDatepicker_HoverOut_Animate);
  $('#ui-datepicker-div.cls_Dash_Carendar .ui-datepicker-current').hover(onDashDatepicker_HoverIn_Animate,onDashDatepicker_HoverOut_Animate);
  $('#ui-datepicker-div.cls_Dash_Carendar .ui-datepicker-close').hover(onDashDatepicker_HoverIn_Animate,onDashDatepicker_HoverOut_Animate);
  $('#ui-datepicker-div.cls_Dash_Carendar .ui-datepicker-year').hover(onDashDatepicker_HoverIn_Animate,onDashDatepicker_HoverOut_Animate);
  $('#ui-datepicker-div.cls_Dash_Carendar .ui-datepicker-month').hover(onDashDatepicker_HoverIn_Animate,onDashDatepicker_HoverOut_Animate);
}

function onDashDatepicker_HoverIn_Animate(eventObject){
  $(this).stop().animate({ backgroundColor: 'rgba(157,156,156,0.4)'}, 200);
}

function onDashDatepicker_HoverOut_Animate(eventObject){
  $(this).stop().animate({ backgroundColor: 'transparent'}, 200);
}

function createSearchItemInfo(searchType){
  var divSearchCategory = $('#id_Dash_Category_divSearch');
  var categoryName = divSearchCategory.data('categoryName');
  var orderBy = 'true';
  
  var inputDate;
  var dateValue;
  var stratDateObject = null;
  var endDateObject = null;
  
  var stratDate = null;
  var endDate = null;
  
  var itemTitle;
  
  var errorMessage = null;
  
  /*
  if(divSearchCategory.data('checkedButtonID') == 'id_Dash_Category_Contents_' + categoryName + '_divSearchOrderByRelativity'){
    orderBy = 'false';
  }
  
  {
    inputDate = $('#id_Dash_Category_Contents_' + categoryName + '_inputStartSearchDate');
    dateValue = inputDate.val().trim();
    
    if(dateValue.length > 0){
      stratDateObject = new Date(dateValue);
      stratDate = createDateURL(stratDateObject);
    }
  }
  
  {
    inputDate = $('#id_Dash_Category_Contents_' + categoryName + '_inputEndSearchDate');
    dateValue = inputDate.val().trim();
    
    if(dateValue.length > 0){
      endDateObject = new Date(dateValue);
      endDate = createDateURL(endDateObject);
    }
  }
  
  if(stratDateObject && endDateObject){
    if((stratDateObject > endDateObject) && (!errorMessage)){
      errorMessage = '入力された日付が不正です。<br>入力された終了日が開始日より前に設定されています。';
      endDate = '' + stratDateObject.getFullYear() + '-' + (stratDateObject.getMonth() + 1) + '-' + stratDateObject.getDate() + 'T23:59:59%2B09:00';      
    }
  }
  */
  {
    var inputSearchBox = $('#id_Dash_inputSearchBox');
    
    itemTitle = inputSearchBox.val().trim();
    
    if(!errorMessage){
    
      if((itemTitle.length === 0) && (searchType != 'termSearch')){
        errorMessage = '検索キーワードが入力されていません。<br>検索キーワードを入力してください。';
      } 
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
          orderBy:orderBy,
          stratDateObject:stratDateObject,
          endDateObject:endDateObject,
          stratDate:stratDate,
          endDate:endDate,
          postIndex:1,
          pageIndex:1,
          postCountPerPage:20,
          errorMessage:errorMessage},
      };
}

function createDateURL(dateObject){
  var dateURL = '';
  
  dateURL += dateObject.getFullYear() + '-';
  
  if(dateObject.getMonth() < 9){
    dateURL += '0';
  }
   
  dateURL += (dateObject.getMonth() + 1) + '-';
  
  if(dateObject.getDate() <= 9){
    dateURL += '0';
  }
  
  dateURL += dateObject.getDate() + 'T00:00:00%2B09:00';
  
  return dateURL;
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
    
    divSearchResultPostContainer.css('background-image','url("//lh3.googleusercontent.com/-hPWrU_AGWVI/VPwhJbct0MI/AAAAAAAA_gM/N606_BjDiMQ/s800/Loading_Back333333_48.GIF")');    
  }
  
  getSearchPost(params,setupSearchContentsDetail_SearchPostCallback,itemInfo);
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

function setupSearchContentsDetail_SearchPostCallback(entry,feed,itemInfo){
  var divSearchResultPostContainer = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostContainer');
  var divLeftSection = $('#id_DashContentsDetail_divLeftSection');
  var divRightSection = $('#id_DashContentsDetail_divRightSection');
  
  divSearchResultPostContainer.css('background-image','none');
  
  setupContentsDetail_createSearchResultPostElement(entry,feed,itemInfo);
  setupSearchContentsDetail_SetSearchResultPostPageTitle(itemInfo);
  
  if(itemInfo.itemData.totalPostCount === 0){
    divLeftSection.css('visibility','visible');
    divRightSection.css('visibility','visible');    
  }
  else{
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
    doDashCategoryContentsGoogleCustomSearchClick();  
  }
}
