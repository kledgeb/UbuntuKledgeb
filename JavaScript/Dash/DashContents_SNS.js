/*-- --------------------------------------------------------------------------------
Dash Lens Page
-------------------------------------------------------------------------------- --*/
function setupSNSLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_SNSLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');
  
  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');

  setupSNSLens_SharePost();
}

function setupSNSLens_SharePost(){
  var postTitle = $('<p>' + gPostInfo.title + '</p>').text();
  var sharePost;
  
  if(gCurrentPageType == 'index'){
    sharePost = [
      {
        title:'メールでサイトの更新通知を受け取る',
        link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_10.html'),
        iconURL:'//lh5.googleusercontent.com/-37zSY8ioXms/VRolAzBPWWI/AAAAAAABAPw/hvffIv0WkMA/s800/MailButton_48.jpg',
      },

      {
        title:'RSSでサイトの更新通知を受け取る',
        link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_9.html'),
        iconURL:'//lh6.googleusercontent.com/-yT9fLFsRODQ/VRoo2CXHeFI/AAAAAAABAQs/52HTEMksuIA/s800/RSS_48.jpg',
      },
      
      {
        title:'サイトをはてなブックマークに追加',
        link:"//b.hatena.ne.jp/add?mode=confirm&url=" + gHomepageURL + "&title=" + gPageTitle,
        iconURL:'//lh3.googleusercontent.com/-7M3z08cysmU/VRolAQl79OI/AAAAAAABAQU/AwmWm4pcecY/s800/HatenaButton_48.jpg',
      },
      
      {
        title:'サイトをツイッターで共有',
        link:"//twitter.com/share?url=" + gHomepageURL + "&text="  + gPageTitle + "&hashtags=kledgeb",
        iconURL:'//lh5.googleusercontent.com/-NpqimLJuM8k/VRolBlZAFsI/AAAAAAABAQI/3lH9wOOFmR4/s800/TweetButton_48.jpg',
      },

      {
        title:'サイトをfacebookで共有',
        link:"//www.facebook.com/sharer.php?u=" + gHomepageURL + "&t="  + gPageTitle,
        iconURL:'//lh6.googleusercontent.com/-H3rMXXmz3hY/VRoo2JTbh-I/AAAAAAABAQo/MVRvaVya3Ds/s800/facebookButton_48.jpg',
      },

      {
        title:'サイトをGoogle+で共有',
        link:"//plus.google.com/share?url=" + gHomepageURL,
        iconURL:'//lh6.googleusercontent.com/-qU0vsgkUrig/VRok_u29a9I/AAAAAAABAPc/ptVAk184T9I/s800/GooglePlusButton_48.jpg',
      },

      {
        title:'サイトをTumblrで共有',
        link:"//www.tumblr.com/share/link?url=" + gHomepageURL + "&name="  + gPageTitle,
        iconURL:'//lh5.googleusercontent.com/-OiKGTQgqiJ8/VRolBLL6FlI/AAAAAAABAP0/o-fxjbZrdts/s800/TumblrButton_48.jpg',
      },
      
      {
        title:'サイトをLinkedinで共有',
        link:"//www.linkedin.com/shareArticle?mini=true&url=" + gHomepageURL + "&title="  + gPageTitle,
        iconURL:'//lh4.googleusercontent.com/-4W5qWmMr9Pg/VRolAne3NxI/AAAAAAABAQE/rMOr8CJ4f9E/s800/LinkedinButton_48.jpg',
      },
    ];    
  }else{
    sharePost = [
      {
        title:'メールでサイトの更新通知を受け取る',
        link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_10.html'),
        iconURL:'//lh5.googleusercontent.com/-37zSY8ioXms/VRolAzBPWWI/AAAAAAABAPw/hvffIv0WkMA/s800/MailButton_48.jpg',
      },

      {
        title:'RSSでサイトの更新通知を受け取る',
        link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_9.html'),
        iconURL:'//lh6.googleusercontent.com/-yT9fLFsRODQ/VRoo2CXHeFI/AAAAAAABAQs/52HTEMksuIA/s800/RSS_48.jpg',
      },
      
      {
        title:'記事をはてなブックマークに追加',
        link:"//b.hatena.ne.jp/add?mode=confirm&url=" + gPostInfo.url + "&title=" + postTitle,
        iconURL:'//lh3.googleusercontent.com/-7M3z08cysmU/VRolAQl79OI/AAAAAAABAQU/AwmWm4pcecY/s800/HatenaButton_48.jpg',
      },
      
      {
        title:'記事をツイッターで共有',
        link:"//twitter.com/share?url=" + gPostInfo.url + "&text="  + postTitle + "&hashtags=kledgeb",
        iconURL:'//lh5.googleusercontent.com/-NpqimLJuM8k/VRolBlZAFsI/AAAAAAABAQI/3lH9wOOFmR4/s800/TweetButton_48.jpg',
      },

      {
        title:'記事をfacebookで共有',
        link:"//www.facebook.com/sharer.php?u=" + gPostInfo.url + "&t="  + postTitle,
        iconURL:'//lh6.googleusercontent.com/-H3rMXXmz3hY/VRoo2JTbh-I/AAAAAAABAQo/MVRvaVya3Ds/s800/facebookButton_48.jpg',
      },

      {
        title:'記事をGoogle+で共有',
        link:"//plus.google.com/share?url=" + gPostInfo.url,
        iconURL:'//lh6.googleusercontent.com/-qU0vsgkUrig/VRok_u29a9I/AAAAAAABAPc/ptVAk184T9I/s800/GooglePlusButton_48.jpg',
      },

      {
        title:'記事をTumblrで共有',
        link:"//www.tumblr.com/share/link?url=" + gPostInfo.url + "&name="  + postTitle,
        iconURL:'//lh5.googleusercontent.com/-OiKGTQgqiJ8/VRolBLL6FlI/AAAAAAABAP0/o-fxjbZrdts/s800/TumblrButton_48.jpg',
      },
      
      {
        title:'記事をPocketに保存',
        link:"//getpocket.com/edit?url=" + gPostInfo.url + "&title="  + postTitle,
        iconURL:'//lh4.googleusercontent.com/-BRhOHd48HQ0/VRok_uqDAGI/AAAAAAABAQQ/3rfd8nNHXiA/s800/GetPocketButton_48.jpg',
      },

      {
        title:'記事をLinkedinで共有',
        link:"//www.linkedin.com/shareArticle?mini=true&url=" + gPostInfo.url + "&title="  + postTitle,
        iconURL:'//lh4.googleusercontent.com/-4W5qWmMr9Pg/VRolAne3NxI/AAAAAAABAQE/rMOr8CJ4f9E/s800/LinkedinButton_48.jpg',
      },      
    ];
  }

  //Common Item
  {
    sharePost.push(
      {
        title:'Feedlyで購読',
        link:'//cloud.feedly.com/#subscription%2Ffeed%2Fhttps%3A%2F%2Ffeeds.feedburner.com%2FKledgeb',
        iconURL:'//lh5.googleusercontent.com/-A-iS8Y1ldXY/VRok_nQceLI/AAAAAAABAPk/8fOk3S86kfA/s800/FeedlyButton_48.jpg',
      },

      {
        title:'kledgebのツイート',
        link:'//twitter.com/kledgeb',
        iconURL:'//lh3.googleusercontent.com/-Lgg9NVL_5VE/V0gk7EDruaI/AAAAAAABbK8/6YwX7hT8Lxs_GA1PedODbaj2gFjq_WMMwCCo/s800/kledgeb_Twitter_Button.png',
      }
    );
  }

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
