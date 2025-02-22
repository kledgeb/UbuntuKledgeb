/*-- --------------------------------------------------------------------------------
Left Bar
-------------------------------------------------------------------------------- --*/
function onLeftBarDashClick(event){
  toggleDash(null);
}

function onLeftBarHomeClick(event){
  window.location.href = gHomepageURL;
}

function onLeftBarStarClick(event){
  toggleDash('Star');
}

function onLeftBarUbuntuClick(event){
  toggleDash('Ubuntu');
}

function onLeftBarWebSiteClick(event){
  toggleDash('WebSite');
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

(function(){
  $('#id_LeftBar_divDash').on('click',onLeftBarDashClick);
  $('#id_LeftBar_divHome').on('click',onLeftBarHomeClick);
  $('#id_LeftBar_divStar').on('click',onLeftBarStarClick);
  $('#id_LeftBar_divUbuntu').on('click',onLeftBarUbuntuClick);
  $('#id_LeftBar_divWebSite').on('click',onLeftBarWebSiteClick);
  $('#id_LeftBar_divTag').on('click',onLeftBarTagClick);
  $('#id_LeftBar_divSearch').on('click',onLeftBarSearchClick);

  var divSNS = $('#id_LeftBar_divSNS');

  if((gCurrentPageType == 'index') || (gCurrentPageType == 'item') || (gCurrentPageType == 'static_page')){
    divSNS.on('click',onLeftBarSNSClick);
    divSNS.css('display','block');
  }else{
    divSNS.css('display','none');
  }
}());
