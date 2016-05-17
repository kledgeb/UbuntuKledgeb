/*-- --------------------------------------------------------------------------------
Dash Contents Star
-------------------------------------------------------------------------------- --*/
function setupStarLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_StarLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');
  setupStarLens_Bookmark();
  //setupStarLens_PageHistory();
  //setupStarLens_PopularPostPost();

  //Option
  addShowHideAllOption();
}

function setupStarLens_PopularPostPost(){
  var categoryName = 'PopularPost';
  
  addCategory(categoryName,'人気の記事');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;
  
  for(i = 0 ; i < gPopularPosts.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:gPopularPosts.length,
      categoryName:categoryName,
      itemLink:gPopularPosts[i].itemLink,
      itemIconURL:gPopularPosts[i].itemIconURL,
      itemTitleHTML:gPopularPosts[i].itemTitle,
      itemData:{popularPostInfo:gPopularPosts[i]},
      hasDetail:true,
      autoEllipsis:true,
   };
    
    addCategoryItem(categoryItemInfo);
  }
  
  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
  
}

function setupStarLens_PageHistory(){
  var categoryName = 'PageHistory';
  
  addCategory(categoryName,'記事の履歴');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;
  var myLocalStorage = $.localStorage;
  var pageHistory = myLocalStorage.get('pageHistory');
  
  if(pageHistory){
    
    for(i = 0 ; i < pageHistory.length ; i ++){
      categoryItemInfo = {
        itemIndex:i,
        itemTotalCount:pageHistory.length,
        categoryName:categoryName,
        itemLink:pageHistory[i].canonicalUrl,
        itemIconURL:adjustURLProtocol(pageHistory[i].thumbnailUrl),
        itemTitleHTML:pageHistory[i].title,
        hasDetail:true,
        itemData:{pageHistory:pageHistory[i]},
        autoEllipsis:true,
      };
      
      addCategoryItem(categoryItemInfo);
    }
  }
  
  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);  
}

function setupStarLens_Bookmark(){
  var categoryName = 'Bookmark';
  
  addCategory(categoryName,'ブックマーク');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;
  var bookmark = getAllBookmarks();
  
  if(bookmark){
    
    for(i = 0 ; i < bookmark.length ; i ++){
      categoryItemInfo = {
        itemIndex:i,
        itemTotalCount:bookmark.length,
        categoryName:categoryName,
        itemLink:bookmark[i].canonicalUrl,
        itemIconURL:adjustURLProtocol(bookmark[i].thumbnailUrl),
        itemTitleHTML:bookmark[i].title,
        hasDetail:true,
        itemData:{bookmark:bookmark[i]},
        autoEllipsis:true,
      };
      
      addCategoryItem(categoryItemInfo);
    }
  }
  
  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);  
}

function setupStarContentsDetail(divItem){
  var itemInfo = divItem.data('itemInfo');
  
  if(itemInfo.categoryName == 'PopularPost'){
    var itemIconURL = null;

    setupContentsDetail_createSectionElement(itemInfo);
    setupContentsDetail_createTitleElement(itemInfo,null);
      
    if(itemInfo.itemIconURL){
      itemIconURL = getSizedThumbnailURL(itemInfo.itemIconURL,320);
    }
      
    setupContentsDetail_createThumbnailAndSummary(itemInfo,itemIconURL,$('<p>' + itemInfo.itemData.popularPostInfo.itemSummary + '</p>').text());  
    setupContentsDetail_createButtons(itemInfo,null);
  }else if(itemInfo.categoryName == 'PageHistory'){
    setupStarContentsDetail_PageHistoryAndBookmark(itemInfo,itemInfo.itemData.pageHistory);
  }else if(itemInfo.categoryName == 'Bookmark'){
    setupStarContentsDetail_PageHistoryAndBookmark(itemInfo,itemInfo.itemData.bookmark);
  }
}

function setupStarContentsDetail_PageHistoryAndBookmark(itemInfo,postInfo){
  setupContentsDetail_createSectionElement(itemInfo);
  setupContentsDetail_createTitleElement(itemInfo,null);
  
  {
    var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
    var divPostInfoContainer = $('<div/>');
    var divPostInfoData = $('<div/>');
    
    //PostInfoContainer
    {
      divPostInfoContainer.attr('class','cls_DashContentsDetail_divPostInfoContainer cls_DashContentsDetail_' + itemInfo.categoryName + '_divPostInfoContainer');
      divCenterSection.append(divPostInfoContainer);
    }
   
    //Post Tag
    if(postInfo.labels)
    {
      var anchorTag;
      
      divPostInfoData.attr('class','cls_DashContentsDetail_divPostTag cls_DashContentsDetail_' + itemInfo.categoryName + '_divPostTag');
      
      for(i = 0 ; i < postInfo.labels.length ; i ++){
        anchorTag = $('<a>');
        anchorTag.text(postInfo.labels[i]);
        anchorTag.attr('href',adjustURLForMobile(getHomepageURL() + 'search/label/' + encodeURIComponent(postInfo.labels[i]) + '?&max-results=' + gPostCountPerPage));
        //anchorTag.attr('target','_blank');
        
        if(i > 0){
          divPostInfoData.append(' , ');
        }
        
        divPostInfoData.append(anchorTag);
      }
      
      divPostInfoContainer.append(divPostInfoData);
    }

    //Post Date
    {
      divPostInfoData = $('<div/>');
      
      divPostInfoData.attr('class','cls_DashContentsDetail_divPostDate cls_DashContentsDetail_' + itemInfo.categoryName + '_divPostDate');
      divPostInfoData.text(adjustPostDate(postInfo.timestamp));
      divPostInfoContainer.append(divPostInfoData);
      
      divPostInfoContainer.append("<div class='clear'></div>");
    }
  }
  
  {
    var itemIconURL = null;

    if(itemInfo.itemIconURL){
      itemIconURL = getSizedThumbnailURL(itemInfo.itemIconURL,320);
    }
    
    setupContentsDetail_createThumbnailAndSummary(itemInfo,itemIconURL,postInfo.snippet);
  }
  
  {  
    if(itemInfo.categoryName == 'PageHistory'){
      var divAddBookmark = $('<div/>');

      divAddBookmark.text('ブックマークに追加');      
      divAddBookmark.attr('class','cls_DashContentsDetail_divAddBookmarkButton cls_DashContentsDetail_' + itemInfo.categoryName + '_divAddBookmarkButton userNoSelect');
      divAddBookmark.on('click',onDashContentsDetail_Start_AddBookmarkButtonClick);
      
      setupContentsDetail_createButtons(itemInfo,[divAddBookmark]);
    }else if(itemInfo.categoryName == 'Bookmark'){
      var divRemoveButton = null;
      
      divRemoveButton = $('<div/>');
      divRemoveButton.text('ブックマークの削除');
      divRemoveButton.attr('class','cls_DashContentsDetail_divRemoveButton cls_DashContentsDetail_' + itemInfo.categoryName + '_divRemoveButton userNoSelect');      
      divRemoveButton.on('click',onDashContentsDetail_Start_RemoveBookmarkButtonClick);

      setupContentsDetail_createButtons(itemInfo,[divRemoveButton]);
    }     
  }
}

function onDashContentsDetail_Start_RemoveBookmarkButtonClick(event){
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
  var itemInfo = divCenterSection.data('itemInfo');
  
  removeBookmarkByIndex(itemInfo.itemIndex);
  
  switchLens('Star',null,true);
}


function onDashContentsDetail_Start_AddBookmarkButtonClick(event){
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
  var itemInfo = divCenterSection.data('itemInfo');
  var myLocalStorage = $.localStorage;
  var pageHistory = myLocalStorage.get('pageHistory');
  
  addPostToBookmark(pageHistory[itemInfo.itemIndex]);
  switchLens('Star',null,true);
}
