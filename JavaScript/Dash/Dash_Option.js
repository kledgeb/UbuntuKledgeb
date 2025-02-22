/*-- --------------------------------------------------------------------------------
Dash Option
-------------------------------------------------------------------------------- --*/
function addDashOption(optionInfo){
  var divRightBar = $('#id_Dash_divRightBar');
  var divOptionItem = $('<div>');

  divOptionItem.text(optionInfo.title);
  divOptionItem.attr('id','id_OptionItem_div' + optionInfo.categoryName);
  divOptionItem.attr('class','userNoSelect cls_divOptionItem cls_Dash_ButtonAnimation cls_OptionItem_div' + optionInfo.categoryName);
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
    break;
  case 'on':
    optionInfo.currentState = 'on';
    divOptionItem.addClass('cls_divOptionItem_On');
    break;
  }
}

