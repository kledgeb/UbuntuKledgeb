/*-- --------------------------------------------------------------------------------
User Settings
-------------------------------------------------------------------------------- --*/

function onUserSettings_RemoveAllBookmarks_Click(event){
  var buttonRemoveAllBookmarks = $(this);
  
  removeAllBookmark();
  
  buttonRemoveAllBookmarks.tooltipster('hide');
  buttonRemoveAllBookmarks.tooltipster('content', 'ブックマークをすべて削除しました。');
  buttonRemoveAllBookmarks.tooltipster('show');
  
  setTimeout(function(){
    buttonRemoveAllBookmarks.tooltipster('hide');
  },3000);
}

function onUserSettings_SaveBookmarks_Click(event){
  var bookmarks = getAllBookmarks();
  var buttonSaveBookmarks = $(this);
  
  buttonSaveBookmarks.tooltipster('hide');

  if(bookmarks.length){
    var i;
    var bookmarkData = [];
    
    for(i = 0 ; i < bookmarks.length ; i ++){
      bookmarkData.push(bookmarks[i].postID);
    }
    
    bookmarkData = JSON.stringify(bookmarkData);
    
    {
      var anchorDownload = $('<a>');
      var date = new Date();
      var fileName;
      
      fileName = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-Bookmark.json';
      
      var blob = new Blob([bookmarkData], {type: "application/json;charset=utf-8"});
      
      saveAs(blob, fileName);
      buttonSaveBookmarks.tooltipster('content', 'ブラウザーのダウンロード先フォルダーに、ブックマークをダウンロードしました。');
    }
  }else{
    buttonSaveBookmarks.tooltipster('content', 'ブックマークがありません。');
  }

  buttonSaveBookmarks.tooltipster('show');
  
  setTimeout(function(){
    buttonSaveBookmarks.tooltipster('hide');
  },3000);
}

function onUserSettings_LoadBookmarks_Changed(event){
  var files = this.files;
  
  if(files.length){
    var fileReader = new FileReader();

    showUserSettingsMessage('bookmark','info','ファイルを読み込んでいます...<br>ブックマークの読み込みが完了するまでお待ちください...');
    
    fileReader.addEventListener('load',function(){
      var isSuccess = false;
      
      try{
        var postIDs = JSON.parse(fileReader.result); 
        var validPostIDs = [];
        var i;
                
        if(postIDs.length){
          var postID;
         
          for(i = 0 ; i < postIDs.length ; i ++){
            if(isValidPostID(postIDs[i])){
              validPostIDs.push(postIDs[i]);
            }
          }
        }
        
        var feedURL;
        var feedURLPrefix = getHomepageURL() + 'feeds/posts/summary/';
        var feedURLSuffix = '?alt=json';

        for(i = 0 ; i < validPostIDs.length ; i ++){
          showUserSettingsMessage('bookmark','info',(i + 1) + '個目のブックマークを読み込んでいます...',true);           
          feedURL = feedURLPrefix + validPostIDs[i] + feedURLSuffix;
          
          $.ajax(feedURL,{
            async:false,
            success:onUserSettings_LoadBookmarks_Success
            });            
        }
        
        isSuccess = true;
      }catch(exception){
        
      }
     
      if(isSuccess){
        showUserSettingsMessage('bookmark','info','ブックマークの読み込みが完了しました。',true);           
      }else{
        showUserSettingsMessage('bookmark','warn','ブックマークの読み込みに失敗しました。<br>ファイルが不正です。',true);
      }
    });
    
    fileReader.readAsText(files[0]);
  }  
}

function onUserSettings_LoadBookmarks_Success(jsonData){
  var postInfo = {};  
  
  postInfo.canonicalUrl = parsePostLink(jsonData.entry.link);
  postInfo.thumbnailUrl = jsonData.entry.media$thumbnail.url;
  postInfo.title = jsonData.entry.title.$t;
  postInfo.snippet = adjustPostSummary(jsonData.entry.summary.$t);
  
  {
    var date = new Date(parsePostDay(jsonData.entry.published.$t));
    postInfo.timestamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  }
  
  {
    var category = jsonData.entry.category;
    
    if(category.length){
      var labels = [];
      var i;
      
      for(i = 0 ; i < category.length ; i ++){
        labels.push(category[i].term);
      }
      
      postInfo.labels = labels;
    }
  }
  
  addPostToBookmark(postInfo);
}

function showUserSettingsMessage(messageType,iconType,message,isAppendMessage){
  var divBookmarkMessageContainer = $('#id_UserSettings_Bookmark_divMessageContainer');
  var divHistoryMessageContainer = $('#id_UserSettings_History_divMessageContainer');
  var divMessageIcon;
  var divMessage;
  
  if(messageType == 'bookmark'){    
    divBookmarkMessageContainer.css('display','block');
    divHistoryMessageContainer.css('display','none');
    
    divMessage = $('#id_UserSettings_Bookmark_divMessage');
    divMessageIcon = $('#id_UserSettings_Bookmark_divMessageIcon');
  }else{    
    divHistoryMessageContainer.css('display','block');
    divBookmarkMessageContainer.css('display','none');
  
    divMessage = $('#id_UserSettings_History_divMessage');
    divMessageIcon = $('#id_UserSettings_History_divMessageIcon');
  }

  if(isAppendMessage){
    divMessage.append('<br>' + message);
  }else{
    divMessage.html(message);
  }

  if(iconType == 'info'){
    divMessageIcon.css('background-image','URL("https://lh6.googleusercontent.com/-I9dI3H-u3CI/VRhdupRnAGI/AAAAAAABAO0/hIz0U4CzBFo/s800/Message_InfoIcon_32.png")');
    divMessageIcon.css('display','block');
  }else if(iconType == 'warn'){
    divMessageIcon.css('background-image','URL("https://lh3.googleusercontent.com/-gmT1EgWLKyo/VRhdu-p7rNI/AAAAAAABAO4/FzdCauHw50Q/s800/Message_WarningIcon_32.png")');
    divMessageIcon.css('display','block');
  }else{
    divMessageIcon.css('display','none');
  }
}

function onUserSettings_RemoveAllHistory_Click(event){
  var buttonRemoveAllHistory = $(this);
  
  removeAllHistory();

  buttonRemoveAllHistory.tooltipster('hide');
  buttonRemoveAllHistory.tooltipster('content', '履歴をすべて削除しました。');
  buttonRemoveAllHistory.tooltipster('show');
  
  setTimeout(function(){
    buttonRemoveAllHistory.tooltipster('hide');
  },3000);
}

function onUserSettings_SiteFont_FontSizeNormal_Click(event){
  setUserSetting('siteFontSize','Normal');
  showPageReloadMessage($(this));
}

function onUserSettings_SiteFont_FontSizeSmall_Click(event){
  setUserSetting('siteFontSize','Small');
  showPageReloadMessage($(this));
}

function onUserSettings_DashFont_FontSizeNormal_Click(event){
  setUserSetting('dashFontSize','Normal');
  showPageReloadMessage($(this));
}

function onUserSettings_DashFont_FontSizeSmall_Click(event){
  setUserSetting('dashFontSize','Small');
  showPageReloadMessage($(this));
}

function showPageReloadMessage(elementObject){
  elementObject.tooltipster('hide');
  elementObject.tooltipster('content', '設定を反映するには、ページを再読込してください。');
  elementObject.tooltipster('show'); 
}


$(function(){
  $('#id_UserSettings_buttonRemoveAllBookmarks').on('click',onUserSettings_RemoveAllBookmarks_Click);
  $('#id_UserSettings_buttonSaveBookmark').on('click',onUserSettings_SaveBookmarks_Click);
  $('#id_UserSettings_inputLoadBookmark').on('change',onUserSettings_LoadBookmarks_Changed);
  $('#id_UserSettings_buttonRemoveAllHistory').on('click',onUserSettings_RemoveAllHistory_Click);
  
   $('#id_UserSettings_Bookmark_divMessageContainer').mCustomScrollbar({
  theme:'light-3',
  autoHideScrollbar:true,
  mouseWheel:{ preventDefault: true }
  });
  
  $('#id_UserSettings_buttonRemoveAllBookmarks').tooltipster({trigger:'custom',position:'top',timer:3000});
  $('#id_UserSettings_buttonSaveBookmark').tooltipster({trigger:'custom',position:'top',timer:3000});
  $('#id_UserSettings_buttonRemoveAllHistory').tooltipster({trigger:'custom',position:'top',timer:3000});

  $('#id_UserSettings_SiteFont_FontSize_inputNormal').on('click',onUserSettings_SiteFont_FontSizeNormal_Click);
  $('#id_UserSettings_SiteFont_FontSize_inputSmall').on('click',onUserSettings_SiteFont_FontSizeSmall_Click);
  $('#id_UserSettings_DashFont_FontSize_inputNormal').on('click',onUserSettings_DashFont_FontSizeNormal_Click);
  $('#id_UserSettings_DashFont_FontSize_inputSmall').on('click',onUserSettings_DashFont_FontSizeSmall_Click);

  $('#id_UserSettings_SiteFont_FontSize_inputNormal').tooltipster({trigger:'custom',position:'top',timer:3000});
  $('#id_UserSettings_SiteFont_FontSize_inputSmall').tooltipster({trigger:'custom',position:'top',timer:3000});
  $('#id_UserSettings_DashFont_FontSize_inputNormal').tooltipster({trigger:'custom',position:'top',timer:3000});
  $('#id_UserSettings_DashFont_FontSize_inputSmall').tooltipster({trigger:'custom',position:'top',timer:3000});

  if(getUserSetting('siteFontSize') == 'Normal'){
    $('#id_UserSettings_SiteFont_FontSize_inputNormal').prop("checked",true);
  }else{
    $('#id_UserSettings_SiteFont_FontSize_inputSmall').prop("checked",true);
  }

  if(getUserSetting('dashFontSize') == 'Normal'){
    $('#id_UserSettings_DashFont_FontSize_inputNormal').prop("checked",true);
  }else{
    $('#id_UserSettings_DashFont_FontSize_inputSmall').prop("checked",true);
  }

});
