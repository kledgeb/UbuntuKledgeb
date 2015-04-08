/*-- --------------------------------------------------------------------------------
Dash Option
-------------------------------------------------------------------------------- --*/
function addDashOption(optionInfo){
  var divRightBar = $('#id_Dash_divRightBar');
  var divOptionItem = $('<div/>');
  
  divOptionItem.text(optionInfo.title);
  divOptionItem.attr('id','id_OptionItem_div' + optionInfo.categoryName);
  divOptionItem.attr('class','userNoSelect cls_divOptionItem cls_OptionItem_div' + optionInfo.categoryName);
  divOptionItem.data('optionInfo',optionInfo);
  divOptionItem.on('click',onDashOptionButtonClick);
  
  divRightBar.append(divOptionItem);
  changeStateDashOption(optionInfo.currentState,optionInfo);
}

function addShowAllOption(){
  var optionInfo = {
    title:'すべて表示',
    categoryName:'ShowAll',
    currentState:'off'
  };
 
  addDashOption(optionInfo);
}

function addHideAllOption(){
  var optionInfo = {
    title:'すべて隠す',
    categoryName:'HideAll',
    currentState:'off'
  };
 
  addDashOption(optionInfo);
}

function addShowHideAllOption(){
  var divRightBar = $('#id_Dash_divRightBar');

  addShowAllOption();
  addHideAllOption();

  divRightBar.append("<div class='clear'></div>");
}

function layoutDashOptions(){
  /*var divShowAll = $('#id_OptionItem_divShowAll');
  var divHideAll = $('#id_OptionItem_divHideAll');
  var divRightBar = $('#id_Dash_divRightBar');
 
  if(divShowAll.length){
    var width = Math.floor(divRightBar.width() / 2);
    var marginRight = parseInt(divShowAll.css('margin-right').replace('px',''),10);
    var marginLeft = parseInt(divShowAll.css('margin-left').replace('px',''),10);
  
    width = width - marginRight - marginLeft;
    
    divShowAll.outerWidth(width);
    divHideAll.outerWidth(width);  
  }*/
}

function clearDashOptions(){
  var divRightBar = $('#id_Dash_divRightBar');
  
  divRightBar.mCustomScrollbar('destroy');
  divRightBar.empty();
}

function changeStateDashOption(state,optionInfo){
  var divOptionItem = $('#id_OptionItem_div' + optionInfo.categoryName);
  
  divOptionItem.css("background-color",'');
  
  switch(state){
  case 'off':  
    optionInfo.currentState = 'off';
    divOptionItem.removeClass('cls_divOptionItem_On');
    divOptionItem.hover(onDash_HoverIn_Animate,onDash_HoverOut_Animate);
    break;
  case 'on':  
    optionInfo.currentState = 'on';
    divOptionItem.addClass('cls_divOptionItem_On');
    divOptionItem.hover(onDash_HoverOut_Animate,onDash_HoverIn_Animate);
    break;
  }
}

