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

function setDefaultMessage(categoryName){
  var divMessageIcon = $('#id_Dash_Category_Contents_' + categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + categoryName + '_divMessageText');
 
  divMessageIcon.css('background-image','url("//lh4.googleusercontent.com/-ySGf4MAzLx4/VQfAxiLWcSI/AAAAAAAA_tE/gD3zQsb5fnU/s800/Dash_Search_InfoIcon.png")');
  divMessageText.html('検索を実行するには、検索キーワードを入力し「エンター」キーを押してください。');
  
}

function doDashCategoryContentsGoogleCustomSearchClick(){
  var itemInfo = createSearchItemInfo();

  var divMessageIcon = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageIcon');
  var divMessageText = $('#id_Dash_Category_Contents_' + itemInfo.categoryName + '_divMessageText');
    
  if(itemInfo.itemData.errorMessage){
    divMessageIcon.css('background-image','url("//lh5.googleusercontent.com/-eAlUY5qd_7k/VQeuIk1rJrI/AAAAAAAA_s0/RN506olTU48/s800/Dash_Search_ErrorIcon.png")');
    divMessageText.html(itemInfo.itemData.errorMessage);
  }else{
    var href = '//kledgeb.blogspot.com/p/cseresult.html?cseq=' + encodeURIComponent(itemInfo.itemTitle);    
    window.location.href = href;
  }  
}

function createSearchItemInfo(){
  var itemTitle;
  var errorMessage = null;
  var inputSearchBox = $('#id_Dash_inputSearchBox');
    
  itemTitle = inputSearchBox.val().trim();
    
  if(!errorMessage){
  
    if(itemTitle.length === 0){
      errorMessage = '検索キーワードが入力されていません。<br>検索キーワードを入力してください。';
    } 
  }
  
  return {
        itemTitle:itemTitle,
        itemData:{
          errorMessage:errorMessage},
      };
}

function setupSearchContentsDetail(divItem){

}

function searchDashContents_Search(searchText,byTimer){
  if((byTimer === false) && (searchText)){
    doDashCategoryContentsGoogleCustomSearchClick();  
  }
}
