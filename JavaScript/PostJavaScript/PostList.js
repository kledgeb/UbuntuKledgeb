/*-- --------------------------------------------------------------------------------
Post List
-------------------------------------------------------------------------------- --*/
var gPostListInfo = {
  currentPageIndex:0,
  lastPageIndex:0,

  totalPostCount:0,
  postCountPerPage:25,

  pageBoxNum:0,
  totalPageBoxNum:0,

  autoScroll:false,
};


function setupPostListNavi(totalPostCount){
  if(totalPostCount){
    gPostListInfo.totalPostCount = totalPostCount;
    gPostListInfo.pageBoxNum = Math.floor($('#id_divContents').width() / 48) - 2;
    gPostListInfo.totalPageBoxNum = Math.ceil(gPostListInfo.totalPostCount / gPostListInfo.postCountPerPage);
    gPostListInfo.lastPageIndex = gPostListInfo.totalPageBoxNum - 1;

    createPostListPostElement();
  }
  else{
    $('#id_PostList_divPageNaviLoading').css('display','none');
  }
}

function createPostListPostElement(){
  var feedURL = getHomepageURL() + 'feeds/posts/summary?alt=json&max-results=' + gPostListInfo.postCountPerPage +'&start-index=' + ((gPostListInfo.currentPageIndex * gPostListInfo.postCountPerPage) + 1);

  $.ajax(feedURL,{
    success: createPostListPostElementCallback
  });
}

function createPostListPostElementCallback(jsonData){
  var feedEntry = jsonData.feed.entry;
  var divPostListContainer = $('#id_PostList_divPostListContainer');

  if(feedEntry.length){
    var h3PostListPage = $('#id_PostList_h3PostListPage');

    divPostListContainer.empty();
    h3PostListPage.text((gPostListInfo.currentPageIndex + 1) + 'ページ / ' + gPostListInfo.totalPageBoxNum + 'ページ');

    var i;
    var divPost;
    var anchorPost;
    var divPostIndex;
    var divPostThumbnail;
    var divPostTitle;
    var postIndex = (gPostListInfo.currentPageIndex * gPostListInfo.postCountPerPage) + 1;
    var post;

    for(i = 0 ; i < feedEntry.length ; i ++){
      post = feedEntry[i];

      divPost = $('<div>');
      divPost.attr('class','cls_PostList_divPost');

      divPostIndex = $('<div>');
      divPostIndex.attr('class','cls_PostList_divPostIndex');
      divPostIndex.text(i + postIndex);
      divPost.append(divPostIndex);

      anchorPost = $('<a>');
      anchorPost.attr({
        'href':parsePostLink(post.link),
        //'target':'_blank',
        'class':'cls_PostList_anchorPost',
        });
      divPost.append(anchorPost);

      divPostThumbnail = $('<div>');
      divPostThumbnail.attr('class','cls_PostList_divPostThumbnail');
      divPostThumbnail.css('background-image','url("' + parsePostThumbnail(post.media$thumbnail) + '")');
      divPostThumbnail.appendTo(anchorPost);

      divPostTitle = $('<div>');
      divPostTitle.attr('class','cls_PostList_divPostTitle');
      divPostTitle.text(post.title.$t);
      divPostTitle.appendTo(anchorPost);

      anchorPost.append($('<div class="clear"></div>'));
      divPostListContainer.append(divPost);
    }

    createPostListNaviElement();

    if(gPostListInfo.autoScroll){
      var h2PostListTitle = $('#id_PostList_h2PostListTitle');

      $('html,body').animate({scrollTop:h2PostListTitle.offset().top}, 500);
    }
  }
}

function createPostListNaviElement(){
  var startPageIndex;
  var endPageIndex;
  var currentPageBoxNum = 0;
  var anchorPageBox;
  var divPageNaviContainer = $('#id_PostList_divPageNaviContainer');

  {
    var startOffset = Math.ceil(gPostListInfo.pageBoxNum / 2) - 1;

    if(gPostListInfo.currentPageIndex >= startOffset){
      startPageIndex = gPostListInfo.currentPageIndex - startOffset;
    }else{
      startPageIndex = 0;
    }

    endPageIndex = startPageIndex + gPostListInfo.pageBoxNum - 1;

    if(endPageIndex > gPostListInfo.lastPageIndex){
      endPageIndex = gPostListInfo.lastPageIndex;
    }
  }

  currentPageBoxNum = endPageIndex - startPageIndex + 1;
  divPageNaviContainer.children('div[attrPageIndexBox]').remove();

  {
    var divAppendBox = $('#id_PostList_PageBox_divPrev');
    var i;
    var divPageBox;
    var pageIndex;

    for(i = 0 ; i < currentPageBoxNum ; i ++){
      divPageBox = $('<div>');
      anchorPageBox = $('<a>');
      pageIndex = startPageIndex + i;

      divPageBox.attr('class','cls_PostList_divPageBox');
      divPageBox.attr('attrPageIndexBox','');

      anchorPageBox.attr('class','cls_PostList_anchorPageBox cls_DarkButtonAnimation');
      anchorPageBox.attr('href',pageIndex);
      anchorPageBox.text(pageIndex + 1);
      divPageBox.append(anchorPageBox);

      divAppendBox.after(divPageBox);

      if(gPostListInfo.currentPageIndex == pageIndex){
        anchorPageBox.addClass('cls_PostList_anchorPageBox_Current');
      }

      anchorPageBox.on('click',onPostList_anchorPageBox_Click);
      divAppendBox = divPageBox;
    }
  }

  anchorPageBox = $('#id_PostList_anchorPrevBox');

  if(gPostListInfo.currentPageIndex > 0){
    anchorPageBox.attr('href',gPostListInfo.currentPageIndex - 1);
    anchorPageBox.css('visibility','visible');
  }else{
    anchorPageBox.css('visibility','hidden');
  }

  anchorPageBox = $('#id_PostList_anchorNextBox');

  if(gPostListInfo.currentPageIndex < endPageIndex){
    anchorPageBox.attr('href',gPostListInfo.currentPageIndex + 1);
    anchorPageBox.css('visibility','visible');
  }else{
    anchorPageBox.css('visibility','hidden');
  }

  divPageNaviContainer.width(anchorPageBox.outerWidth(true) * (currentPageBoxNum + 2));
}

function onPostList_anchorPageBox_Click(event){
  var anchorPageBox = $(this);
  var pageIndex = parseInt(anchorPageBox.attr('href'),10);

  gPostListInfo.currentPageIndex = pageIndex;
  gPostListInfo.autoScroll = true;
  createPostListPostElement();
  onEventPrevent(event);
}

(function(){
  var anchorPageBox = $('#id_PostList_anchorPrevBox');
  anchorPageBox.on('click',onPostList_anchorPageBox_Click);

  anchorPageBox = $('#id_PostList_anchorNextBox');
  anchorPageBox.on('click',onPostList_anchorPageBox_Click);

  getTotalAllPostCount(setupPostListNavi);
}());

