/*-- --------------------------------------------------------------------------------
Dash Contents Detail
-------------------------------------------------------------------------------- --*/
function setupDashContentsDetail(divItem){
  var divContentsDetail = $('#id_Dash_divContentsDetail');
  var divContents = $('#id_Dash_divContents');

  divContents.hide();
  clearDashContentsDetail();

  switch(gCurrentLens){
  case 'Home':
    setupHomeContentsDetail(divItem);
    break;
  case 'Ubuntu':
    setupUbuntuContentsDetail(divItem);
    break;
  case 'WebSite':
    setupWebSiteContentsDetail(divItem);
    break;
  case 'Star':
    setupStarContentsDetail(divItem);
    break;
  case 'Tag':
    setupTagContentsDetail(divItem);
    break;
  case 'Search':
    setupSearchContentsDetail(divItem);
    break;
  case 'YouTube':
    setupYouTubeContentsDetail(divItem);
    break;
  }

  if(gCurrentLens != 'YouTube'){
    var divCenterSection = $('#id_DashContentsDetail_divCenterSection');

    divCenterSection.mCustomScrollbar({
      theme:'light-3',
      autoHideScrollbar:true,
      scrollInertia:1000,
      mouseWheel:{ preventDefault: true }
    });
  }

  divContentsDetail.show();
  layoutContentsDetail();
}

function clearDashContentsDetail(){
  var divContentsDetail = $('#id_Dash_divContentsDetail');
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');

  if((divCenterSection.length) && (divCenterSection.length > 0)){
    //CustomScrollbar's bug ?
    divCenterSection.mCustomScrollbar('destroy');
  }

  divContentsDetail.empty();
  divContentsDetail.hide();
}

function closeDashContentsDetail(){
  var divContentsDetail = $('#id_Dash_divContentsDetail');
  var divContents = $('#id_Dash_divContents');

  if(divContentsDetail.is(':visible')){
    divContentsDetail.hide();
    divContents.show();
    layoutContents();
  }
}

function layoutContentsDetail(){
  var divContentsDetail = $('#id_Dash_divContentsDetail');

  var divLeftSection = $('#id_DashContentsDetail_divLeftSection');
  var divCenterSectionContainer = $('#id_DashContentsDetail_divCenterSectionContainer');
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
  var divBottomSection = $('#id_DashContentsDetail_divBottomSection');
  var divRightSection = $('#id_DashContentsDetail_divRightSection');

  {
    var divContentsContainer = $('#id_Dash_divContentsContainer');

    divContentsDetail.outerWidth(divContentsContainer.width());
    divContentsDetail.outerHeight(divContentsContainer.height());
  }

  divCenterSectionContainer.outerWidth(divContentsDetail.width() - divLeftSection.outerWidth(true) - divRightSection.outerWidth(true));

  divLeftSection.outerHeight(divContentsDetail.height());
  divCenterSectionContainer.outerHeight(divContentsDetail.height());
  divCenterSection.outerHeight(divCenterSectionContainer.height() - divBottomSection.outerHeight(true));
  divRightSection.outerHeight(divContentsDetail.height());
}

function setupContentsDetail_createSectionElement(itemInfo){
  var divContentsDetail = $('#id_Dash_divContentsDetail');
  var divLeftSection = $('<div>');
  var divCenterSectionContainer = $('<div>');
  var divCenterSection = $('<div>');
  var divRightSection = $('<div>');
  var divBottomSection = $('<div>');
  var divArrow;

  //LeftSection
  {
    divLeftSection.attr('id','id_DashContentsDetail_divLeftSection');
    divLeftSection.attr('class','cls_DashContentsDetail_divLeftSection');
    divArrow = $('<div>');
    divArrow.attr('class','cls_DashContentsDetail_divLeftArrow cls_Dash_ButtonAnimation');
    divArrow.on('click',onDashContentsDetail_PrevButtonClick);

    divLeftSection.append(divArrow);
    divContentsDetail.append(divLeftSection);
  }

  //CenterSectionContainer
  {
    divCenterSectionContainer.attr('id','id_DashContentsDetail_divCenterSectionContainer');
    divCenterSectionContainer.attr('class','cls_DashContentsDetail_divCenterSectionContainer');
    divContentsDetail.append(divCenterSectionContainer);
  }

  //CenterSection
  {
    divCenterSection.attr('id','id_DashContentsDetail_divCenterSection');
    divCenterSection.attr('class','cls_DashContentsDetail_divCenterSection');
    divCenterSectionContainer.append(divCenterSection);
    divCenterSection.data('itemInfo',itemInfo);
  }

  //BottomSection
  {
    divBottomSection.attr('id','id_DashContentsDetail_divBottomSection');
    divBottomSection.attr('class','cls_DashContentsDetail_divBottomSection');
    divCenterSectionContainer.append(divBottomSection);
  }

  //RightSection
  {
    divRightSection.attr('id','id_DashContentsDetail_divRightSection');
    divRightSection.attr('class','cls_DashContentsDetail_divRightSection');

    divArrow = $('<div>');
    divArrow.attr('class','cls_DashContentsDetail_divRightArrow cls_Dash_ButtonAnimation');
    divArrow.on('click',onDashContentsDetail_NextButtonClick);

    divRightSection.append(divArrow);
    divContentsDetail.append(divRightSection);
  }

  divContentsDetail.append("<div class='clear'></div>");
}

function setupContentsDetail_createTitleElement(itemInfo,title){
  var divTitle = $('<div>');
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');

  divTitle.attr('class','cls_DashContentsDetail_divTitle cls_DashContentsDetail_' + itemInfo.categoryName + '_divTitle');

  if(title){
    divTitle.text(title);
  }
  else if(itemInfo.itemTitle){
    divTitle.text(itemInfo.itemTitle);
  }else if(itemInfo.itemTitleHTML){
    divTitle.html(itemInfo.itemTitleHTML);
  }

  divCenterSection.append(divTitle);
}

function setupContentsDetail_createThumbnailAndSummary(itemInfo,thumbnail,summary){
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
  var divPostSummary;
  var divThumbnail;

  divPostSummary = $('<div>');

  if(thumbnail){
    divThumbnail = $('<div>');

    divThumbnail.attr('class','cls_DashContentsDetail_divPostThumbnail cls_DashContentsDetail_' + itemInfo.categoryName + '_divPostThumbnail');
    divThumbnail.css('background-image','url("' + thumbnail + '")');

    divPostSummary.append(divThumbnail);
  }

  divPostSummary.attr('class','cls_DashContentsDetail_divPostSummary cls_DashContentsDetail_' + itemInfo.categoryName + '_divPostSummary');
  divPostSummary.append(summary + '・・・');
  divCenterSection.append(divPostSummary);
}

function setupContentsDetail_createButtons(itemInfo,additionalButtons){
  var divBottomSection = $('#id_DashContentsDetail_divBottomSection');
  var anchorShowPostButton = $('<a>');

  setupContentsDetail_createButtonContainer(itemInfo);
  setupContentsDetail_createBackButton(itemInfo);

  var divButtonContainer = $('#id_DashContentsDetail_' + itemInfo.categoryName + '_divButtonContainer');

  //anchorShowPostButton
  {
    anchorShowPostButton.attr('class','cls_DashContentsDetail_anchorShowPostButton cls_Dash_ButtonAnimation cls_DashContentsDetail_' + itemInfo.categoryName + '_anchorShowPostButton userNoSelect');
    anchorShowPostButton.text('記事を表示');
    anchorShowPostButton.attr('href',itemInfo.itemLink);
    divButtonContainer.append(anchorShowPostButton);
  }

  //additionalButtons
  if(additionalButtons){
    var i;

    for(i = 0 ; i < additionalButtons.length ; i ++){
      additionalButtons[i].addClass("cls_Dash_ButtonAnimation");
      divButtonContainer.append(additionalButtons[i]);
    }
  }

  divButtonContainer.append("<div class='clear'></div>");
}

function setupContentsDetail_createButtonContainer(itemInfo){
  var divBottomSection = $('#id_DashContentsDetail_divBottomSection');
  var divButtonContainer = $('<div>');

  divButtonContainer.attr('id','id_DashContentsDetail_' + itemInfo.categoryName + '_divButtonContainer');
  divButtonContainer.attr('class','cls_DashContentsDetail_divButtonContainer cls_DashContentsDetail_' + itemInfo.categoryName + '_divButtonContainer');
  divBottomSection.append(divButtonContainer);
}

function setupContentsDetail_createBackButton(itemInfo,buttonTitle){
  var divBackButton = $('<div>');
  var divButtonContainer = $('#id_DashContentsDetail_' + itemInfo.categoryName + '_divButtonContainer');

  divBackButton.attr('class','cls_DashContentsDetail_divBackButton cls_Dash_ButtonAnimation cls_DashContentsDetail_' + itemInfo.categoryName + '_divBackButton userNoSelect');

  if(buttonTitle){
    divBackButton.text(buttonTitle);
  }else{
    divBackButton.text('一覧に戻る');
  }

  divBackButton.on('click',onDashContentsDetail_BackButtonClick);
  divButtonContainer.append(divBackButton);
}

function setupContentsDetail_createSearchResultElement(itemInfo){
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');

  {
    var divSearchResultPostPageTitle = $('<div>');

    divSearchResultPostPageTitle.attr('id','id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostPageTitle');
    divSearchResultPostPageTitle.attr('class','cls_Dash_Category_Contents_divSearchResultPostPageTitle cls_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostPageTitle');
    divCenterSection.append(divSearchResultPostPageTitle);
  }

  {
    var divSearchResultPostContainer = $('<div>');

    divSearchResultPostContainer.attr('id','id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostContainer');
    divSearchResultPostContainer.attr('class','cls_Dash_Category_Contents_divSearchResultPostContainer cls_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostContainer');
    divCenterSection.append(divSearchResultPostContainer);
  }
}

function setupContentsDetail_createSearchResultPostElement(entry,feed,itemInfo){
  var i;
  var divSearchResultPostContainer = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divSearchResultPostContainer');
  var divSearchResultPost;
  var anchorSearchResultPostLink;

  if(itemInfo.itemData.totalPostCount === undefined){
    itemInfo.itemData['totalPostCount'] = parseInt(feed.openSearch$totalResults.$t,10);
    itemInfo.itemData['totalPageCount'] = Math.ceil(itemInfo.itemData.totalPostCount / itemInfo.itemData.postCountPerPage);
  }

  divSearchResultPostContainer.empty();

  for(i = 0 ; i < entry.length ; i ++){

    //divSearchResultPost
    {
      divSearchResultPost = $('<div>');
      divSearchResultPost.attr('class','cls_Dash_Category_Contents_divSearchResultPost cls_Dash_ButtonAnimation cls_Dash_Category_Contents' +  itemInfo.categoryName + '_divSearchResultPost');
      divSearchResultPost.data('feedEntry',entry);
      divSearchResultPost.data('itemInfo',itemInfo);

      divSearchResultPostContainer.append(divSearchResultPost);

       if(entry[i].media$thumbnail){
        divSearchResultPost.css('background-image','url("' + parsePostThumbnail(entry[i].media$thumbnail) + '")');
      }
    }

    //anchorSearchResultPostLink
    {
      anchorSearchResultPostLink = $('<a>');
      anchorSearchResultPostLink.attr('class','cls_Dash_Category_Contents_anchorSearchResultPostLink cls_Dash_Category_Contents' +  itemInfo.categoryName + '_anchorSearchResultPostLink');
      anchorSearchResultPostLink.attr('href',parsePostLink(entry[i].link));
      anchorSearchResultPostLink.text(entry[i].title.$t);
      divSearchResultPost.append(anchorSearchResultPostLink);
    }
  }

}

function showPrevNextItem(itemInfo,offset){
  var i;
  var index = itemInfo.itemIndex;

  for(i = 0 ; i < itemInfo.itemTotalCount ; i ++){
    index += offset;

    if(index < 0){
      index = (itemInfo.itemTotalCount - 1);
    }else if(index >= itemInfo.itemTotalCount){
      index = 0;
    }

    var divItem = $('#' + itemInfo.itemIDFormat + index);

    if(divItem.css('display') !== 'none'){
      setupDashContentsDetail(divItem);
      break;
    }
  }
}
