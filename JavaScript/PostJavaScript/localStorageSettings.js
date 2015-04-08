/*-- --------------------------------------------------------------------------------
History 
-------------------------------------------------------------------------------- --*/
function savePageHistory(){
  
  try{    
    if(gCurrentPageType == 'item'){
      var myLocalStorage = $.localStorage;
      var pageHistory = myLocalStorage.get('pageHistory');
      
      if(!pageHistory){
        pageHistory = [];
      }
      
      var i;
      
      for(i = 0 ; i < pageHistory.length ; i ++){
        if(pageHistory[i].canonicalUrl == gPostInfo.canonicalUrl){
          pageHistory.splice(i,1);
          break;
        }
      }
      
      pageHistory.unshift(gPostInfo);

      if(pageHistory.length > 20){
        pageHistory = pageHistory.slice(0,20);
      }
      
      myLocalStorage.set('pageHistory',pageHistory);
    }
  }catch(e){

  }
}

function removeAllHistory(){
  $.localStorage.remove('pageHistory');
}

(function(){
  savePageHistory();
})();

/*-- --------------------------------------------------------------------------------
Bookmark 
-------------------------------------------------------------------------------- --*/
function getAllBookmarks(){
  var bookmark = $.localStorage.get('bookmark');
  
  if(!bookmark){
    bookmark = [];
  }
  
  return bookmark;
}

function removeBookmarkByIndex(index){
  var myLocalStorage = $.localStorage;
  var bookmark = myLocalStorage.get('bookmark');
  
  bookmark.splice(index,1);
  myLocalStorage.set('bookmark',bookmark);
}

function removeAllBookmark(){
  $.localStorage.remove('bookmark');
}

function addPostToBookmark(postInfo){
  var bookmark = getAllBookmarks();    
  var i;
    
  for(i = 0 ; i < bookmark.length ; i ++){
    if(bookmark[i].canonicalUrl == postInfo.canonicalUrl){
      bookmark.splice(i,1);
      break;
    }
  }
  
  bookmark.unshift(postInfo);

  if(bookmark.length > 100){
    bookmark = bookmark.slice(0,100);
  }

  {
    var myLocalStorage = $.localStorage;
  
    myLocalStorage.set('bookmark',bookmark);
  }
}

function addCurrentPageToBookmarkWithNotify(target){
  if(gCurrentPageType == 'item'){
    addPostToBookmark(gPostInfo);
    
    target.tooltipster('hide');
    target.tooltipster('content', 'この記事をブックマークに追加しました。');
    target.tooltipster('show');
  }    
}

function isValidPostID(postID){
  var isValid = false;
  
  if((postID.length == 19) && (postID.match(/^[0-9]+$/))){
    isValid = true;
  }
  
  return isValid;
}

/*-- --------------------------------------------------------------------------------
User Settings 
-------------------------------------------------------------------------------- --*/
function getAllUserSettings(){
  var userSettings = $.localStorage.get('userSettings');
  
  if(!userSettings){
    //set default settings
    userSettings = {
      siteFontSize:'Normal',
      dashFontSize:'Normal',
    };
    
    $.localStorage.set('userSettings',userSettings);
  }
  
  return userSettings;
}

function getUserSetting(key){
  var userSettings = getAllUserSettings();
  
  return userSettings[key];
}

function setUserSetting(key,value){
  var userSettings = getAllUserSettings();
  
  userSettings[key] = value;
  
  $.localStorage.set('userSettings',userSettings);
}




