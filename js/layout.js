pattern_vis.layout = function(){
  pattern_vis.views.forEach( function( view, index ){
    view.pos_x = 0;
    view.pos_y = 0;
    var prev_view = pattern_vis.views[ index - 1 ];

    if( prev_view ){
      view.pos_x = prev_view.pos_x + prev_view.getWidth();
      view.pos_y = prev_view.pos_y;
    }

    view.$view.css( "top", view.pos_y );
    view.$view.css( "left", view.pos_x );

    view.draw();
  } );
};
