/*-- --------------------------------------------------------------------------------
Dash
-------------------------------------------------------------------------------- --*/
//1 normar
//2 full
var gDashSize = getUserSetting('dash_Size');
var gOpenRightBar = false;
var gCurrentLens = null;
var gCurrentLensArrowID = null
var gIsShowingDash = false;

function toggleDash(showType,showParams){
  var divDash = $('#id_divDash');

  if(showType){
    if(gIsShowingDash){
      if(showType == gCurrentLens){
        hideDash();
      }else{
        switchLens(showType,showParams);
      }
    }else{
      showDash(showType,showParams);
    }
  }
  else{
    if(showType === null){
      if(!gCurrentLens){
        showType = 'Home';
      }else{
        showType = gCurrentLens;
      }
    }
    
    if(gIsShowingDash === false){
      showDash(showType,showParams);
    }else{
      hideDash();
    }
  }
}

function showDash(showType,showParams){
  var divDash = $('#id_divDash');

  divDash.css('visibility','hidden');
  divDash.show();
  
  //initialize
  initializeDash();
  switchLens(showType,showParams);

  //show
  var divDashBackground = $('#id_divDashBackground');
  
  divDashBackground.css('-webkit-filter','blur(4px)');
  divDashBackground.css('filter','blur(4px)');
  $('#id_divDashClickBackground').show();
  
  divDash.hide();
  divDash.css('visibility','visible');
  
  if(gCurrentLensArrowID){
    $('#' + gCurrentLensArrowID).css('visibility','visible');
  }
  
  divDash.fadeIn(150);
  gIsShowingDash = true;
}

function hideDash(){
  var divDash = $('#id_divDash');
  var divDashBackground = $('#id_divDashBackground');

  if(gCurrentLensArrowID){
    $('#' + gCurrentLensArrowID).css('visibility','hidden');
  }
  
  divDash.hide();

  $('#id_divDashClickBackground').hide();
  divDashBackground.css('-webkit-filter','none');
  divDashBackground.css('filter','none');
  
  gIsShowingDash = false;
}

function initializeDash(){
  var divDash = $('#id_divDash');
  var loaded = divDash.attr('loaded');
  
  if(loaded !== '1'){
    $(window).on('resize',onBodyResized); 
    $('#id_divDash').on('wheel',onEventPrevent_StopPropagation);
    
    $('#id_divDashClickBackground').on('click',onDashClickBackgroundClick); 

    $(".cls_DashButtonAnimation").hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);     
    $('#id_Dash_divWindowSizeOption').on('click',onDashWindowSizeClick);     
    $('#id_Dash_divSearchOption').on('click',onDashSearchOptionClick);     
    $('#id_Dash_divContentsContainer').on('contextmenu',onEventPrevent);
    $('#id_Dash_inputSearchBox').on('input',onInputSearchBoxInput);
    $('#id_Dash_inputSearchBox').on('keydown',onInputSearchBoxKeydown);
    
    {
      $('#id_Dash_divHomeLensContainer').on('click',onDashHomeLensClick);
      $('#id_Dash_divPageLensContainer').on('click',onDashPageLensClick);
      $('#id_Dash_divStarLensContainer').on('click',onDashStarLensClick);
      $('#id_Dash_divSNSLensContainer').on('click',onDashSNSLensClick);
      $('#id_Dash_divTagLensContainer').on('click',onDashTagLensClick);
      $('#id_Dash_divMessageLensContainer').on('click',onDashMessageLensClick);
      $('#id_Dash_divSearchLensContainer').on('click',onDashSearchLensClick);
      $('#id_Dash_divHelpLensContainer').on('click',onDashHelpLensClick);
    }
    
    if((gCurrentPageType == 'item') || (gCurrentPageType == 'static_page')){
      $('#id_Dash_divSNSLensContainer').css('display','block');
    }else{
      $('#id_Dash_divSNSLensContainer').css('display','none');
    }

    divDash.attr('loaded','1');
  }
}

function layoutDash(){
  var divLeftBar = $('#id_divLeftBar');
  var divDash = $('#id_divDash');
  var divDashClickBackground = $('#id_divDashClickBackground');

  divDash.css('left',divLeftBar.width());
  divDash.css('top',0);
  divDashClickBackground.css('left',divLeftBar.width());
  divDashClickBackground.css('top',0);
  
  var windowWidth = $(window).width() - divLeftBar.width();
  var windowHeight = $(window).height();
  var dashWidth;
  var barWidth;
  var dashHeight;
  var barHeight;
  
  windowWidth -= parseInt(divDash.css('margin-right'),10);
  windowHeight -= parseInt(divDash.css('margin-bottom'),10);
  
  if(gDashSize == 'Normal'){
    dashHeight = 550;
    dashWidth = parseInt(dashHeight / 9 * 16,10);
  }else{
    dashHeight = windowHeight;
    dashWidth = windowWidth;
  }
  
  if(dashWidth > windowWidth){
    dashWidth = windowWidth;
  } 
  
  if(dashHeight > windowHeight){
    dashHeight = windowHeight;
  } 
  
  divDash.outerWidth(dashWidth);
  divDash.outerHeight(dashHeight);
  
  dashWidth = divDash.width();
  dashHeight = divDash.height();
  
  //top bar
  var divTopBar = $('#id_Dash_divTopBar');
  var divSearchBox = $('#id_Dash_divSearchBox');
  var divTopBarOption = $('#id_Dash_divTopBarOption');
  
  divTopBar.outerWidth(dashWidth);  
  barWidth = divTopBar.width() - divTopBarOption.outerWidth(true);

  divSearchBox.outerWidth(barWidth);

  var inputSearchBoxWidth = divSearchBox.width() - $('#id_Dash_divSearchIcon').outerWidth(true);

  $('#id_Dash_inputSearchBox').outerWidth(inputSearchBoxWidth);

  //divTopBarOption
  var offset = {};

  offset['left'] = divTopBar.outerWidth(true) - divTopBarOption.outerWidth(true);
  offset['top'] = divTopBar.css('padding-top');
  divTopBarOption.css(offset);

  divTopBarOption.outerHeight(divSearchBox.outerHeight());

  //BottomBar
  var divBottomBar = $('#id_Dash_divBottomBar');

  //Contents
  var divContentsContainer = $('#id_Dash_divContentsContainer');
  var divSearchOption = $('#id_Dash_divSearchOption');

  if(gOpenRightBar){
    divContentsContainer.outerWidth(barWidth);
    divSearchOption.css('background-image','url("https://lh4.googleusercontent.com/-LvKGjUWTr9s/VPr2KeW05EI/AAAAAAAA_eg/uzK8mZNKnbM/s800/LeftBar_Board_SearchOption_Open.png")');
  }else{
    divContentsContainer.outerWidth(dashWidth);
    divSearchOption.css('background-image','url("https://lh3.googleusercontent.com/-4J832sBuxjI/VPr2KZzLaFI/AAAAAAAA_ec/hPPnjWGMnsU/s800/LeftBar_Board_SearchOption_Close.png")');
  }
  
  barHeight = dashHeight - divTopBar.outerHeight(true) - divBottomBar.outerHeight(true);
  divContentsContainer.outerHeight(barHeight);
  
  //RightBar
  var divRightBar = $('#id_Dash_divRightBar');

  divRightBar.outerWidth(divTopBarOption.outerWidth());

  if(gOpenRightBar){
    divRightBar.css('display','block');
  }else{
    divRightBar.css('display','none');
  }
  
  divRightBar.outerHeight(barHeight);
  
  if(gOpenRightBar){
    layoutDashOptions();
  }

  var divContents = $('#id_Dash_divContents');

  //category layout
  if(divContents.css('display') != 'none'){
    layoutContents();
  }else{
    layoutContentsDetail();
  }
}


function switchLens(showType,showParams,forceSwitch){
  if((showType != gCurrentLens) || (showParams) || (forceSwitch)){
    gCurrentLens = showType;
    setupDashContents(showParams);
  }  

  //Always layouting
  layoutDash();
}
