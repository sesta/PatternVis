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

    if( ( view.pos_x + view.svg_width + MARGIN.view.right ) > pattern_vis.area_width ){
      size_late *= ( pattern_vis.area_width - MARGIN.view.left - MARGIN.view.right - MARGIN.view.space * ( index - base_index ) ) / ( view.pos_x + view.svg_width - MARGIN.view.left - MARGIN.view.space * ( index - base_index ) );

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

  d3.selectAll( "#layoutview-area .small-view" ).remove();
  var small_late = 240.0 / ( pattern_vis.area_width - MARGIN.view.left + MARGIN.view.top );

  views.forEach( function( view, index ){
    view.$view.css( "top", view.pos_y + "px" );
    view.$view.css( "left", view.pos_x + "px" );
    view.$view.css( "width", view.getWidth() + "px" );
    view.$view.css( "height", view.getHeight() + "px" );
    view.updateSvgSize();

    view[ view.graph_type + "Draw" ]();

    $( "#padding-area" ).css( "top", view.pos_y + view.getHeight() + "px" );
    $( "#view-area" ).css( "height", view.pos_y + view.getHeight() + "px" );

    d3.select( "#layoutview" )
      .attr( "height", ( view.pos_y + view.getHeight() ) * small_late + 220 )
      .append( "rect" )
      .classed( "small-view", true )
      .style( "fill", "none" )
      .style( "stroke", "gray" )
      .style( "stroke-width", "3px" )
      .style( "opacity", "0.6" )
      .attr( "x", ( view.pos_x - MARGIN.view.left + MARGIN.view.top ) * small_late + 5 )
      .attr( "y", view.pos_y * small_late + 5 )
      .attr( "width", view.getWidth() * small_late - 10 )
      .attr( "height", view.getHeight() * small_late - 10 );

    $( "#layoutview-area" )
      .append( $( "<div></div>", {
        "class": "small-view"
      } ).css( {
        "position": "absolute",
        "padding": "10px",
        "left": ( view.pos_x - MARGIN.view.left + MARGIN.view.top ) * small_late + 5,
        "top": view.pos_y * small_late + 5,
        "width": view.getWidth() * small_late - 30,
        "height": view.getHeight() * small_late - 30
      } ).text( view.id + ". " +  view.feature_name )
      .data( "scroll-y", view.pos_y - MARGIN.view.top )
      .on( "click", function(){
        $( ".mdl-layout__content" ).scrollTop(
          $( this ).data( "scroll-y" )
        );
      } ) );
  } );

  pattern_vis.updateAreaSize();
};
