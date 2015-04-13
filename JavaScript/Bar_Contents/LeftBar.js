/*-- --------------------------------------------------------------------------------
Left Bar 
-------------------------------------------------------------------------------- --*/
function onLeftBarDashClick(event){
  toggleDash(null);
}

function onLeftBarHomeClick(event){
  window.location.href = gHomepageURL;  
}

function onLeftBarLinuxClick(event){
  toggleDash('Page',{showCategory:{LinuxDistributionPage:true}});
}

function onLeftBarSystemClick(event){
  window.location.href = adjustURLForMobile(getHomepageURL() + 'p/blog-page_6364.html');
}

function onLeftBarApplicationClick(event){
  window.location.href = adjustURLForMobile(getHomepageURL() + 'p/blog-page_22.html');
}

function onLeftBarHardwareClick(event){
  window.location.href = adjustURLForMobile(getHomepageURL() + 'p/blog-page_5799.html');
}

function onLeftBarStarClick(event){
  toggleDash('Star');
}

function onLeftBarSNSClick(event){
  toggleDash('SNS');
}

function onLeftBarTagClick(event){
  toggleDash('Tag');
}

function onLeftBarSearchClick(event){
  toggleDash('Search');
}

function onLeftBarMessageClick(event){
  window.location.href = adjustURLForMobile(getHomepageURL() + 'p/blog-page_29.html');
}

function onLeftBarBookmarkClick(event){
  addCurrentPageToBookmarkWithNotify($('#id_LeftBar_divBookmark'));
}

(function(){
  $('#id_LeftBar_divDash').click(onLeftBarDashClick);
  $('#id_LeftBar_divHome').click(onLeftBarHomeClick);
  $('#id_LeftBar_divUbuntu').click(onLeftBarLinuxClick);
  $('#id_LeftBar_divSystem').click(onLeftBarSystemClick);
  $('#id_LeftBar_divApplication').click(onLeftBarApplicationClick);
  $('#id_LeftBar_divHardware').click(onLeftBarHardwareClick);
  $('#id_LeftBar_divStar').click(onLeftBarStarClick);
  $('#id_LeftBar_divTag').click(onLeftBarTagClick);
  $('#id_LeftBar_divSearch').click(onLeftBarSearchClick);
  $('#id_LeftBar_divMessage').click(onLeftBarMessageClick);
  
  var divSNS = $('#id_LeftBar_divSNS');
  var divBookmark = $('#id_LeftBar_divBookmark');
  
  if(gCurrentPageType == 'item'){
    divSNS.click(onLeftBarSNSClick);
    divSNS.css('display','block');
    
    divBookmark.click(onLeftBarBookmarkClick);
    divBookmark.tooltipster({trigger:'custom',position:'right',timer:3000});
    divBookmark.css('display','block');
  }else{
    divSNS.css('display','none');
    divBookmark.css('display','none');
  }
}());
