/*-- --------------------------------------------------------------------------------
Dash Lens Twitter
-------------------------------------------------------------------------------- --*/
function setupTwitterLensContents(showParams){
    gCurrentLensArrowID = 'id_Dash_TwitterLens_divArrow';
    $('#' + gCurrentLensArrowID).css('visibility','visible');

    $('#id_Dash_inputSearchBox').attr('placeholder','Twitterで検索');

    {
        var divContents = $('#id_Dash_divContents');
        var twitterContents;
        var categoryName = 'Twitter';

        twitterContents = $('<div>');
        twitterContents.attr('id','id_Dash_Category_div' + categoryName);
        twitterContents.attr('class','cls_Dash_Category_div' + categoryName);

        divContents.append(twitterContents);

        $('<a>')
            .attr('id','id_TwitterTimelineAnchor')
            .attr('class','twitter-timeline')
            .attr('data-theme','dark')
            .attr('data-width','50%')
            .attr('data-height','98%')
            .attr('data-chrome','transparent noheader nofooter noborders')
            .attr('href','https://twitter.com/kledgeb?ref_src=twsrc%5Etfw')
            .appendTo(twitterContents);

        $.getScript('https://platform.twitter.com/widgets.js',function(data,textStatus,jqxhr){

        });
    }
  }

  function searchDashContents_Twitter(searchText,byTimer){
    if((byTimer === false) && (searchText)){
        var param = encodeURIComponent(searchText);

        window.open('https://twitter.com/search?q=' + param, '_blank').focus();
    }
  }
