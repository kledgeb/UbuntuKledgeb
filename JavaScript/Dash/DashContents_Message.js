/*-- --------------------------------------------------------------------------------
Dash Contents Star
-------------------------------------------------------------------------------- --*/
function setupMessageLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_MessageLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');

  setupMessageLens_CommentList();
  setupMessageLens_ForumList();

  //Option
  addShowHideAllOption();
}


function setupMessageLens_CommentList(){
  var categoryName = 'PostCommnetList';
  addCategory(categoryName,'コメント一覧');
  
  var messageInfos = getDisqusRecentMessage('id_Dash_MessageLens_divDisqusPostRecentComment');
  setupMessageLens_CreateMessageElement(messageInfos,categoryName);
}

function setupMessageLens_ForumList(){
  var categoryName = 'ForumCommnetList';
  addCategory(categoryName,'メッセージ一覧');
  
  var messageInfos = getDisqusRecentMessage('id_Dash_MessageLens_divDisqusForumRecentComment');
  setupMessageLens_CreateMessageElement(messageInfos,categoryName);
}

function setupMessageLens_CreateMessageElement(messageInfos,categoryName){
  var i;
  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var messageInfo;
  var categoryItemInfo;
  var itemIconURL;
  
  for(i = 0 ; i < messageInfos.length ; i ++){
    messageInfo = messageInfos[i];
    
    if((messageInfos[i].userIcon.indexOf('/288/6469/avatar92.jpg') !== -1) || (messageInfos[i].userIcon.indexOf('/303/5312/avatar92.jpg') !== -1)){
      itemIconURL = '//lh5.googleusercontent.com/-CBezBCTG5nM/VQQFkjz2KlI/AAAAAAAA_qM/RB7jrnSyKYg/s800/Dash_Message_Message.png';
    }else{
      itemIconURL = messageInfos[i].userIcon;
    }

    categoryItemInfo = {
        itemIndex:i,
        itemTotalCount:messageInfos.length,
        categoryName:categoryName,
        itemLink:messageInfos[i].postCommentLink,
        itemIconURL:itemIconURL,
        itemTitle:messageInfos[i].message,
        hasDetail:true,
        itemData:{messageInfo:messageInfos[i]},
        autoEllipsis:true,
     };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupMessageContentsDetail(divItem){
  var itemInfo = divItem.data('itemInfo');

  setupContentsDetail_createSectionElement(itemInfo);
  setupContentsDetail_createTitleElement(itemInfo,itemInfo.itemData.messageInfo.postTitle);

  var divCenterSection = $('#id_DashContentsDetail_divCenterSection');

  {
    var divCommentInfoContainer = $('<div/>');
    
    //CommentInfoContainer
    {
      divCommentInfoContainer.attr('class','cls_DashContentsDetail_divCommentInfoContainer cls_DashContentsDetail_' + itemInfo.categoryName + '_divCommentInfoContainer');
      divCenterSection.append(divCommentInfoContainer);
    }

    //CommentDate
    {
      var divCommentDate = $('<div/>');
      var divCommentDateContainer = $('<div/>');

      divCommentDateContainer.attr('class','cls_DashContentsDetail_divCommentDateContainer cls_DashContentsDetail_' + itemInfo.categoryName + '_divCommentDateContainer');
      divCommentDate.attr('class','cls_DashContentsDetail_divCommentDate cls_DashContentsDetail_' + itemInfo.categoryName + '_divCommentDate');
      divCommentDate.text(parseDisqusCommentDate(itemInfo.itemData.messageInfo.postCommentTime));

      divCommentDateContainer.append(divCommentDate);
      divCommentInfoContainer.append(divCommentDateContainer);
    }
    
    //UserInfo
    {
      var divUserInfoContainer = $('<div/>');
      var anchorUserName = $('<a/>');
    
      {        
        divUserInfoContainer.attr('class','cls_DashContentsDetail_divCommentUserInfoContainer cls_DashContentsDetail_' + itemInfo.categoryName + '_divCommentUserInfoContainer');
  
        anchorUserName.attr('class','cls_DashContentsDetail_anchorCommentUserName cls_DashContentsDetail_' + itemInfo.categoryName + '_anchorCommentUserName');
        
        if(itemInfo.itemData.messageInfo.userURL){
          anchorUserName.attr('href',itemInfo.itemData.messageInfo.userURL);
        }else{
          //anchorUserName.attr('href','javascript:void(0);');
        }
        
        anchorUserName.text(itemInfo.itemData.messageInfo.userName);
      }

      {
        var divUserIcon = $('<div/>');
  
        divUserIcon.attr('class','cls_DashContentsDetail_divCommentUserIcon cls_DashContentsDetail_' + itemInfo.categoryName + '_divCommentUserIcon');
        divUserIcon.css('background-image','url("' + itemInfo.itemIconURL + '")');
        anchorUserName.append(divUserIcon);
        
        divUserInfoContainer.append(anchorUserName);
      }
      
      divCommentInfoContainer.append(divUserInfoContainer);
    }

    divCommentInfoContainer.append("<div class='clear'></div>");
  }
  
  //Message
  {
    var divCommentMessage = $('<div/>');

    divCommentMessage.attr('class','cls_DashContentsDetail_divCommentMessage cls_DashContentsDetail_' + itemInfo.categoryName + '_divCommentMessage');
    divCommentMessage.text(itemInfo.itemData.messageInfo.message);
    
    divCenterSection.append(divCommentMessage);
  }
  
  setupContentsDetail_createButtons(itemInfo);
}
