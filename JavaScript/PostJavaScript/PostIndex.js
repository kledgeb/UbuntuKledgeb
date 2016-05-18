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
  
  /*
  var height = divElem.height();
  var lineHeight = parseInt(divElem.css('line-height'),10);
  var lineNum = Math.floor(height / lineHeight);
  
  height = lineNum * lineHeight + 1;
  */
  
  divElem.css('visibility','visible');
}

