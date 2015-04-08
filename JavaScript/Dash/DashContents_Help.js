/*-- --------------------------------------------------------------------------------
Dash Contents Help
-------------------------------------------------------------------------------- --*/

function setupHelpLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_HelpLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');
  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');
  
  setupPageLens_UpdateNotifyPage();
  setupPageLens_HowToCommentPage();
  setupPageLens_PrivacyPage();

  //Option
  addShowHideAllOption();
}

function setupPageLens_UpdateNotifyPage(){
  var updateNotifyPages = [
    {
      title:'RSSで更新通知を受け取る',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_9.html'),
      iconURL:'https://lh3.googleusercontent.com/-rmNE3mrkPNU/VQV_LItltzI/AAAAAAAA_ro/bBQBkx8eyRc/s800/Dash_UpdateNotifyPage_AddRSS.png',
    },
    
    {
      title:'RSSの更新通知を停止する',
      link:adjustURLForMobile(getHomepageURL() + 'p/rss.html'),
      iconURL:'https://lh4.googleusercontent.com/-T90Sixm35tI/VQV_MQstR1I/AAAAAAAA_r0/Jyb-hAs0JWU/s800/Dash_UpdateNotifyPage_RemoveRSS.png',
    },
    
    {
      title:'メールで更新通知を受け取る',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_10.html'),
      iconURL:'https://lh4.googleusercontent.com/-vyjh1pvHOuY/VQV_KuwoBgI/AAAAAAAA_rU/kqJMSuNzAXc/s800/Dash_UpdateNotifyPage_AddMail.png',
    },

    {
      title:'メールの更新通知を停止する',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_15.html'),
      iconURL:'https://lh5.googleusercontent.com/-fuqWXdqco8w/VQV_Lo7h-iI/AAAAAAAA_rg/5KmGKJrMBOY/s800/Dash_UpdateNotifyPage_RemoveMail.png',
    },
  ];

  var categoryName = 'UpdateNotifyPage';
  
  addCategory(categoryName,'サイトの更新通知');

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
      iconURL:'https://lh3.googleusercontent.com/-64pzFLfdrsg/VQV_KE2Z3iI/AAAAAAAA_rQ/HpSi6XqNQXc/s800/Dash_HowToCommentPage_Comment.png',
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
      iconURL:'https://lh4.googleusercontent.com/-fxIWmidZrn0/VQV_KTpNsPI/AAAAAAAA_r4/aEdZKf9O51I/s800/Dash_PrivacyPage_PrivacyPolicy.png',
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
