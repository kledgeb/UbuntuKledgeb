/*-- --------------------------------------------------------------------------------
Post Navi
-------------------------------------------------------------------------------- --*/

function onPostNaviWithInfoOuterAppear(){
  var postLink;
  var callbackData = {processedPostInfoCount:0};
  
  //Next
  postLink = $('#id_PostNaviWithInfo_anchorNext').attr('href');
  
  if((postLink) && (postLink.length > 0)){
    $.ajax(postLink,{
      success: postNaviWithInfoCallback(callbackData,'id_PostNaviWithInfo_divNext','id_PostNaviWithInfo_spanNext')
    });
  }else{
    $("#id_PostNaviWithInfo_divNext").css('visibility','hidden');
  }
  
  //Prev
  postLink = $('#id_PostNaviWithInfo_anchorPrev').attr('href');
  
  if((postLink) && (postLink.length > 0)){
    $.ajax(postLink,{
      success: postNaviWithInfoCallback(callbackData,'id_PostNaviWithInfo_divPrev','id_PostNaviWithInfo_spanPrev')
    });
  }else{
    $("#id_PostNaviWithInfo_divPrev").css('visibility','hidden');
  }
}

var postNaviWithInfoCallback = function(callbackData,divID,spanID) {
  return function(htmlData) {
    callbackData['processedPostInfoCount'] ++;
    
    var title = $(htmlData).find('#id_PostTitle_h1PostTitle').attr('postTitle');
    
    if(title){
      $('#' + spanID).text(title);
    }
     
    $('#' + divID).css('visibility','visible');
 
      
    //Show
    $('#id_PostNaviWithInfo_divLoading').css('display','none');
    $('#id_divPostNaviWithInfoContainer').css('display','block');
  };
};