/*-- --------------------------------------------------------------------------------
Disqua  
-------------------------------------------------------------------------------- --*/

var disqusRecentMessageCallback = function(callbackData) {
  return function(html) {
    var messageInfos = [];
    var startPrefix = '<ul class="dsq-widget-list">';
    var startIndex = html.indexOf(startPrefix);
    var endIndex = html.lastIndexOf('</ul>');
    
    if((startIndex !== -1) && (endIndex !== -1)){
      var htmlListString = html.substring(startIndex + startPrefix.length,endIndex);
      var htmlListObject = $(htmlListString);
      var messageLists = htmlListObject.children('li');
      
      messageInfos = createMessageInfos(messageLists);      
      callbackData['successCallback'](messageInfos,callbackData['userData']);
    }else{
      callbackData['successCallback'](messageInfos,callbackData['userData']);
    }
  };
};
/*
function getDisqusRecentMessage(forumName,messageNum,avatarSize,messageLength,successCallback,userData){
  var disqusURL;
  var callbackData = {successCallback:successCallback,userData:userData};

  disqusURL = 'http://' + forumName + '.disqus.com/recent_comments_widget.js?';
  disqusURL += 'num_items=' + messageNum;
  disqusURL += '&amp;hide_avatars=0&amp;avatar_size=' + avatarSize;
  disqusURL += '&amp;excerpt_length=' + messageLength;

  $.ajax(disqusURL,{
    //success: disqusRecentMessageCallback(callbackData),
    dataType:'jsonp',
     jsonp: false, 
     jsonpCallback: disqusRecentMessageCallback(callbackData)
  });
}*/

function getDisqusRecentMessage(divID){
  var div = $('#' + divID);
  var ul = div.children('ul:first');
  var messageInfos = [];
  
  if(ul.length){
    var messageLists = ul.children('li[class="dsq-widget-item"]');
    
    messageInfos = createMessageInfos(messageLists);
  }
  
  return messageInfos;
}

function createMessageInfos(messageLists){
  var messageInfos = [];
  var i;
  var message;
  var messageInfo;
  var element;
  var elements;
  
  for(i = 0 ; i < messageLists.length ; i ++){
    messageInfo = {};
    message = $(messageLists[i]);

    element = message.children('a:first');
    
    if(element.length){
      //Avator
      {
        element = $(message.children('a:first')[0]);
        messageInfo['userURL'] = element.attr('href');
        
        element = $(element.children('img:first')[0]);
        messageInfo['userIcon'] = element.attr('src');
      }
      
      //User name
      {
        element = $(message.children('a:nth-child(2)')[0]);
        messageInfo['userName'] = element.text();
      }
    }else{
      element = $(message.children('img:first')[0]);
      messageInfo['userIcon'] = element.attr('src');
      
      messageInfo['userName'] = message.clone()
                                      .children()
                                      .remove()
                                      .end()
                                      .text();
    }
    
    //Message
    {
      element =  $(message.children('span:first')[0]);
      messageInfo['message'] = element.text();
    }
    
    //Post Link
    {
      element = $(message.children('p:first')[0]);
      elements = element.children('a');
      
      element = $(elements[0]);
      
      messageInfo['postLink'] = element.attr('href');
      messageInfo['postTitle'] = element.text();

      element = $(elements[1]);

      messageInfo['postCommentLink'] = element.attr('href');
      messageInfo['postCommentTime'] = element.text();
    }
    
    messageInfos.push(messageInfo);
  }  
  
  return messageInfos;
}

function parseDisqusCommentDate(date){
  
  if(date){
    if(date.indexOf(' months ago') !== -1){
      date = date.replace(' months ago','ヶ月前');
    }else if(date.indexOf(' month ago') !== -1){
      date = date.replace(' month ago','ヶ月前');
    }
  }
  
  return date;
}
