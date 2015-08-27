/*-- --------------------------------------------------------------------------------
Dash Lens Home
-------------------------------------------------------------------------------- --*/
function setupHomeLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_HomeLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');
  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');
  
  if(gCurrentPageType == 'item'){
    setupHomeLens_RelatedPost();
  }

  setupHomeLens_LatestPost();
  setupHomeLens_ReleaseSchedule();
  setupHomeLens_SupportedVersion();

  //Option
  addShowHideAllOption();
}

function setupHomeLens_LatestPost(){
  var categoryName = 'LatestPost';
  addCategory(categoryName,'最新記事');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  divCategoryContents.data('loading',true);
  
  getLatestPostByIndex(1,20,setupHomeLens_CreateLatestPostElement);  
}

function setupHomeLens_CreateLatestPostElement(latestPosts) {
  var categoryName = 'LatestPost';
  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  
  divCategoryContents.css('background-image','none');    
  divCategoryContents.data('loading',false);
  
  if(latestPosts){
    var i;
    var categoryItemInfo;  
    
    for (i = 0 ; i < latestPosts.length ; i ++) {
      categoryItemInfo = {
        itemIndex:i,
        itemTotalCount:latestPosts.length,
        categoryName:categoryName,
        itemLink:parsePostLink(latestPosts[i].link),
        itemIconURL:parsePostThumbnail(latestPosts[i].media$thumbnail),
        itemTitle:latestPosts[i].title.$t,
        hasDetail:true,
        itemData:{feedEntry:latestPosts[i]},
      };
      
      addCategoryItem(categoryItemInfo);
    }
    
    divCategoryContents.append("<div class='clear'></div>");
  }

  layoutCategoryHead(categoryName);
}

function setupHomeLens_RelatedPost() {
  var categoryName = 'RelatedPost';
  addCategory(categoryName,'関連記事');
  
  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  divCategoryContents.data('loading',true);
  
  getRelatedPost(gRelatedPostLabels,setupHomeLens_CreateRelatedPostElement,{maxResults:'20'});
}

function setupHomeLens_CreateRelatedPostElement(relatedPosts) {
  var categoryName = 'RelatedPost';
  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);

  divCategoryContents.css('background-image','none');
  divCategoryContents.data('loading',false);

  if(relatedPosts){
    var i;
    var categoryItemInfo;
        
    for (i = 0 ; i < relatedPosts.length ; i ++) {
      categoryItemInfo = {
        itemIndex:i,
        itemTotalCount:relatedPosts.length,
        categoryName:categoryName,
        itemLink:parsePostLink(relatedPosts[i].link),
        itemIconURL:parsePostThumbnail(relatedPosts[i].media$thumbnail),
        itemTitle:relatedPosts[i].title.$t,
        hasDetail:true,
        itemData:{feedEntry:relatedPosts[i]},
      };

      addCategoryItem(categoryItemInfo);
    }
  
    divCategoryContents.append("<div class='clear'></div>");
  }
  
  layoutCategoryHead(categoryName);
}

function setupHomeLens_ReleaseSchedule(){
  var releaseSchedules = [
    {
      title:'Ubutntu 12.04.5 LTS',
      date:'2014年8月7日',
      link:adjustURLForMobile(getHomepageURL() + '2014/08/ubuntu-1204-4-ubuntu-12045ubuntu-12045.html'),
    },

    {
      title:'Ubutntu 14.04.3 LTS',
      date:'2015年8月6日',
      link:adjustURLForMobile(getHomepageURL() + '2015/08/ubuntu-1404-15-ubuntu-14043.html'),
    },

    {
      title:'Ubutntu 15.04',
      date:'2015年4月23日',
      link:adjustURLForMobile(getHomepageURL() + '2015/04/ubuntu-1504-6-ubuntu-1504.html'),
    },

    {
      title:'Ubutntu 15.10',
      date:'2015年10月22日',
      link:adjustURLForMobile(getHomepageURL() + '2015/08/ubuntu-1510-5-wily-werewolf-1.html'),
    },
  ];

  var categoryName = 'ReleaseSchedule';
  
  addCategory(categoryName,'リリーススケジュール');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var itemTitle;
  var itemIconURL;
  var categoryItemInfo;
  
  for(i = 0 ; i < releaseSchedules.length ; i ++){
    itemTitle = releaseSchedules[i].title + '<br>' + releaseSchedules[i].date;
      
    if(releaseSchedules[i].stage){
      itemIconURL = 'https://lh6.googleusercontent.com/-0pUHT0N6zKk/VP6GIR5KhsI/AAAAAAAA_jo/9zgoMPszvBc/s800/Dash_Category_Ubuntu_Item_Beta.png';
    }else{
      itemIconURL = 'https://lh4.googleusercontent.com/-YNBhifiIM6U/VP6GIS5omXI/AAAAAAAA_js/VKKXmmbCYdA/s800/Dash_Category_Ubuntu_Item.png';
    }

    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:releaseSchedules.length,
      categoryName:categoryName,
      itemLink:releaseSchedules[i].link,
      itemIconURL:itemIconURL,
      itemTitleHTML:itemTitle,
    };
    
    addCategoryItem(categoryItemInfo);
  }
  
  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupHomeLens_SupportedVersion(){
  var supportedVersions = [
    {
      title:'Ubuntu 12.04.5 LTS',
      date:'2017年4月までサポート（5年）',
      link:adjustURLForMobile(getHomepageURL() + '2014/08/ubuntu-1204-4-ubuntu-12045ubuntu-12045.html'),
    },
    
    {
      title:'Ubutntu 14.04.3 LTS',
      date:'2019年4月までサポート（5年）',
      link:adjustURLForMobile(getHomepageURL() + '2015/08/ubuntu-1404-15-ubuntu-14043.html'),
    },
    
    {
      title:'Ubutntu 15.04',
      date:'2016年1月までサポート（9ヶ月）',
      link:adjustURLForMobile(getHomepageURL() + '2015/04/ubuntu-1504-6-ubuntu-1504.html'),
    },
  ];

  var categoryName = 'SupportedVersion';

  addCategory(categoryName,'サポート中のバージョン');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var itemTitle;
  var itemIconURL;
  var categoryItemInfo;
  
  for(i = 0 ; i < supportedVersions.length ; i ++){
    itemTitle = supportedVersions[i].title + '<br>' + supportedVersions[i].date;    
    itemIconURL = 'https://lh4.googleusercontent.com/-YNBhifiIM6U/VP6GIS5omXI/AAAAAAAA_js/VKKXmmbCYdA/s800/Dash_Category_Ubuntu_Item.png';

    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:supportedVersions.length,
      categoryName:categoryName,
      itemLink:supportedVersions[i].link,
      itemIconURL:itemIconURL,
      itemTitleHTML:itemTitle,
    };
    
    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupHomeContentsDetail(divItem){
  var itemInfo = divItem.data('itemInfo');

  setupContentsDetail_createSectionElement(itemInfo);
  setupContentsDetail_createTitleElement(itemInfo,null);

  {
    var divCenterSection = $('#id_DashContentsDetail_divCenterSection');
    var divPostInfoContainer = $('<div/>');
    var divPostInfoData = $('<div/>');
    
    //PostInfoContainer
    {
      divPostInfoContainer.attr('class','cls_DashContentsDetail_divPostInfoContainer cls_DashContentsDetail_' + itemInfo.categoryName + '_divPostInfoContainer');
      divCenterSection.append(divPostInfoContainer);
    }
   
    //Post Tag
    {
      var anchorTag;
      
      divPostInfoData.attr('class','cls_DashContentsDetail_divPostTag cls_DashContentsDetail_' + itemInfo.categoryName + '_divPostTag');
      
      for(i = 0 ; i < itemInfo.itemData.feedEntry.category.length ; i ++){
        anchorTag = $('<a>');
        anchorTag.text(itemInfo.itemData.feedEntry.category[i].term);
        anchorTag.attr('href',adjustURLForMobile(getHomepageURL() + 'search/label/' + encodeURIComponent(itemInfo.itemData.feedEntry.category[i].term) + '?&max-results=' + gPostCountPerPage));
        //anchorTag.attr('target','_blank');
        
        if(i > 0){
          divPostInfoData.append(' , ');
        }
        
        divPostInfoData.append(anchorTag);
      }
      
      divPostInfoContainer.append(divPostInfoData);
    }

    //Post Date
    {
      divPostInfoData = $('<div/>');
      
      divPostInfoData.attr('class','cls_DashContentsDetail_divPostDate cls_DashContentsDetail_' + itemInfo.categoryName + '_divPostDate');
      divPostInfoData.text(parsePostDay(itemInfo.itemData.feedEntry.published.$t));
      divPostInfoContainer.append(divPostInfoData);
      
      divPostInfoContainer.append("<div class='clear'></div>");
    }
  }
  
  setupContentsDetail_createThumbnailAndSummary(itemInfo,parsePostThumbnail(itemInfo.itemData.feedEntry.media$thumbnail,320),adjustPostSummary(itemInfo.itemData.feedEntry.summary.$t));
  setupContentsDetail_createButtons(itemInfo,null);
}
