/*-- --------------------------------------------------------------------------------
Dash Lens SNS
-------------------------------------------------------------------------------- --*/
function setupSNSLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_SNSLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');

  setupSNSLens_SharePost();
  setupSNSLens_DeliveryPost();
}

function setupSNSLens_SharePost(){
  var sharePost;
  var postURL;
  var postText;

  if(gCurrentPageType == 'index'){
    postURL = gHomepageURL;
    postText = gPageTitle;
  }else{
    postURL = gPostInfo.url;
    postText = gPostInfo.title;
  }

  postText = $('<p>' + postText + '</p>').text();

  sharePost = [
    {
      title:'X で共有',
      link:"//x.com/share?url=" + postURL + "&text="  + postText + "&hashtags=kledgeb",
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/TwitterLogo_White.svg',
    },

    {
      title:'はてなブックマークに追加',
      link:"//b.hatena.ne.jp/add?mode=confirm&url=" + postURL + "&title=" + postText,
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/HatenaBookmark_Logo.png',
    },
  ];

  var categoryName = 'SharePost';

  addCategory(categoryName,'記事をSNSで共有');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;

  for(i = 0 ; i < sharePost.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:sharePost.length,
      categoryName:categoryName,
      itemLink:sharePost[i].link,
      itemIconURL:sharePost[i].iconURL,
      itemTitle:sharePost[i].title,
      openLinkAtNewWindow:true
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupSNSLens_DeliveryPost(){
  var deliveryPost;

  deliveryPost = [

    {
      title:'RSS',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_9.html'),
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Dash_RSS.svg',
    },

    {
      title:'X をフォロー',
      link:'//x.com/intent/user?screen_name=kledgeb',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/TwitterLogo_White.svg',
    },

  ];

  var categoryName = 'DeliveryPost';

  addCategory(categoryName,'記事の更新通知');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;

  for(i = 0 ; i < deliveryPost.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:deliveryPost.length,
      categoryName:categoryName,
      itemLink:deliveryPost[i].link,
      itemIconURL:deliveryPost[i].iconURL,
      itemTitle:deliveryPost[i].title,
      openLinkAtNewWindow:true
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}
