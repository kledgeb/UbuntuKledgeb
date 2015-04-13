/*-- --------------------------------------------------------------------------------
Ready 
-------------------------------------------------------------------------------- --*/

$(function() {
  try{
    /*-- --------------------------------------------------------------------------------
    Related Post  
    -------------------------------------------------------------------------------- --*/
    var appearElem = $('#id_divRelatedPostOuter');
    appearElem.appear();
    appearElem.one('appear', onRelatedPostOuterAppear);
    
    /*-- --------------------------------------------------------------------------------
    Post Navi with Info  
    -------------------------------------------------------------------------------- --*/
    appearElem = $('#id_divPostNaviWithInfoOuter');
    appearElem.appear();
    appearElem.one('appear', onPostNaviWithInfoOuterAppear);
  
    /*-- --------------------------------------------------------------------------------
    Page Navi   
    -------------------------------------------------------------------------------- --*/
    appearElem = $('#id_divPageNaviOuter');
    appearElem.appear();
    appearElem.one('appear', onPageNaviOuterAppear);
  
    /*-- --------------------------------------------------------------------------------
    Animation Button
    -------------------------------------------------------------------------------- --*/
    $(".animationButton").hover(onHoverIn_Animate,onHoverOut_Animate);     
      
    /*-- --------------------------------------------------------------------------------
    datepicker
    -------------------------------------------------------------------------------- --*/
    $.datepicker.setDefaults({
      monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
      dayNamesShort: ['日','月','火','水','木','金','土'],
      dayNamesMin: ['日','月','火','水','木','金','土'],
      dateFormat: 'yy/mm/dd',
      
      firstDay: 0,
      prevText: '',
      nextText: '',
      currentText: '今日',
      closeText: '閉じる', 
      
  　　numberOfMonths: 1,
           
      changeMonth: true,
      changeYear: true,
      constrainInput: false,    
      showMonthAfterYear:true,
      showButtonPanel: true,
      
      showAnim:'',
    });

    /*-- --------------------------------------------------------------------------------
    Storage
    -------------------------------------------------------------------------------- --*/      
    $(window).bind("beforeunload", onBeforeUnload);
    
    /*-- --------------------------------------------------------------------------------
    Other
    -------------------------------------------------------------------------------- --*/      
    $.force_appear();
    showStatusMessage();
  }catch(e){

  }
});

function onHoverIn_Animate(eventObject){
  $(this).stop().animate({ backgroundColor: "#19529E"}, 200);
}

function onHoverOut_Animate(eventObject){
  $(this).stop().animate({ backgroundColor: "#333333"}, 200);
}

function onHoverOut_Animate_PageNaviButton(eventObject){
  $(this).stop().animate({ backgroundColor: "#5981B9"}, 200);
}

function onHoverIn_AnimateAnchorPost(eventObject){
  $(this).stop().animate({ backgroundColor: "#B5CCEB"}, 200);
}

function onHoverOut_AnimateAnchorPost(eventObject){
  $(this).stop().animate({ backgroundColor: "#FFFFFF"}, 200);
}

function onEventPrevent(event){
  event.preventDefault();
}

function onEventPrevent_StopPropagation(event){
  event.preventDefault();
  event.stopPropagation();
}

function showStatusMessage(){
  if(gNumPosts === 0){
    var divStatusMessage = $('#id_Contents_divStatusMessage');
    var statusMessage;
    
    divStatusMessage.show();
    
    if(gSearchLabel){
      statusMessage = 'タグ「<b>' + gSearchLabel + '</b>」に関連付けられた記事は、見つかりませんでした。'
    }else if(gSearchQuery){
      statusMessage = 'キーワード「<b>' + gSearchQuery + '</b>」に関する記事は、見つかりませんでした。'
    }else{
      statusMessage = '記事が見つかりません。';
    }
    
    divStatusMessage.html(statusMessage);
  }
}

function onBeforeUnload(event){
  if(gUserSettings){
    $.localStorage.set('userSettings',gUserSettings);
  }
}
