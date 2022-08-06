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

function onLeftBarLinuxClick(event){
  toggleDash('Page',{showCategory:{LinuxDistributionPage:true}});
}

function onLeftBarPageClick(event){
  toggleDash('Page');
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
  $('#id_LeftBar_divDash').click(onLeftBarDashClick);
  $('#id_LeftBar_divHome').click(onLeftBarHomeClick);
  $('#id_LeftBar_divStar').click(onLeftBarStarClick);
  $('#id_LeftBar_divUbuntu').click(onLeftBarLinuxClick);
  $('#id_LeftBar_divPage').click(onLeftBarPageClick);
  $('#id_LeftBar_divTag').click(onLeftBarTagClick);
  $('#id_LeftBar_divSearch').click(onLeftBarSearchClick);
  
  var divSNS = $('#id_LeftBar_divSNS');

  if((gCurrentPageType == 'index') || (gCurrentPageType == 'item') || (gCurrentPageType == 'static_page')){
    divSNS.click(onLeftBarSNSClick);
    divSNS.css('display','block');    
  }else{
    divSNS.css('display','none');
  }
}());
