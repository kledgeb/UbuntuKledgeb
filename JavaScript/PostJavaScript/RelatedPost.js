/*-- --------------------------------------------------------------------------------
Related Post
-------------------------------------------------------------------------------- --*/

function onRelatedPostOuterAppear(){
  setupRelatedPost();
}

function setupRelatedPost(labels){
  var divRelatedPostContainer = $('#id_divRelatedPostContainer');
  var divRelatedPostNaviPrev = $('#id_divRelatedPostNaviPrev');
  var divRelatedPostNaviNext = $('#id_divRelatedPostNaviNext');

  divRelatedPostNaviPrev.on('click',onRelatedPostNaviPrevClick);
  divRelatedPostNaviNext.on('click',onRelatedPostNaviNextClick);

  divRelatedPostNaviPrev.tooltipster({trigger:'custom',timer:3000});
  divRelatedPostNaviNext.tooltipster({trigger:'custom',timer:3000});

  divRelatedPostContainer.data('postIndex',1);
  divRelatedPostContainer.data('prevPostIndex',1);
  divRelatedPostContainer.data('postCountPerPage',10);

  if(!labels){
    labels = gRelatedPostLabels;
  }

  divRelatedPostContainer.data('labels',labels);

  getRelatedPost(divRelatedPostContainer.data('labels'),createRelatedPostElement,
    {
      startIndex:divRelatedPostContainer.data('postIndex'),
      maxResults:divRelatedPostContainer.data('postCountPerPage')
    });
}

function onRelatedPostNaviPrevClick(){
  var divRelatedPostContainer = $('#id_divRelatedPostContainer');
  var postIndex = divRelatedPostContainer.data('postIndex');
  var postCountPerPage = divRelatedPostContainer.data('postCountPerPage');
  var prevPostIndex = divRelatedPostContainer.data('prevPostIndex');

  if(postIndex == 1){
    var divTooltipButton = $(this);

    divTooltipButton.tooltipster('content', '関連記事が見つかりませんでした。');
    divTooltipButton.tooltipster('show');
  }else{
    postIndex -= postCountPerPage;

    if(postIndex < 1){
      postIndex = 1;
    }

    divRelatedPostContainer.data('prevPostIndex',divRelatedPostContainer.data('postIndex'));
    divRelatedPostContainer.data('postIndex',postIndex);
    getRelatedPost(divRelatedPostContainer.data('labels'),createRelatedPostElement,
      {
        startIndex:divRelatedPostContainer.data('postIndex'),
        maxResults:divRelatedPostContainer.data('postCountPerPage')
      },{
        scrollToAnchor:true
      });
  }
}

function onRelatedPostNaviNextClick(){
  var divRelatedPostContainer = $('#id_divRelatedPostContainer');
  var postIndex = divRelatedPostContainer.data('postIndex');
  var postCountPerPage = divRelatedPostContainer.data('postCountPerPage');

  divRelatedPostContainer.data('prevPostIndex',postIndex);

  postIndex += postCountPerPage;

  divRelatedPostContainer.data('postIndex',postIndex);
  getRelatedPost(divRelatedPostContainer.data('labels'),createRelatedPostElement,
    {
      startIndex:divRelatedPostContainer.data('postIndex'),
      maxResults:divRelatedPostContainer.data('postCountPerPage')
    },{
      scrollToAnchor:true
    });
}

function createRelatedPostElement(relatedPosts,userData){
  var divRelatedPostContainer = $('#id_divRelatedPostContainer');
  var post;
  var postDIV;
  var divPostIndex;
  var postAnchor;
  var postThumbnailDIV;
  var postTitleDIV;
  var i;
  var postIndex = divRelatedPostContainer.data('postIndex');
  var divLoading = $('#id_RelatedPost_divLoading');

  if(relatedPosts.length){
    //Show
    divLoading.css('display','block');
    divRelatedPostContainer.css('visibility','hidden');

    divRelatedPostContainer.mCustomScrollbar('destroy');
    divRelatedPostContainer.empty();

    for (i = 0 ; i < relatedPosts.length ; i ++) {
      post = relatedPosts[i];
      postDIV = $('<div>');
      divPostIndex = $('<div>');
      postAnchor = $('<a>');
      postThumbnailDIV = $('<div>');
      postTitleDIV = $('<div>');

      postDIV.attr('class','cls_RelatedPost_divPost');

      divPostIndex.attr('class','cls_RelatedPost_divPostIndex');
      divPostIndex.text(i + postIndex);
      postDIV.append(divPostIndex);

      postAnchor.attr({
        'href':parsePostLink(post.link),
        //'target':'_blank',
        'class':'cls_RelatedPost_anchorPost',
        });

      postDIV.append(postAnchor);

      postThumbnailDIV.attr('class','cls_divRelatedPostThumbnail');
      postThumbnailDIV.css('background-image','url("' + parsePostThumbnail(post.media$thumbnail) + '")');
      postThumbnailDIV.appendTo(postAnchor);

      postTitleDIV.attr('class','cls_divRelatedPostTitle');
      postTitleDIV.text(post.title.$t);
      postTitleDIV.appendTo(postAnchor);

      postAnchor.append($('<div class="clear"></div>'));

      divRelatedPostContainer.append(postDIV);
    }
  }else{
    var divTooltipButton;

    if(postIndex > 1){
      divRelatedPostContainer.data('postIndex',divRelatedPostContainer.data('prevPostIndex'));
    }

    if(postIndex == 1){
      divTooltipButton = $('#id_divRelatedPostNaviPrev');
    }else{
      divTooltipButton = $('#id_divRelatedPostNaviNext');
    }

    divTooltipButton.tooltipster('content', '関連記事が見つかりませんでした。');
    divTooltipButton.tooltipster('show');
  }

  //Show
  divLoading.css('display','none');
  divRelatedPostContainer.css('visibility','visible');

  {
    divRelatedPostContainer.mCustomScrollbar({
      theme:'minimal-dark',
      autoHideScrollbar:true,
      scrollInertia:300,
      mouseWheel:{ preventDefault: true }
    });
  }


  if((relatedPosts.length) && (userData) && (userData.scrollToAnchor === true)){
    var divRelatedPostTitle = $('#id_divRelatedPostWidgetTitle');
    $('html,body').animate({scrollTop:divRelatedPostTitle.offset().top}, 500);
  }
}

var relatedPostDataCallback = function(callbackData) {
  return function(jsonData) {
    callbackData['relatedPostData'].push(jsonData);
    callbackData['processedLabelCount'] ++;

    if(callbackData['processedLabelCount'] >= callbackData['totalLabelCount']){
      callbackData['successCallback'](setupRelatedPosts(callbackData['relatedPostData']),callbackData.userData);
    }
  };
};

function getRelatedPost(labels,successCallback,params,userData){
  var feedURLBasis = getHomepageURL() + 'feeds/posts/summary/-/';
  var feedURLParams = '?alt=json';
  var feedURL;
  var i;
  var relatedPostData = [];
  var callbackData = {relatedPostData:relatedPostData,totalLabelCount:labels.length,processedLabelCount:0,successCallback:successCallback,userData:userData};
  var paramValue;

  if(params){
    var key;

    for(key in params) {
      paramValue = params[key];

      if(key == 'maxResults'){
        key = 'max-results';
      }

      if(key == 'startIndex'){
        key = 'start-index';
      }

      feedURLParams += '&' + key + '=' + paramValue;
    }
  }else{
    feedURLParams += '&max-results=10';
  }

  for (i = 0 ; i < labels.length ; i ++) {
    feedURL = feedURLBasis + encodeURIComponent(labels[i]) + feedURLParams;

    $.ajax(feedURL,{
      success: relatedPostDataCallback(callbackData)
    });
  }
}

function setupRelatedPosts(relatedPostData){
  var i;
  var j;
  var entry;
  var postID;
  var postLink;
  var postPublished;
  var mapPostID = {};
  var relatedPosts = [];

  for (i = 0 ; i < relatedPostData.length ; i ++) {
    if(relatedPostData[i].feed.entry){
      for (j = 0 ; j < relatedPostData[i].feed.entry.length ; j ++) {
        entry = relatedPostData[i].feed.entry[j];
        postID = parsePostID(entry.id.$t);
        postLink = parsePostLink(entry.link);
        postPublished = entry.published.$t;

        if((postID === null) || (postLink === null) || (!postPublished)){
          continue;
        }

        if(!(postID in mapPostID)){
          relatedPosts.push(entry);
          mapPostID[postID] = true;
        }
      }
    }
  }

  relatedPosts.sort(relatedPostsCompare);

  return relatedPosts;
}


