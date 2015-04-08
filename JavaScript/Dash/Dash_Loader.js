/*-- --------------------------------------------------------------------------------
Dash Loader
-------------------------------------------------------------------------------- --*/
// 0 - none
// 1 - loading
// 2 - loaded
var gLoadDashInfo = {state:0};

function loadDashSuccess(){
  gLoadDashInfo.loadedDashCount ++;
  
  if(gLoadDashInfo.loadedDashCount == gLoadDashInfo.totalDashLoadCount){
    gLoadDashInfo.state = 2;
  }
}

function loadDash(target){
  
  if(!gLoadDashInfo.state){
    var dashScripts = [
      '0B0PaLJkr8DuFNnY5SHRrbk5McVk', //Dash.js
      '0B0PaLJkr8DuFa0ZUTzZWRzZnRHc', //DashEvent.js
      '0B0PaLJkr8DuFTzFZT1NWWVplUGM', //DashContents.js
      '0B0PaLJkr8DuFZXd3X1lMRnZTbms', //DashContents_Home.js
      '0B0PaLJkr8DuFc19CTi00YkxKS2M', //DashContentsDetail.js
      '0B0PaLJkr8DuFR0hBSnc3N0NpX1U', //DashContents_Page.js
      '0B0PaLJkr8DuFeXN5b3dreWRaTTQ', //Dash_Option.js
      '0B0PaLJkr8DuFbzVJczZzVzl3ZTg', //DashContents_Star.js
      '0B0PaLJkr8DuFTnZiV3NlQnB2eVU', //DashContents_Tag.js
      '0B0PaLJkr8DuFcWVPWG5RdTF4VDA', //DashContents_Message.js
      '0B0PaLJkr8DuFY1Q4Z01IaGZ1MVE', //DashContents_Search.js
      '0B0PaLJkr8DuFcWVPWG5RdTF4VDA', //DashContents_Help.js
    ];
    
    gLoadDashInfo.state = 1;
    gLoadDashInfo.loadedDashCount = 0;
    gLoadDashInfo.totalDashLoadCount = dashScripts.length;
    
    var i;
    
    for(i = 0 ; i < totalDashLoadCount ; i ++){
      $.ajax({
        url: 'https://googledrive.com/host/' + dashScripts[i],
        dataType: 'script',
        cache:true,
        success: loadDashSuccess
      });
    }
  }else if(target){
    
  }
}
