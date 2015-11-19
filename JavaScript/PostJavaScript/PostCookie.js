//  https://googledrive.com/host/0B0PaLJkr8DuFR3BVdkZ6ekhpUUk

function dateFromISO8601(ISO8601Date) {
  var parts = ISO8601Date.match(/\d+/g);
  return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
}    

/*0-None, 1-BlueNew, 2-RedNew*/
function getIconType(postID,postISO8601Date){
  var result=0;
  var postDate = dateFromISO8601(postISO8601Date);
  var currntDate = new Date();
  var minuteDiff = (currntDate.getTime() - postDate.getTime()) / 1000 / 60;
  var cookieKey = postID + '_read';
  var postCookie = $.cookie(cookieKey);
  
  if(minuteDiff <= 3 * 24 * 60){
    if(postCookie === null){
      result = 2;
    }
  }else if(minuteDiff <= 7 * 24 * 60){
    if(postCookie === null){
      result = 1;
    }
  }else if(postCookie !== null){
    $.removeCookie(cookieKey,{path: '/' });
  }

  return result;
}

function setPostNewIcon(newImgID,postID,postISO8601Date){
  var iconType = getIconType(postID,postISO8601Date);
  
  if(iconType !== 0)
  {
    var newImgObj = $('#' + newImgID);
    
    switch(iconType){
    case 1:
      newImgObj.attr('src','//lh5.googleusercontent.com/-OonXsLudspM/UXOSY3bybYI/AAAAAAAAUbQ/vgBMdFUBFs8/s800/Icon_New_Blue.png');
      newImgObj.attr('title','1週間以内に投稿されています。未読です。');
    break;
    case 2:
      newImgObj.attr('src','//lh4.googleusercontent.com/-c0rPEZmPjcQ/UXOSYyqhy4I/AAAAAAAAUbU/jYWgoUhAhRk/s800/Icon_New_Red.png');
      newImgObj.attr('title','3日以内に投稿されています。未読です。');
    break;
    }
  }
}

function setPostCookie(postID){
  var cookieKey = postID + '_read';
  var postCookie = $.cookie(cookieKey);
  
  if(postCookie === null){
    $.cookie(cookieKey,'0',{ expires: 8, path: '/' });
  }
}
