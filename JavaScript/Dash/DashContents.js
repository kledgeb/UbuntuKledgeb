/*-- --------------------------------------------------------------------------------
Dash Contents Category
-------------------------------------------------------------------------------- --*/
function setupDashContents(showParams){
  if(gCurrentLensArrowID){
    $('#' + gCurrentLensArrowID).css('visibility','hidden');
    gCurrentLensArrowID = null;
  }

  clearDashContentsDetail();
  clearDashContents();
  clearDashOptions();

  switch(gCurrentLens){
  case 'Home':
    setupHomeLensContents(showParams);
    break;
  case 'Ubuntu':
    setupUbuntuLensContents(showParams);
    break;
  case 'WebSite':
    setupWebSiteLensContents(showParams);
    break;
  case 'Star':
    setupStarLensContents(showParams);
    break;
  case 'SNS':
    setupSNSLensContents(showParams);
    break;
  case 'Tag':
    setupTagLensContents(showParams);
    break;
  case 'Search':
    setupSearchLensContents(showParams);
    break;
  case 'Twitter':
    setupTwitterLensContents(showParams);
    break;
  case 'YouTube':
    setupYouTubeLensContents(showParams);
    break;
  case 'Help':
    setupHelpLensContents(showParams);
    break;
  }

  if(showParams){
    if(showParams.showCategory){
      var divRightBar = $('#id_Dash_divRightBar');
      var divOptionItems = divRightBar.find('[id^="id_OptionItem_div"]');
      var divOptionItem;
      var i;

      for(i = 0 ; i < divOptionItems.length ; i ++){
        divOptionItem = $(divOptionItems[i]);
        optionInfo = divOptionItem.data('optionInfo');

        if(showParams.showCategory[optionInfo.categoryName]){
          changeStateDashOption('on',optionInfo);
          toggleCategory(optionInfo.categoryName,'open',false);
        }else{
          changeStateDashOption('off',optionInfo);
        }
      }
    }
  }

  {
    var divSearchOption = $('#id_Dash_divSearchOption');
    var divSearchOptionItems = $('#id_Dash_divRightBar').children(':first');

    if(divSearchOptionItems.length){
      divSearchOption.css('visibility','visible');
    }else{
      gOpenRightBar = false;
      divSearchOption.css('visibility','hidden');
    }
  }

  if(gCurrentLens != 'Twitter'){
    var divContents = $('#id_Dash_divContents');

    divContents.mCustomScrollbar({
      theme:'light-3',
      autoHideScrollbar:true,
      scrollInertia:1000,
      mouseWheel:{ preventDefault: true }
    });
  }

  {
    var divRightBar = $('#id_Dash_divRightBar');

    divRightBar.mCustomScrollbar({
      theme:'light-3',
      autoHideScrollbar:true,
      scrollInertia:1000,
      mouseWheel:{ preventDefault: true }
    });
  }
}

function toggleCategory(categoryName,forceArrowState,isSaveState){
  var divCategoryArrow = $('#id_Dash_Category_Arrow_div' + categoryName);
  var arrowState = divCategoryArrow.data('arrowState');

  if(forceArrowState){
    divCategoryArrow.data('arrowState',forceArrowState);
  }else if(arrowState == 'open'){
    divCategoryArrow.data('arrowState','close');
  }else{
    divCategoryArrow.data('arrowState','open');
  }

  if(isSaveState){
    arrowState = divCategoryArrow.data('arrowState');
    setDashCategoryHeadState(categoryName,arrowState);
  }

  layoutCategoryHead(categoryName);
}

function clearDashContents(){
  var divContents = $('#id_Dash_divContents');

  divContents.mCustomScrollbar('destroy');
  divContents.empty();
  divContents.show();

  $('#id_Dash_inputSearchBox').val('');
}

function layoutContents(){
  var divContents = $('#id_Dash_divContents');
  var divContentsContainer = $('#id_Dash_divContentsContainer');

  divContents.outerWidth(divContentsContainer.width());
  divContents.outerHeight(divContentsContainer.height());
  layoutAllCategoryHead();
}

function layoutAllCategoryHead(){
  var categorys = $('#id_Dash_divContents').find('div[data-categoryName]');
  var categoryName;
  var i;

  for(i= 0 ; i < categorys.length ; i ++){
    categoryName = $(categorys[i]).attr('data-categoryName');
    layoutCategoryHead(categoryName);
  }
}

function layoutCategoryHead(categoryName){
  var divCategory = $('#id_Dash_Category_div' + categoryName);
  var selectorPrefix = 'div[id^="id_Dash_Category_Contents_' + categoryName + '_divItem_"][display!="none"]';
  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var divCategoryHead = $('#id_Dash_Category_Head_div' + categoryName);
  var divCategoryArrow = $('#id_Dash_Category_Arrow_div' + categoryName);
  var divItem = divCategoryContents.find(selectorPrefix + ':first');

  if(divItem.length){
    var firstItemPos;
    var lastItemPos;
    var divFirstItem;
    var divLastItem;

    divCategory.css('display','block');

    divFirstItem = divItem;
    firstItemPos = divFirstItem.position();

    divLastItem = $('#id_Dash_Category_Contents_div' + categoryName).find(selectorPrefix + ':last');
    lastItemPos = divLastItem.position();

    if(firstItemPos.top < lastItemPos.top){
      var arrowState = divCategoryArrow.data('arrowState');

      divCategoryHead.css('cursor','pointer');
      divCategoryArrow.css('visibility','visible');

      if(arrowState == 'open'){
        divCategoryArrow.css('background-image','url("//kledgeb.github.io/UbuntuKledgeb/Image/Dash_DownArrow.svg")');
        divCategoryArrow.text('一部のアイテムを表示');
        divCategoryContents.css('max-height','');
      }else{
        divCategoryArrow.css('background-image','url("//kledgeb.github.io/UbuntuKledgeb/Image/LeftBar_MenuArrow.svg")');
        divCategoryArrow.text('すべてのアイテムを表示');
        divCategoryContents.css('max-height',divFirstItem.outerHeight() + 'px');
      }

    }else{
      divCategoryContents.css('max-height','');
      divCategoryHead.css('cursor','default');
      divCategoryArrow.css('visibility','hidden');
    }
  }else{
    divCategoryContents.css('max-height','');
    divCategoryHead.css('cursor','default');
    divCategoryArrow.css('visibility','hidden');
  }

  {
    var displayValue = 'block';
    var loading = divCategoryContents.data('loading');
    var divOptionItem = $('#id_OptionItem_div' + categoryName);
    var optionInfo = null;

    if(divOptionItem.length){
      optionInfo = divOptionItem.data('optionInfo');
    }

    if((!loading) && (!divItem.length)){
      displayValue = 'none';
    }else if(divOptionItem.length){
        if(optionInfo.currentState === 'off'){
          displayValue = 'none';
        }else{

        if(!loading){
          var divItems = $(selectorPrefix);
          var i;

          displayValue = 'none';

          for(i= 0 ; i < divItems.length ; i ++){
            divItem = $(divItems[i]);

            if(divItem.css('display') !== 'none'){
              displayValue = 'block';
              break;
            }
          }
        }
      }
    }

    divCategory.css('display',displayValue);
  }
}

function addCategoryItem(categoryItemInfo){
  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryItemInfo.categoryName);
  var divItem = $('<div>');
  var anchorItem = $('<a>');

  var idPrefix = 'id_Dash_Category_Contents_' + categoryItemInfo.categoryName + '_divItem_';
  var clsPrefix = 'cls_Dash_Category_Contents_' + categoryItemInfo.categoryName +'_';

  {
    divItem.attr('id',idPrefix + categoryItemInfo.itemIndex);
    divItem.attr('class','cls_Dash_Category_Contents_divItem ' + clsPrefix + 'divItem');

    if(categoryItemInfo.itemIconURL){
      divItem.css('background-image','url(' + categoryItemInfo.itemIconURL + ')');
    }
  }

  if(categoryItemInfo.itemLink){
    divItem.addClass("cls_Dash_ButtonAnimation");
  }

  //itemInfo
  {
    categoryItemInfo['itemIDFormat'] = idPrefix;
    divItem.data('itemInfo',categoryItemInfo);
  }

  divItem.on('mousedown',onCategoryContents_divItem_MouseDown);

  //item anchor
  {
    anchorItem.attr('class','cls_Dash_Category_Contents_anchorItem ' + clsPrefix + 'anchorItem');

    if(categoryItemInfo.itemLink){
      anchorItem.attr('href',categoryItemInfo.itemLink);

      if(categoryItemInfo.openLinkAtNewWindow){
        anchorItem.attr('target','_blank');
      }
    }else{
      anchorItem.css('cursor','default');
      anchorItem.on("click", onEventPrevent);
    }

    if(categoryItemInfo.itemTitle){
      anchorItem.text(categoryItemInfo.itemTitle);
    }else if(categoryItemInfo.itemTitleHTML){
      anchorItem.html(categoryItemInfo.itemTitleHTML);
    }

    anchorItem.appendTo(divItem);
  }

  divCategoryContents.append(divItem);

  if(categoryItemInfo.autoEllipsis){
    var maxLength = 50;

    if(anchorItem.text().length > maxLength){
      anchorItem.text(anchorItem.text().substr(0,maxLength) + '...');
    }

    divItem.addClass("cls_Dash_Category_Contents_divStringItem");
    anchorItem.addClass("cls_Dash_Category_Contents_anchorStringItem");
  }

}

function addCategory(categoryName,categoryTitle){
  var divCategory = $('<div>');
  var divCategoryHead = $('<div>');

  //Category
  {
    divCategory.attr('id','id_Dash_Category_div' + categoryName);
    divCategory.attr('class','cls_Dash_divCategory cls_Dash_Category_div' + categoryName);
    divCategory.attr('data-categoryName',categoryName);
  }

  //CategoryHead
  {
    divCategoryHead.attr('id','id_Dash_Category_Head_div' + categoryName);
    divCategoryHead.attr('class','cls_Dash_Category_divHead cls_Dash_ButtonAnimation cls_Dash_Category_Head_div' + categoryName);
    divCategoryHead.on('click',onCategoryHeadClick(categoryName));

    divCategory.append(divCategoryHead);
  }

  //divCategoryTitle
  {
    var divCategoryTitle = $('<div>');
    divCategoryTitle.attr('class','userNoSelect cls_Dash_Category_divTitle cls_Dash_Category_Title_div' + categoryName);
    divCategoryTitle.text(categoryTitle);

    divCategoryHead.append(divCategoryTitle);
  }

  //divCategoryArrow
  {
    var divCategoryArrow = $('<div>');
    divCategoryArrow.attr('id','id_Dash_Category_Arrow_div' + categoryName);
    divCategoryArrow.attr('class','userNoSelect cls_Dash_Category_divArrow cls_Dash_Category_Arrow_div' + categoryName);
    divCategoryArrow.text('すべてのアイテムを表示');

    divCategoryArrow.data('arrowState',getDashCategoryHeadState(categoryName));

    divCategoryHead.append(divCategoryArrow);
    divCategoryHead.append($("<div class='clear'></div>"));
  }

  //CategoryContents
  {
    var divCategoryContents = $('<div>');

    divCategoryContents.attr('id','id_Dash_Category_Contents_div' + categoryName);
    divCategoryContents.attr('class','cls_Dash_Category_divContents cls_Dash_Category_Contents_div' + categoryName);

    divCategory.append(divCategoryContents);
  }

  $('#id_Dash_divContents').append(divCategory);

  //Option
  {
    var optionInfo = {
      title:categoryTitle,
      categoryName:categoryName,
      currentState:'on'
    };

    addDashOption(optionInfo);
  }
}

function searchDashContents(searchText,byTimer){
  var divContents = $('#id_Dash_divContents');
  var divCategorys;
  var categoryName;
  var i;

  if((searchText === null) || (searchText === undefined)){
    searchText = '';
  }

  if(gCurrentLens == 'Search'){
    searchDashContents_Search(searchText,byTimer);
  }else if(gCurrentLens == 'Twitter'){
    searchDashContents_Twitter(searchText,byTimer);
  }else{
    closeDashContentsDetail();
    divCategorys = divContents.find('[id^="id_Dash_Category_div"]');

    for(i = 0 ; i < divCategorys.length ; i ++){
      searchCategory(searchText,$(divCategorys[i]));
    }
  }
}

function searchCategory(searchText,divCategory){
  categoryName = divCategory.attr('data-categoryName');

  var divItems = divCategory.find('[id^="id_Dash_Category_Contents_' + categoryName + '_divItem_"]');
  var i;
  var itemInfo;
  var isShow;
  var checkText;
  var divItem;

  searchText = searchText.toLocaleLowerCase();

  for(i = 0 ; i < divItems.length ; i ++){
    divItem = $(divItems[i]);
    itemInfo = divItem.data('itemInfo');
    checkText = itemInfo.itemTitle;

    if((!checkText) && (itemInfo.itemTitleHTML)){
      checkText = $('<p>' + itemInfo.itemTitleHTML + '</p>').text();
    }

    if(!checkText){
      checkText = '';
    }

    checkText = checkText.toLocaleLowerCase();
    isShow = (searchText.length === 0) || (checkText.indexOf(searchText) !== -1);

    if(isShow){
      divItem.show();
    }else{
      divItem.hide();
    }
  }

  layoutAllCategoryHead();
}
