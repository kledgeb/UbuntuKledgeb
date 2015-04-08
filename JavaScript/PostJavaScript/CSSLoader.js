/*-- --------------------------------------------------------------------------------
CSS Loader 
-------------------------------------------------------------------------------- --*/

function loadCSS(cssFile){
  var cssFileURL = 'https://googledrive.com/host/' + cssFile;
  var cssLink = $("<link rel='stylesheet' type='text/css' href='"+ cssFileURL +"'>");

  $('head').append(cssLink); 
}

(function(){  
  if(getUserSetting('siteFontSize') == 'Small'){
    loadCSS('0B0PaLJkr8DuFblFEazdNSVhyY3M');
  }

  if(getUserSetting('dashFontSize') == 'Small'){
    loadCSS('0B0PaLJkr8DuFUW1wWEtac25INTQ');
  }
}());