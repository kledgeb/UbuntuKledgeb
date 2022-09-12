/*-- --------------------------------------------------------------------------------
Post Index  
-------------------------------------------------------------------------------- --*/
function setPostThumbnail(divPostThumbnailID,thumbnailURL){
  var imageSize = 180;
  var divElem = $("#" + divPostThumbnailID);
  
  thumbnailURL = getSizedThumbnailURL(thumbnailURL,imageSize);

  divElem.css('background-image','url(' + thumbnailURL + ')');
}

function setPostSummary(divPostBodySummaryID){
  var divElem = $("#" + divPostBodySummaryID);
  var str = divElem.text();
  
  str = adjustPostSummary(str);
  divElem.html(str);
  
  divElem.css('visibility','inherit');
}

