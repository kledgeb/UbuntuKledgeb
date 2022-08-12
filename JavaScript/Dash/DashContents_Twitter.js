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

        twitterContents.data('categoryName',categoryName);
        divContents.append(twitterContents);

        $('<a>')
            .attr('class','twitter-timeline')
            .attr('data-theme','dark')
            .appendTo(twitterContents);

        $('<script>')
            .attr('type','text/javascript')
            .attr('async','async')
            .attr('charset','utf-8')
            .attr('src','https://platform.twitter.com/widgets.js')
            .appendTo(twitterContents);
    }

  }