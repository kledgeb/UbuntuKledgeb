/*-- --------------------------------------------------------------------------------
Dash Lens Page
-------------------------------------------------------------------------------- --*/
function setupPageLensContents(showParams){
  gCurrentLensArrowID = 'id_Dash_PageLens_divArrow';
  $('#' + gCurrentLensArrowID).css('visibility','visible');
  
  $('#id_Dash_inputSearchBox').attr('placeholder','フィルター');

  setupPageLens_GeneralPage();
  setupPageLens_LinuxPage();
  setupPageLens_LinkPage();

  //Option
  addShowHideAllOption();
}

function setupPageLens_GeneralPage(){
  var generalPages = [
    {
      title:'ホーム',
      link:gHomepageURL,
      iconURL:'//lh3.googleusercontent.com/-dfeSJewsfj0/VRWsMAI5ZMI/AAAAAAABAM8/TOByvN2174c/s800/Dash_GeneralPage_Home.png',
    },
    
    {
      title:'システム',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_6364.html'),
      iconURL:'//lh5.googleusercontent.com/-4UCECp4KLSw/VRWsMXCejvI/AAAAAAABANA/2NzrVo0CzTA/s800/Dash_GeneralPage_System.png',
    },
    
    {
      title:'アプリケーション',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_22.html'),
      iconURL:'//lh3.googleusercontent.com/-GHQOVVyIdqA/VRWsLUxEidI/AAAAAAABANE/X3o4JJtsTM0/s800/Dash_GeneralPage_Application.png',
    },

    {
      title:'ハードウェア',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_5799.html'),
      iconURL:'//lh3.googleusercontent.com/-SZMLlV_3LP8/VRWsLXlk2cI/AAAAAAABAM4/ccduUowJlbg/s800/Dash_GeneralPage_Hardware.png',
    },

    {
      title:'掲示板',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_29.html'),
      iconURL:'//lh5.googleusercontent.com/-2KVRaSuRRSU/VRWsLcGiC5I/AAAAAAABANI/cWk6q4yx9kQ/s800/Dash_GeneralPage_Forum.png',
    },

    {
      title:'記事一覧',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-post.html'),
      iconURL:'//lh3.googleusercontent.com/-BckQBsj1H5Q/VRo_qdhnAtI/AAAAAAABARM/Lbg1F9NXb9U/s800/Dash_GeneralPage_PostList.png',
    },
    
    {
      title:'ユーザー設定',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_79.html'),
      iconURL:'//lh3.googleusercontent.com/-nVnvVFsiCMI/VRo_qdqXWhI/AAAAAAABARQ/qxLn5OojHlk/s800/Dash_GeneralPage_UserSettings.png',
    },
  ];

  var categoryName = 'GeneralPage';
  
  addCategory(categoryName,'ホームとページ');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;
  
  for(i = 0 ; i < generalPages.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:generalPages.length,
      categoryName:categoryName,
      itemLink:generalPages[i].link,
      itemIconURL:generalPages[i].iconURL,
      itemTitle:generalPages[i].title,
    };
    
    addCategoryItem(categoryItemInfo);
  }
  
  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);  

}

function setupPageLens_LinuxPage(){
  var linuxDistributionPages = [
    {
      title:'Ubutntu',
      link:adjustURLForMobile(getHomepageURL() + 'p/ubuntu.html'),
      iconURL:'//lh6.googleusercontent.com/-4aFtEDf8IiY/VQJfG1GE5sI/AAAAAAAA_kY/Y4vDYn52uvI/s800/Dash_LinuxDistribution_Ubuntu.png',
    },
    
    {
      title:'Kubuntu',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_6055.html'),
      iconURL:'//lh3.googleusercontent.com/-UgCfHb2phL8/VQJfHpM6MMI/AAAAAAAA_kg/IAsSaKTaqcU/s800/Dash_LinuxDistribution_Kubuntu.png',
    },
    
    {
      title:'Xbutntu',
      link:adjustURLForMobile(getHomepageURL() + 'p/xubuntu_30.html'),
      iconURL:'//lh4.googleusercontent.com/-M8FzJ-2bSL8/VQJfJeEMFvI/AAAAAAAA_k0/kBtKTaE4DXg/s800/Dash_LinuxDistribution_Xubuntu.png',
    },

    {
      title:'Lbutntu',
      link:adjustURLForMobile(getHomepageURL() + 'p/lubuntu.html'),
      iconURL:'//lh3.googleusercontent.com/-nOvv_tUpE6Y/VQJfHmZG7qI/AAAAAAAA_ko/_kgmg-2uOYs/s800/Dash_LinuxDistribution_Lubuntu.png',
    },

    {
      title:'Ubutntu GNOME',
      link:adjustURLForMobile(getHomepageURL() + 'p/ubuntu-gnome.html'),
      iconURL:'//lh5.googleusercontent.com/-nIJSu6ce6Zs/VQJhA0zfL7I/AAAAAAAA_lA/Mi_M3DCMwFE/s800/Dash_LinuxDistribution_UbuntuGNOME.png',
    },

    {
      title:'Ubuntu MATE',
      link:adjustURLForMobile(getHomepageURL() + 'p/ubuntu-mate_15.html'),
      iconURL:'//lh4.googleusercontent.com/-wbzmnyJHuSA/VQJiYEM5i5I/AAAAAAAA_lQ/75LDrUHlIDw/s800/Dash_LinuxDistribution_UbuntuMATE.png',
    },
  ];
  
  var categoryName = 'LinuxDistributionPage';
  
  addCategory(categoryName,'Linux');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;
  
  for(i = 0 ; i < linuxDistributionPages.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:linuxDistributionPages.length,
      categoryName:categoryName,
      itemLink:linuxDistributionPages[i].link,
      itemIconURL:linuxDistributionPages[i].iconURL,
      itemTitle:linuxDistributionPages[i].title,
    };
    
    addCategoryItem(categoryItemInfo);
  }
  
  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);
}

function setupPageLens_LinkPage(){
  var linkPages = [
    {
      title:'日本語のサイト',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_8766.html'),
      iconURL:'//lh5.googleusercontent.com/-PM8U2CK3r_s/VQKeCQeF6DI/AAAAAAAA_ok/LuT94Rmbbis/s800/Dash_LinkPage_Japanese.png',
    },
    
    {
      title:'Ubutntu',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page.html'),
      iconURL:'//lh6.googleusercontent.com/-WBja3TCh1mk/VQKWRqANtHI/AAAAAAAA_mo/93lWJ8ng7GE/s800/Dash_LinkPage_Ubuntu.png',
    },
    
    {
      title:'Kubuntu',
      link:adjustURLForMobile(getHomepageURL() + 'p/kubuntu.html'),
      iconURL:'//lh6.googleusercontent.com/-r2DkZLZDZbU/VQKWRE97tuI/AAAAAAAA_m8/mATRgvdLSuQ/s800/Dash_LinkPage_Kubuntu.png',
    },
    
    {
      title:'Xbutntu',
      link:adjustURLForMobile(getHomepageURL() + 'p/xubuntu.html'),
      iconURL:'//lh3.googleusercontent.com/-DQsTFtorLno/VQKWTEWEcvI/AAAAAAAA_m0/UAAPR1p1RUM/s800/Dash_LinkPage_Xubuntu.png',
    },

    {
      title:'Lbutntu',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_8390.html'),
      iconURL:'//lh3.googleusercontent.com/-A918glrI0lo/VQKWRX6zR5I/AAAAAAAA_mc/ItEropNlgJM/s800/Dash_LinkPage_Lubuntu.png',
    },

    {
      title:'Ubutntu GNOME',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_5437.html'),
      iconURL:'//lh6.googleusercontent.com/-HnaCVWcvwOk/VQKWSN_3V_I/AAAAAAAA_m4/k4vVEX4dgsA/s800/Dash_LinkPage_UbuntuGNOME.png',
    },

    {
      title:'Ubutntu MATE',
      link:adjustURLForMobile(getHomepageURL() + 'p/ubuntu-mate.html'),
      iconURL:'//lh3.googleusercontent.com/-Rqj_HCZZTZQ/VQKWSkvmTcI/AAAAAAAA_mw/Tg-vq3NCP6k/s800/Dash_LinkPage_UbuntuMATE.png',
    },

    {
      title:'ソフトウェア',
      link:adjustURLForMobile(getHomepageURL() + 'p/blog-page_320.html'),
      iconURL:'//lh3.googleusercontent.com/-OkZbFHMo-xk/VQKeCb8nUkI/AAAAAAAA_oo/agx_bukiYBU/s800/Dash_LinkPage_Software.png',
    },
  ];
  
  var categoryName = 'LinkPage';
  
  addCategory(categoryName,'リンク');

  var divCategoryContents = $('#id_Dash_Category_Contents_div' + categoryName);
  var i;
  var categoryItemInfo;
  
  for(i = 0 ; i < linkPages.length ; i ++){
    categoryItemInfo = {
      itemIndex:i,
      itemTotalCount:linkPages.length,
      categoryName:categoryName,
      itemLink:linkPages[i].link,
      itemIconURL:linkPages[i].iconURL,
      itemTitle:linkPages[i].title,
    };

    addCategoryItem(categoryItemInfo);
  }
  
  divCategoryContents.append("<div class='clear'></div>");
  layoutCategoryHead(categoryName);  
}

function setupPageContentsDetail(divItem){

}

