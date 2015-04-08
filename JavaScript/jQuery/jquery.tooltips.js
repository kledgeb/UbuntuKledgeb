function showToolTip(target,text,autoHideTimeout){
  var tooltip = $('<div id="id_tooltip" class="cls_tooltip"></div>');
 
  tooltip.css('opacity',0).html(text).appendTo('body');
  tooltip.data('targetID',target.attr('id'));
  
  layoutToolTip();
  $(window).resize( layoutToolTip );
  tooltip.on('click',hideToolTip);
  
  if(autoHideTimeout){
    setTimeout(hideToolTip,autoHideTimeout);
  }
}

function layoutToolTip(){
  var tooltip = $('#id_tooltip');
  
  if(tooltip.length){
    var target = $('#' + tooltip.data('targetID'));
    
    if( $( window ).width() < tooltip.outerWidth() * 1.5 ){
      tooltip.css( 'max-width', $( window ).width() / 2 );
    }
    else{
      tooltip.css( 'max-width', 340 );
    }
  
    var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
        pos_top  = target.offset().top - tooltip.outerHeight() - 20;
  
    if( pos_left < 0 ){
      pos_left = target.offset().left + target.outerWidth() / 2 - 20;
      tooltip.addClass( 'left' );
    }else{
      tooltip.removeClass( 'left' );
    }
  
    if(pos_left + tooltip.outerWidth() > $(window).width()){
      pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
      tooltip.addClass( 'right' );
    }
    else{
      tooltip.removeClass( 'right' );
    }
  
    if(pos_top < 0){
      pos_top  = target.offset().top + target.outerHeight();
      tooltip.addClass( 'top' );
    }
    else{
      tooltip.removeClass( 'top' );
    }
  
    tooltip.css( { left: pos_left, top: pos_top } )
           .animate( { top: '+=10', opacity: 1 }, 50 );
  }
}

function hideToolTip(){
  var tooltip = $('#id_tooltip');

  if(tooltip.length){
    tooltip.animate({top:'-=10',opacity:0},50,
      function(){
        tooltip.remove();
      });    
  }
}

