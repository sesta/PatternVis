pattern_vis.layout = function(){
  d3.selectAll( ".history-line").remove();

  var min_height = 400;
  var base_pos_y = MARGIN.view.top;
  var base_index = 0;
  var size_late = 1;
  var max_height = 600;

  for( var index = 0 ; index < views.length ; index++ ){
    var view = views[ index ];
    var prev_view = views[ index - 1 ];

    if( prev_view == "break_line" )
      prev_view = null;

    if( view == "break_line" ){
      if( prev_view ){
        base_pos_y += prev_view.getHeight() + MARGIN.view.space * 8;
        size_late = 1;
        prev_view = null;
      }

      base_index = index + 1;
      continue;
    }

    if( prev_view && prev_view.svg_height < min_height ){
      base_pos_y += prev_view.getHeight() + MARGIN.view.space;
      base_index = index;
      size_late = 1;
    }

    view.pos_x = MARGIN.view.left;
    view.pos_y = base_pos_y;

    if( prev_view && ( index != base_index )){
      view.pos_x = prev_view.pos_x + prev_view.getWidth() + MARGIN.view.space;
    }

    view.svg_height = ( max_height - MARGIN.view.space - MARGIN.view.bottom - MARGIN.view.label ) * size_late;
    view.svg_width = view.svg_height / view.size_aspect;

    if( ( view.pos_x + view.svg_width + MARGIN.view.right ) > pattern_vis.area_width ){
      size_late *= ( pattern_vis.area_width - MARGIN.view.left - MARGIN.view.right - MARGIN.view.space * ( index - base_index ) )
                   / ( view.pos_x + view.svg_width - MARGIN.view.left - MARGIN.view.space * ( index - base_index ) );

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
    }

    prev_view = view;
  }

  d3.selectAll( ".divide-line" ).remove();

  for( var index = 0 ; index < views.length ; index++ ){
    var view = views[ index ];
    var prev_view = views[ index - 1 ];

    if( prev_view == "break_line" ) prev_view = null;

    if( view == "break_line" ){
      if( prev_view ){
        d3.select( "#effect-area" )
          .append( "line" )
          .classed( "divide-line", true )
          .attr( "x1", MARGIN.view.left + MARGIN.view.space * 4 )
          .attr( "y1", prev_view.pos_y + prev_view.getHeight() + MARGIN.view.space * 4 )
          .attr( "x2", pattern_vis.area_width - MARGIN.view.right - MARGIN.view.space * 4 )
          .attr( "y2", prev_view.pos_y + prev_view.getHeight() + MARGIN.view.space * 4 );
      }

      continue;
    }

    if( view.$view.css( "top" ) == "auto" )
      view.$view.css( "top", base_pos_y + max_height + "px" );

    view.$view.animate( {
      "top": view.pos_y + "px",
      "left": view.pos_x + "px",
      "width": view.getWidth() + "px",
      "height": view.getHeight() + "px"
    } );

    view.updateSvgSize();

    view[ view.graph_type + "Draw" ]();

    $( "#padding-area" ).css( "top", view.pos_y + view.getHeight() + "px" );
    $( "#view-area" ).css( "height", view.pos_y + view.getHeight() + "px" );
  }

  pattern_vis.layoutSmallView();

  pattern_vis.updateAreaSize();
};
