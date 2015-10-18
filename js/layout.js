pattern_vis.layout = function(){
  var min_height = 400;

  views.forEach( function( view, index ){
    view.pos_x = MARGIN.view.left;
    view.pos_y = MARGIN.view.top;
    var prev_view = views[ index - 1 ];

    if( prev_view ){
      view.pos_x = prev_view.pos_x + prev_view.getWidth() + MARGIN.view.space;
      view.pos_y = prev_view.pos_y;
    }

    view.svg_height = min_height - MARGIN.view.space - 50;
    view.svg_width = view.svg_height / view.size_aspect;
  } );

  views.forEach( function( view, index ){
    view.$view.css( "top", view.pos_y + "px" );
    view.$view.css( "left", view.pos_x + "px" );
    view.$view.css( "width", view.getWidth() + "px" );
    view.$svg.css( "height", view.svg_height + "px" );
    view.$svg.css( "width", view.svg_width + "px" );

    view.draw();
  } );
};
