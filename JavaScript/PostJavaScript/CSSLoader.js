/*-- --------------------------------------------------------------------------------
CSS Loader 
-------------------------------------------------------------------------------- --*/

function loadCSS(cssFile){
  var cssFileURL = 'http://kledgeb.github.io/UbuntuKledgeb/' + cssFile;
  var cssLink = $("<link rel='stylesheet' type='text/css' href='"+ cssFileURL +"'>");

  $('head').append(cssLink); 
}

(function(){  
  if(getUserSetting('siteFontSize') == 'Small'){
    loadCSS('CSS/ConditionCSS/SiteFont.css');
  }

  if(getUserSetting('dashFontSize') == 'Small'){
    loadCSS('CSS/ConditionCSS/DashFont.css');
  }
}());
