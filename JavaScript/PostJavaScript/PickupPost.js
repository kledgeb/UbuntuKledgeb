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
      getLatestPostByIndex(getRandomInt(1,totalPostCount),1,createPickupPostElement);
    }    
  }
}

function createPickupPostElement(posts){
  if(posts){
    var divPickupPosts = $('#id_divPickupPosts');
    var divPickupPost;
    var divPickupPostAnchor;
    var divPickupPostThumbnail;
    var divPickupPostTitle;

    divPickupPost = $('<div/>');
    divPickupPostAnchor = $('<a/>');
    divPickupPostThumbnail = $('<div/>');
    divPickupPostTitle = $('<div/>');
        
    divPickupPost.attr('class','cls_PickupPost_divPickupPost');
    divPickupPostAnchor.attr('class','cls_PickupPost_anchorPickupPost');
    divPickupPostThumbnail.attr('class','cls_PickupPost_divPickupPostThumbnail');
    divPickupPostTitle.attr('class','cls_PickupPost_divPickupPostTitle');

    divPickupPostAnchor.attr('href',parsePostLink(latestPosts[i].link));
    divPickupPostThumbnail.css('background-image','url(' + parsePostThumbnail(posts[i].media$thumbnail) + ')');
    divPickupPostTitle.text(posts[0].title.$t);    

    divPickupPostAnchor.append(divPickupPostThumbnail);
    divPickupPostAnchor.append(divPickupPostTitle);
    divPickupPost.append(divPickupPostAnchor);
    divPickupPosts.append(divPickupPost);
    divPickupPost.hover(onHoverIn_AnimateAnchorPost,onHoverOut_AnimateAnchorPost);
  }
}