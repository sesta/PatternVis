pattern_vis.layout = function(){
  d3.selectAll( ".history-line").remove();

  var min_height = 400;
  var base_pos_y = MARGIN.view.top;
  var base_index = 0;
  var size_late = 1;
  var max_height = 600;

  views.forEach( function( view, index ){
    view.pos_x = MARGIN.view.left;
    view.pos_y = base_pos_y;
    var prev_view = views[ index - 1 ];

    if( prev_view && ( index != base_index )){
      view.pos_x = prev_view.pos_x + prev_view.getWidth() + MARGIN.view.space;
    }

    view.svg_height = ( max_height - MARGIN.view.space - MARGIN.view.bottom - MARGIN.view.label ) * size_late;
    view.svg_width = view.svg_height / view.size_aspect;

    if( ( view.pos_x + view.svg_width + MARGIN.view.right) > pattern_vis.area_width ){
      size_late *= pattern_vis.area_width / ( view.pos_x + view.svg_width + MARGIN.view.right + MARGIN.view.space * index );

      for( var i = base_index ; i <= index ; i++ ){
        var view = views[ i ];

        view.pos_x = MARGIN.view.left;
        prev_view = views[ i - 1 ];

        if( prev_view && ( i != base_index ) ){
          view.pos_x = prev_view.pos_x + prev_view.getWidth() + MARGIN.view.space;
        }

        view.svg_height = ( max_height - MARGIN.view.space - MARGIN.view.bottom - MARGIN.view.label ) * size_late;
        view.svg_width = view.svg_height / view.size_aspect;

      }

      if( view.svg_height < min_height ){
        base_pos_y += view.getHeight() + MARGIN.view.space;
        base_index = index + 1;
        size_late = 1;
      }
    }
  } );

  views.forEach( function( view, index ){
    view.$view.css( "top", view.pos_y + "px" );
    view.$view.css( "left", view.pos_x + "px" );
    view.$view.css( "width", view.getWidth() + "px" );
    view.$view.css( "height", view.getHeight() + "px" );
    view.updateSvgSize();

    view[ view.graph_type + "Draw" ]();

    $( "#padding-area" ).css( "top", view.pos_y + view.getHeight() + "px" );
    $( "#view-area" ).css( "height", view.pos_y + view.getHeight() + "px" );
  } );

  pattern_vis.updateAreaSize();
};
