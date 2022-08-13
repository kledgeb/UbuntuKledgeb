/*-- --------------------------------------------------------------------------------
Dash Contents Star
-------------------------------------------------------------------------------- --*/
function setupStarLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_StarLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');
  setupStarLens_PopularPostPost();
}

function setupStarLens_PopularPostPost(){
  var categoryName = 'PopularPost';

  addCategory(categoryName,'人気の記事');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;

  var gPopularPosts = [];
  {
    var anchorPopularPosts = $('#id_divPopularPost .cls_PopularPost_anchorPost');
    var popularPost;

    if(anchorPopularPosts){
      var anchorPopularPost;

      for(i = 0 ; i < anchorPopularPosts.length ; i ++){
        anchorPopularPost = $(anchorPopularPosts[i]);
        popularPost = {};
        popularPost.itemLink = anchorPopularPost.attr('href');
        popularPost.itemIconURL = $(anchorPopularPost.children(':first')).attr('src');
        popularPost.itemTitle = $(anchorPopularPost.children(':eq(1)')).text();
        popularPost.itemSummary = $(anchorPopularPost.children(':eq(2)')).text();

        gPopularPosts.push(popularPost);
      }
    }
  }

  for(i = 0 ; i < gPopularPosts.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:gPopularPosts.length,
      categoryName:categoryName,
      itemLink:gPopularPosts[i].itemLink,
      itemIconURL:gPopularPosts[i].itemIconURL,
      itemTitleHTML:gPopularPosts[i].itemTitle,
      itemData:{popularPostInfo:gPopularPosts[i]},
      hasDetail:true,
      autoEllipsis:true,
   };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);

}

function setupStarContentsDetail(divItem){
  var itemInfo = divItem.data('itemInfo');

  if(itemInfo.categoryName === 'PopularPost'){
    var itemIconURL = null;

    setupContentsDetail_createSectionElement(itemInfo);
    setupContentsDetail_createTitleElement(itemInfo,null);

    if(itemInfo.itemIconURL){
      itemIconURL = getSizedThumbnailURL(itemInfo.itemIconURL,320);
    }

    setupContentsDetail_createThumbnailAndSummary(itemInfo,itemIconURL,$('<p>' + itemInfo.itemData.popularPostInfo.itemSummary + '</p>').text());
    setupContentsDetail_createButtons(itemInfo,null);
  }
}
