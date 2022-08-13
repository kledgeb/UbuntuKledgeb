/*-- --------------------------------------------------------------------------------
Pickup Post
-------------------------------------------------------------------------------- --*/

function onPickupPostsAppear(){
  getTotalAllPostCount(createPickupPostElements);
}

function createPickupPostElements(totalPostCount){
  if(totalPostCount){
    var i;

    for(i = 1 ; i <= 10 ; i ++){
      getLatestPostByIndex(getRandomInt(1,100),1,createPickupPostElement);
    }
  }

   //Show
  $('#id_PickupPosts_divLoading').css('display','none');
  $('#id_divPickupPosts').css('display','block');
}

function createPickupPostElement(posts){
  if(posts){
    var divPickupPosts = $('#id_divPickupPosts');
    var divPickupPost;
    var divPickupPostAnchor;
    var divPickupPostThumbnail;
    var divPickupPostTitle;

    divPickupPost = $('<div>');
    divPickupPostAnchor = $('<a>');
    divPickupPostThumbnail = $('<div>');
    divPickupPostTitle = $('<div>');

    divPickupPost.attr('class','cls_PickupPost_divPickupPost');
    divPickupPostAnchor.attr('class','cls_PickupPost_anchorPickupPost');
    divPickupPostThumbnail.attr('class','cls_PickupPost_divPickupPostThumbnail');
    divPickupPostTitle.attr('class','cls_PickupPost_divPickupPostTitle');

    divPickupPostAnchor.attr('href',parsePostLink(posts[0].link));
    divPickupPostThumbnail.css('background-image','url(' + parsePostThumbnail(posts[0].media$thumbnail) + ')');
    divPickupPostTitle.text(posts[0].title.$t);

    divPickupPostAnchor.append(divPickupPostThumbnail);
    divPickupPostAnchor.append(divPickupPostTitle);
    divPickupPostAnchor.append("<div class='clear'></div>");
    divPickupPost.append(divPickupPostAnchor);
    divPickupPost.append("<div class='cls_PickupPost_Separate'></div>");
    divPickupPosts.append(divPickupPost);
  }
}
