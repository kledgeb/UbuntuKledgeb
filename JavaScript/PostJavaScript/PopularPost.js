/*-- --------------------------------------------------------------------------------
Popular Post  
-------------------------------------------------------------------------------- --*/
function setAllPopularPostThumbnail(){
  var divElems = $('#id_divPopularPost .cls_PopularPost_divThumbnail');
  var imageSize;
  var thumbnailURL;
  var divElem;
  var i;
  
  divElems.each(function() {
    divElem = $(this); 
    
    imageSize = divElem.width() * 2;
    thumbnailURL = divElem.attr('thumbnailURL');
    
    if((thumbnailURL) && (thumbnailURL.length > 0)){
      thumbnailURL = getSizedThumbnailURL(thumbnailURL,imageSize);
      divElem.css('background-image','url(' + thumbnailURL + ')');
    }
  });

  divElems = $('#id_divPopularPost .cls_PopularPost_divRanking');
  
  for(i = 0 ; i < divElems.length ; i ++){
    divElem = $(divElems[i]);
    divElem.text(i + 1);
  }
}

(function(){
  setAllPopularPostThumbnail();
}());

