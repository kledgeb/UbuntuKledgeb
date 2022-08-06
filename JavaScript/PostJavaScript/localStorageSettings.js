/*-- --------------------------------------------------------------------------------
User Settings
-------------------------------------------------------------------------------- --*/
var gUserSettings = $.localStorage.get('userSettings');

function getAllUserSettings(){
  if((!gUserSettings) || (gUserSettings.version !== '2')){
    //set default settings
    gUserSettings = {
      //Version
      version:'2',

      //Dash
      dash_Size:'Normal',

      //Dash Home
      dash_RelatedPost_CategoryHeadState:'close',
      dash_LatestPost_CategoryHeadState:'close',

      //Dash Star
      dash_PopularPost_CategoryHeadState:'close',

      //Dash Ubuntu
      dash_SupportedVersion_CategoryHeadState:'open',
      dash_ReleaseSchedule_CategoryHeadState:'close',

      //Dash WebSite
      dash_LinuxDistributionWebSite_CategoryHeadState:'close',

      //Dash SNS
      dash_SharePost_CategoryHeadState:'open',
      dash_DeliveryPost_CategoryHeadState:'open',

      //Dash Tag
      dash_TagList_CategoryHeadState:'open',

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
