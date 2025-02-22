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
    Pickup Post   
    -------------------------------------------------------------------------------- --*/
    appearElem = $('#id_PickupPosts_divLoading');
    appearElem.appear();
    appearElem.one('appear', onPickupPostsAppear);
    
    /*-- --------------------------------------------------------------------------------
    Page Navi   
    -------------------------------------------------------------------------------- --*/
    appearElem = $('#id_divPageNaviOuter');
    appearElem.appear();
    appearElem.one('appear', onPageNaviOuterAppear);
  
    /*-- --------------------------------------------------------------------------------
    Storage
    -------------------------------------------------------------------------------- --*/      
    $(window).bind("beforeunload", onBeforeUnload);
    
    /*-- --------------------------------------------------------------------------------
    Other
    -------------------------------------------------------------------------------- --*/      
    $.force_appear();
    showStatusMessage();

    if(gIsMobile == false)
    {
      var targetTag = $("#id_divPostBody > h2:eq(1)");

      if(targetTag.length == 0){
          targetTag = $("#id_divPostBody > h3:eq(0)");
      }

      if(targetTag.length != 0){
          var ads = $("#id_divInArticleAdsenceContents");

          ads.insertBefore(targetTag);
      }
    }
  }catch(e){

  }
});

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
      statusMessage = '指定された記事が見つかりませんでした。<br><br>リンク元のURL：' + document.referrer + '<br>リンク先のURL：' + window.location.href;
    }
    
    divStatusMessage.html(statusMessage);
  }
}

function onBeforeUnload(event){
  if(gUserSettings){
    $.localStorage.set('userSettings',gUserSettings);
  }
}
