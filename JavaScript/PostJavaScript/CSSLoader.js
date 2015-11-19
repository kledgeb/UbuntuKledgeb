/*-- --------------------------------------------------------------------------------
CSS Loader 
-------------------------------------------------------------------------------- --*/

function loadCSS(cssFile){
  var cssFileURL = '//kledgeb.github.io/UbuntuKledgeb/' + cssFile;
  var cssLink = $("<link rel='stylesheet' type='text/css' href='"+ cssFileURL +"'>");

  $('head').append(cssLink); 
}

(function(){  
  if(gIsMobile === false){
    if(getUserSetting('siteFontSize') == 'Small'){
      loadCSS('CSS/ConditionCSS/SiteFont.css');
    }
  
    if(getUserSetting('dashFontSize') == 'Small'){
      loadCSS('CSS/ConditionCSS/DashFont.css');
    }

    if(getUserSetting('dashTheme') == 'Simple'){
      loadCSS('CSS/ConditionCSS/DashThemeSimple.css');
    }
  }
}());
