/*-- --------------------------------------------------------------------------------
Dash Lens Ubuntu
-------------------------------------------------------------------------------- --*/
function setupUbuntuLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_UbuntuLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');

  setupUbuntuLens_SupportedVersion();
  setupUbuntuLens_ReleaseSchedule();

  //Option
  addShowHideAllOption();
}

function setupUbuntuLens_ReleaseSchedule(){
  var releaseSchedules = [

    {
      title:'Ubuntu 23.04',
      date:'2023年4月20日',
      link:adjustURLForMobile(getHomepageURL() + '2022/03/ubuntu-2304-1-ubuntu-2304.html'),
    },

  ];

  var categoryName = 'ReleaseSchedule';

  addCategory(categoryName,'リリーススケジュール');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var itemTitle;
  var itemIconURL;
  var categoryItemInfo;

  for(i = 0 ; i < releaseSchedules.length ; i ++){
    itemTitle = releaseSchedules[i].title + '<br>' + releaseSchedules[i].date;

    if(releaseSchedules[i].stage){
      itemIconURL = '//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuLogo_WhiteOrange.svg';
    }else{
      itemIconURL = '//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuLogo_OrangeWhite.svg';
    }

    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:releaseSchedules.length,
      categoryName:categoryName,
      itemLink:releaseSchedules[i].link,
      itemIconURL:itemIconURL,
      itemTitleHTML:itemTitle,
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupUbuntuLens_SupportedVersion(){
  var supportedVersions = [

    {
      title:'Ubuntu 18.04.5 LTS',
      date:'2023年4月までサポート（5年）',
      link:adjustURLForMobile(getHomepageURL() + '2020/08/ubuntu-1804-406-ubuntu-18045-lts.html'),
    },

    {
      title:'Ubuntu 20.04.6 LTS',
      date:'2025年4月までサポート（5年）',
      link:adjustURLForMobile(getHomepageURL() + '2023/03/ubuntu-2004-251-ubuntu-20046-lts.html'),
    },

    {
      title:'Ubuntu 22.04.2 LTS',
      date:'2027年4月までサポート（5年）',
      link:adjustURLForMobile(getHomepageURL() + '2023/02/ubuntu-2204-357-ubuntu-22042-lts.html'),
    },

    {
      title:'Ubuntu 22.10',
      date:'2023年7月までサポート（9ヶ月）',
      link:adjustURLForMobile(getHomepageURL() + '2022/10/ubuntu-2210-20-ubuntu-2210.html'),
    },
  ];

  var categoryName = 'SupportedVersion';

  addCategory(categoryName,'サポート中のバージョン');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var itemTitle;
  var itemIconURL;
  var categoryItemInfo;

  for(i = 0 ; i < supportedVersions.length ; i ++){
    itemTitle = supportedVersions[i].title + '<br>' + supportedVersions[i].date;
    itemIconURL = '//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuLogo_OrangeWhite.svg';

    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:supportedVersions.length,
      categoryName:categoryName,
      itemLink:supportedVersions[i].link,
      itemIconURL:itemIconURL,
      itemTitleHTML:itemTitle,
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupUbuntuContentsDetail(divItem){

}
