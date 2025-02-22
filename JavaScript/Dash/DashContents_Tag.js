/*-- --------------------------------------------------------------------------------
Dash Contents Tag
-------------------------------------------------------------------------------- --*/
function setupTagLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_TagLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');
  setupTagLens_TagList();
}

function setupTagLens_TagList(){
  var categoryName = 'TagList';

  addCategory(categoryName,'タグ一覧');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  divCategoryContents.data('loading',true);

  getAllCategory(setupTagLens_CreateTagElement);
}

function setupTagLens_CreateTagElement(tags) {
  var categoryName = 'TagList';
  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;

  divCategoryContents.css('background-image','none');
  divCategoryContents.data('loading',false);

  for(i = 0 ; i < tags.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:tags.length,
      categoryName:categoryName,
      itemLink:adjustURLForMobile(getHomepageURL() + 'search/label/' + encodeURIComponent(tags[i].term) + '?max-results=' + gPostCountPerPage),
      itemIconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Dash_OneTag.svg',
      itemTitle:tags[i].term,
      hasDetail:true,
      itemData:{postIndex:1,pageIndex:1,postCountPerPage:20},
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupTagContentsDetail(divItem){
  var itemInfo = divItem.data('itemInfo');

  setupContentsDetail_createSectionElement(itemInfo);
  setupContentsDetail_createSearchResultElement(itemInfo);

  {
    setupContentsDetail_createButtonContainer(itemInfo);
    setupContentsDetail_createBackButton(itemInfo);

    var divButtonContainer = $('#id_DashContentsDetail_' + itemInfo.categoryName + '_divButtonContainer');
    divButtonContainer.append("<div class='clear'></div>");
  }

  {
    var divSearchResultPostContainer = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostContainer');

    divSearchResultPostContainer.css('background-image','url("//kledgeb.github.io/UbuntuKledgeb/Image/Loading.svg")');
  }

  getLabelPostByIndex(itemInfo.itemData.postIndex,itemInfo.itemTitle,itemInfo.itemData.postCountPerPage,setupTagContentsDetail_labelPostByIndexCallback,itemInfo);
}

function setupTagContentsDetail_SetSearchResultPostPageTitle(itemInfo){
  var divTagSearchResultPostPageTitle = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostPageTitle');

  divTagSearchResultPostPageTitle.text('タグ「' + itemInfo.itemTitle + '」の検索結果：ページ' + itemInfo.itemData.pageIndex + ' / ' + itemInfo.itemData.totalPageCount);
}

function setupTagContentsDetail_labelPostByIndexCallback(entry,feed,itemInfo){
  var divSearchResultPostContainer = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostContainer');

  divSearchResultPostContainer.css('background-image','none');

  setupContentsDetail_createSearchResultPostElement(entry,feed,itemInfo);
  setupTagContentsDetail_SetSearchResultPostPageTitle(itemInfo);
}

function showPrevNextItem_TagList(itemInfo,offset){
  var pageIndex = itemInfo.itemData.pageIndex;

  pageIndex += offset;

  if(pageIndex <= 0){
    pageIndex = itemInfo.itemData.totalPageCount;
  }else if(pageIndex > itemInfo.itemData.totalPageCount){
    pageIndex = 1;
  }

  itemInfo.itemData.pageIndex = pageIndex;
  itemInfo.itemData.postIndex = (pageIndex - 1) * itemInfo.itemData.postCountPerPage + 1;

  getLabelPostByIndex(itemInfo.itemData.postIndex,itemInfo.itemTitle,itemInfo.itemData.postCountPerPage,setupTagContentsDetail_labelPostByIndexCallback,itemInfo);
}
