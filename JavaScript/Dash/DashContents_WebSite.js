/*-- --------------------------------------------------------------------------------
Dash Lens WebSite
-------------------------------------------------------------------------------- --*/
function setupWebSiteLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_WebSiteLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');

  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');

  setupWebSiteLens_LinuxDistribution();
}

function setupWebSiteLens_LinuxDistribution(){
  var linuxDistributionWebSite = [
    {
      title:'Ubuntu',
      link:'https://ubuntu.com/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuLogo_OrangeWhite.svg',
    },

    {
      title:'Ubuntu 日本語 Remix',
      link:'https://www.ubuntulinux.jp/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuLogo_OrangeWhite.svg',
    },

    {
      title:'Kubuntu',
      link:'https://kubuntu.org/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Kubuntu_Logo.svg',
    },

    {
      title:'Xubuntu',
      link:'https://xubuntu.org/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Xubuntu_Logo.svg',
    },

    {
      title:'Lubuntu',
      link:'https://lubuntu.me/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/Lubuntu_Logo.svg',
    },

    {
      title:'Ubuntu Studio',
      link:'https://ubuntustudio.org/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuStudio_Logo.svg',
    },

    {
      title:'Ubuntu MATE',
      link:'https://ubuntu-mate.org/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuMATE_Logo.svg',
    },

    {
      title:'Ubuntu Budgie',
      link:'https://ubuntubudgie.org/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuBudgie_Logo.svg',
    },

    {
      title:'Ubuntu Unity',
      link:'https://ubuntuunity.org/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuUnity_Logo.png',
    },

    {
      title:'Ubuntu Cinnamon',
      link:'https://ubuntucinnamon.org/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuCinnamon_Logo.png',
    },

    {
      title:'Linux Mint',
      link:'https://linuxmint.com/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/LinuxMint_Logo.svg',
    },

    {
      title:'Ubuntu Touch',
      link:'https://ubuntu-touch.io/',
      iconURL:'//kledgeb.github.io/UbuntuKledgeb/Image/UbuntuTouch_Logo.png',
    },
  ];

  var categoryName = 'LinuxDistributionWebSite';

  addCategory(categoryName,'Linuxディストリビューション');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;

  for(i = 0 ; i < linuxDistributionWebSite.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:linuxDistributionWebSite.length,
      categoryName:categoryName,
      itemLink:linuxDistributionWebSite[i].link,
      itemIconURL:linuxDistributionWebSite[i].iconURL,
      itemTitle:linuxDistributionWebSite[i].title,
    };

    addCategoryItem(categoryItemInfo);
  }

  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);

}

function setupWebSiteContentsDetail(divItem){

}

