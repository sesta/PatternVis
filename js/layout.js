pattern_vis.layout = function(){
  var min_height = 400;

  pattern_vis.views.forEach( function( view, index ){
    view.pos_x = pattern_vis.view_margin.top;
    view.pos_y = pattern_vis.view_margin.top;
    var prev_view = pattern_vis.views[ index - 1 ];

    if( prev_view ){
      view.pos_x = prev_view.pos_x + prev_view.getWidth() + pattern_vis.view_margin.space;
      view.pos_y = prev_view.pos_y;
    }

    view.svg_height = min_height - pattern_vis.view_margin.space - 50;
    view.svg_width = view.svg_height / view.size_aspect;
  } );

  pattern_vis.views.forEach( function( view, index ){
    view.$view.css( "top", view.pos_y + "px" );
    view.$view.css( "left", view.pos_x + "px" );
    view.$view.css( "width", view.getWidth() + "px" );
    view.$svg.css( "height", view.svg_height + "px" );
    view.$svg.css( "width", view.svg_width + "px" );

    view.draw();
  } );
};
