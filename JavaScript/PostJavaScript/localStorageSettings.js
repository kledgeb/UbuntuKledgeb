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
var gUserSettings = $.localStorage.get('userSettings');

function getAllUserSettings(){  
  if((!gUserSettings) || (gUserSettings.version === undefined)){
    //set default settings
    gUserSettings = {
      //Version
      version:'1',

      //Font Size
      siteFontSize:'Normal',
      dashFontSize:'Normal',

      //Dash
      dash_Size:'Normal',
      
      //Dash Home
      dash_RelatedPost_CategoryHeadState:'close',
      dash_LatestPost_CategoryHeadState:'close',
      dash_ReleaseSchedule_CategoryHeadState:'close',
      dash_SupportedVersion_CategoryHeadState:'close',

      //Dash Page
      dash_GeneralPage_CategoryHeadState:'close',
      dash_Linux_CategoryHeadState:'close',
      dash_LinkPage_CategoryHeadState:'close',

      //Dash Star
      dash_Bookmark_CategoryHeadState:'close',
      dash_PageHistory_CategoryHeadState:'close',
      dash_PopularPost_CategoryHeadState:'close',

      //Dash SNS
      dash_SharePost_CategoryHeadState:'open',

      //Dash Tag
      dash_TagList_CategoryHeadState:'open',

      //Dash Message
      dash_PostCommnetList_CategoryHeadState:'close',
      dash_ForumCommnetList_CategoryHeadState:'close',

      //Dash Help
      dash_UpdateNotifyPage_CategoryHeadState:'close',
      dash_HowToCommentPage_CategoryHeadState:'close',
      dash_PrivacyPage_CategoryHeadState:'close',

    };
  }
  
  return gUserSettings;
}

function getUserSetting(key){
  var userSettings = getAllUserSettings();
  
  return userSettings[key];
}

function setUserSetting(key,value){
  var userSettings = getAllUserSettings();
  
  userSettings[key] = value;
}

function setDashCategoryHeadState(categoryName,value){
  var key = 'dash_' + categoryName +'_CategoryHeadState';
  
  setUserSetting(key,value);  
}

function getDashCategoryHeadState(categoryName){
  var key = 'dash_' + categoryName +'_CategoryHeadState';

  return getUserSetting(key);
}

function initializeUserSettings(){
  gUserSettings = null;
  getAllUserSettings();
}
