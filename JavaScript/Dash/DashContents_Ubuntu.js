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
      title:'Ubuntu 25.04',
      date:'2025年4月17日',
      link:adjustURLForMobile(getHomepageURL() + '2025/01/ubuntu-2504-1-ubuntu-2504-ubuntu-2504.html'),
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
      title:'Ubuntu 20.04.6 LTS',
      date:'2025年5月までサポート（5年）',
      link:adjustURLForMobile(getHomepageURL() + '2023/03/ubuntu-2004-251-ubuntu-20046-lts.html'),
    },

    {
      title:'Ubuntu 22.04.5 LTS',
      date:'2027年6月までサポート（5年）',
      link:adjustURLForMobile(getHomepageURL() + '2025/01/ubuntu-2204-372-ubuntu-22045-lts.html'),
    },

    {
      title:'Ubuntu 24.04.2 LTS',
      date:'2029年6月までサポート（5年）',
      link:adjustURLForMobile(getHomepageURL() + '2025/02/ubuntu-2404-55-ubuntu-24042-lts.html'),
    },

    {
      title:'Ubuntu 24.10',
      date:'2025年7月までサポート（9ヶ月）',
      link:adjustURLForMobile(getHomepageURL() + '2025/01/ubuntu-2410-21-ubuntu-2410.html'),
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
