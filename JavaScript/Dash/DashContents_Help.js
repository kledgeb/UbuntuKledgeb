/*-- --------------------------------------------------------------------------------
Dash Contents Help
-------------------------------------------------------------------------------- --*/

function setupHelpLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_HelpLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');
  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');

  setupPageLens_UpdateNotifyPage();
  //setupPageLens_HowToCommentPage();
  setupPageLens_PrivacyPage();

  //Option
  addShowHideAllOption();
}

function setupPageLens_UpdateNotifyPage(){
  var updateNotifyPages = [
    {
      title:'RSSの停止',
      link:adjustURLForMobile(getHomepageURL() + 'p/rss.html'),
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Dash_RSS.svg',
    },

    {
      title:'メールの配信の停止',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_15.html'),
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Dash_MailDelivery.svg',
    },
  ];

  var categoryName = 'UpdateNotifyPage';

  addCategory(categoryName,'記事の更新通知');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;

  for(i = 0 ; i < updateNotifyPages.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:updateNotifyPages.length,
      categoryName:categoryName,
      itemLink:updateNotifyPages[i].link,
      itemIconURL:updateNotifyPages[i].iconURL,
      itemTitle:updateNotifyPages[i].title,
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupPageLens_HowToCommentPage(){
  var howToCommentPages = [
    {
      title:'コメントと掲示板の使い方',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_8387.html'),
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Dash_Forum.svg',
    },
  ];

  var categoryName = 'HowToCommentPage';

  addCategory(categoryName,'コメントと掲示板');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;

  for(i = 0 ; i < howToCommentPages.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:howToCommentPages.length,
      categoryName:categoryName,
      itemLink:howToCommentPages[i].link,
      itemIconURL:howToCommentPages[i].iconURL,
      itemTitle:howToCommentPages[i].title,
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupPageLens_PrivacyPage(){
  var privacyPages = [
    {
      title:'プライバシーポリシー',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_30.html'),
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Dash_Privacy.svg',
    },
  ];

  var categoryName = 'PrivacyPage';

  addCategory(categoryName,'プライバシー');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;

  for(i = 0 ; i < privacyPages.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:privacyPages.length,
      categoryName:categoryName,
      itemLink:privacyPages[i].link,
      itemIconURL:privacyPages[i].iconURL,
      itemTitle:privacyPages[i].title,
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}
