/*-- --------------------------------------------------------------------------------
Dash Lens YouTube
-------------------------------------------------------------------------------- --*/
function setupYouTubeLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_YouTubeLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');

  setupYouTubeLens_VideoList();
}

function setupYouTubeLens_VideoList(){
  var categoryName = 'VideoList';
  var divCategoryContents;

  addCategory(categoryName,'チャンネル最新動画');
  divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);

  divCategoryContents.data('loading',true);

  $.getJSON(
    'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('http://www.youtube.com/feeds/videos.xml?channel_id=UCfgbidxoREqkOpigg5ekMyQ'),
    function(jsonData){
      id_Dash_Category_Contents_divVideoList
      divCategoryContents.css('background-image','none');
      divCategoryContents.data('loading',false);

      $.each(jsonData.items,function(index,jsonItemData) {
          var categoryItemInfo;

          categoryItemInfo = {
              itemIndex:index,
              itemTotalCount:jsonData.items.length,
              categoryName:categoryName,
              itemLink:jsonItemData.link,
              itemIconURL:jsonItemData.thumbnail,
              itemTitle:jsonItemData.title,
              hasDetail:true,
              itemData:{videoID:jsonItemData.guid.split(":")[2]},
          };

          addCategoryItem(categoryItemInfo);
      });

      layoutCategoryHead(categoryName);
    }
  );

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupYouTubeContentsDetail(divItem){
  var itemInfo = divItem.data('itemInfo');

  setupContentsDetail_createSectionElement(itemInfo);

  var divLeftSection = $('#id_DashContentsDetail_divLeftSection');
  var divRightSection = $('#id_DashContentsDetail_divRightSection');

  if(itemInfo.totalPostCount === 0){
    divLeftSection.css('visibility','hidden');
    divRightSection.css('visibility','hidden');
  }else{
    if(itemInfo.itemIndex == 0){
      divLeftSection.css('visibility','hidden');
    }else{
      divLeftSection.css('visibility','visible');
    }

    if(itemInfo.itemIndex == (itemInfo.totalPostCount - 1)){
      divRightSection.css('visibility','hidden');
    }else{
      divRightSection.css('visibility','visible');
    }
  }

  {
    setupContentsDetail_createButtonContainer(itemInfo);
    setupContentsDetail_createBackButton(itemInfo);

    var divButtonContainer = $('#id_DashContentsDetail_' + itemInfo.categoryName + '_divButtonContainer');
    divButtonContainer.append("<div class='clear'></div>");
  }

  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
  var divYouTubeContainer = $('<div>')
                              .attr('class','cls_DashContentsDetail_'+ itemInfo.categoryName + '_divYouTubeContainer')
                              .appendTo(divCenterSection);

  var divYouTubeEmbed = $('<div>')
                              .attr('class','cls_DashContentsDetail_'+ itemInfo.categoryName + '_divYouTubeEmbed')
                              .appendTo(divYouTubeContainer);

  $('<iframe>')
    .attr('id','id_YoutubeIFrame')
    .attr('width','100%')
    .attr('height','100%')
    .attr('src','https://www.youtube.com/embed/' + itemInfo.itemData.videoID)
    .attr('title','YouTube video player')
    .attr('frameborder','0')
    .attr('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
    .attr('allowfullscreen','allowfullscreen')
    .appendTo(divYouTubeEmbed);

    divYouTubeEmbed.css('background-image','none');
}
