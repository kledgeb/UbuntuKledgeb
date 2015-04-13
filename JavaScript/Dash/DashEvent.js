/*-- --------------------------------------------------------------------------------
Dash Event
-------------------------------------------------------------------------------- --*/
function onBodyResized(event){
  layoutDash();
}

function onDashClickBackgroundClick(event){
  hideDash();
}

function onDash_HoverIn_Animate(eventObject){
  $(this).stop().animate({ backgroundColor: 'rgba(157,156,156,0.4)'}, 200);
}

function onDash_HoverOut_Animate(eventObject){
  $(this).stop().animate({ backgroundColor: 'transparent'}, 200);
}

function onDashWindowSizeClick(eventObject){
  var divWindowSize = $('#id_Dash_divWindowSizeOption');
  
  if(gDashSize == 'Normal'){
    gDashSize = 'Full';
    divWindowSize.css('background-image','url("https://lh4.googleusercontent.com/-8LEUy7RIolo/VPrjfwOurMI/AAAAAAAA_eA/NtQQKmGy4GU/s800/LeftBar_Dash_NormalSize.png")');
  }else{
    gDashSize = 'Normal';
    divWindowSize.css('background-image','url("https://lh5.googleusercontent.com/-INLN-uqoBH4/VPrjf8hfbxI/AAAAAAAA_d8/ipEY5_igWDQ/s800/LeftBar_Dash_LargeSize.png")');
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

function onDashPageLensClick(event){
  switchLens('Page');
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

function onDashMessageLensClick(event){
  switchLens('Message');
}

function onDashSearchLensClick(event){
  switchLens('Search');
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

