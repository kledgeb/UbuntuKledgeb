/*-- --------------------------------------------------------------------------------
Dash Event
-------------------------------------------------------------------------------- --*/
function onBodyResized(event){
  layoutDash();
}

function onDashClickBackgroundClick(event){
  hideDash();
}

function onDashWindowSizeClick(eventObject){

  if(gDashSize == 'Normal'){
    gDashSize = 'Full';
  }else{
    gDashSize = 'Normal';
  }

  //Save State
  setUserSetting('dash_Size',gDashSize);

  layoutDash();
}

function onCategoryContents_divItem_MouseDown(event){
  if(event.which == 3){
    var divItem = $(this);
    var itemInfo = divItem.data('itemInfo');

    if(itemInfo.hasDetail){
      setupDashContentsDetail(divItem);
    }
  }
}

function onDashContentsDetail_PrevButtonClick(event){
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
  var itemInfo = divCenterSection.data('itemInfo');

  if(itemInfo.categoryName === 'TagList'){
    showPrevNextItem_TagList(itemInfo,-1);
  }
  else if(itemInfo.categoryName === 'Search'){
    showPrevNextItem_Search(itemInfo,-1);
  }
  else{
    showPrevNextItem(itemInfo,-1);
  }

  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');

  divCenterSection.mCustomScrollbar("scrollTo","top");

}

function onDashContentsDetail_NextButtonClick(event){
  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
  var itemInfo = divCenterSection.data('itemInfo');

  if(itemInfo.categoryName === 'TagList'){
    showPrevNextItem_TagList(itemInfo,1);
  }
  else if(itemInfo.categoryName === 'Search'){
    showPrevNextItem_Search(itemInfo,1);
  }
  else{
    showPrevNextItem(itemInfo,1);
  }
}

function onDashContentsDetail_BackButtonClick(event){
  closeDashContentsDetail();
}

function onDashHomeLensClick(event){
  switchLens('Home');
}

function onDashUbuntuLensClick(event){
  switchLens('Ubuntu');
}

function onDashWebSiteLensClick(event){
  switchLens('WebSite');
}

function onDashStarLensClick(event){
  switchLens('Star');
}

function onDashSNSLensClick(event){
  switchLens('SNS');
}

function onDashTagLensClick(event){
  switchLens('Tag');
}

function onDashSearchLensClick(event){
  switchLens('Search');
}

function onDashTwitterLensClick(event){
  switchLens('Twitter');
}

function onDashYouTubeLensClick(event){
  switchLens('YouTube');
}

function onDashHelpLensClick(event){
  switchLens('Help');
}

var onCategoryHeadClick = function(categoryName) {
  return function(event) {
    toggleCategory(categoryName,null,true);
  };
};

function onDashOptionButtonClick(event) {
  var divOptionItem = $(this);
  var optionInfo = divOptionItem.data('optionInfo');

  closeDashContentsDetail();

  if((optionInfo.categoryName == 'ShowAll') || (optionInfo.categoryName == 'HideAll')){
    var divRightBar = $('#id_Dash_divRightBar');
    var divOptionItems = divRightBar.find('[id^="id_OptionItem_div"]');
    var i;
    var state = 'on';

    if(optionInfo.categoryName == 'HideAll'){
      state = 'off';
    }

    for(i = 0 ; i < divOptionItems.length ; i ++){
      divOptionItem = $(divOptionItems[i]);
      optionInfo = divOptionItem.data('optionInfo');

      if((optionInfo.categoryName !== 'ShowAll') && (optionInfo.categoryName !== 'HideAll')){
        changeStateDashOption(state,optionInfo);
      }
    }

    layoutAllCategoryHead();
  }else{

    switch(optionInfo.currentState){
    case 'off':
      changeStateDashOption('on',optionInfo);
      break;
    case 'on':
      changeStateDashOption('off',optionInfo);
      break;
    }

    layoutCategoryHead(optionInfo.categoryName);
  }
}

function onDashSearchOptionClick(event){
  gOpenRightBar = !gOpenRightBar;
  layoutDash();
}

var gInputSearchBoxTimerID = null;

function onInputSearchBoxInput(event){

  if(gInputSearchBoxTimerID){
    window.clearTimeout(gInputSearchBoxTimerID);
  }

  gInputSearchBoxTimerID = window.setTimeout(onInputSearchBoxTimer, 1000);
}

function onInputSearchBoxKeydown(event){
  if(event.keyCode == 13){
    searchDashContents($('#id_Dash_inputSearchBox').val(),false);
  }
}

function onInputSearchBoxTimer(){
  gInputSearchBoxTimerID = null;
  searchDashContents($('#id_Dash_inputSearchBox').val(),true);
}

