pattern_vis.layoutSmallView = function(){
  d3.selectAll( "#layoutview-area .small-view" ).remove();

  var small_late = 240.0 / ( pattern_vis.area_width - MARGIN.view.left + MARGIN.view.top );
  var small_view_margin = 7;

  for( var index = 0 ; index < views.length ; index++ ){
    var view = views[ index ];
    var prev_view = views[ index - 1 ];

    if( prev_view == "break_line" ) prev_view = null;

    if( view == "break_line" ){
      if( prev_view ){
        d3.select( "#layoutview" )
          .append( "line" )
          .classed( "divide-line", true )
          .attr( "stroke", "black" )
          .attr( "x1", ( MARGIN.view.top + MARGIN.view.space * 4 ) * small_late )
          .attr( "y1", ( prev_view.pos_y + prev_view.getHeight() + MARGIN.view.space * 4 ) * small_late )
          .attr( "x2", ( pattern_vis.area_width - MARGIN.view.left - MARGIN.view.right - MARGIN.view.space * 4 ) * small_late )
          .attr( "y2", ( prev_view.pos_y + prev_view.getHeight() + MARGIN.view.space * 4 ) * small_late );
      }

      continue;
    }

    d3.select( "#layoutview" )
      .attr( "height", ( view.pos_y + view.getHeight() ) * small_late + 220 )
      .append( "rect" )
      .classed( "small-view", true )
      .style( "fill", "none" )
      .style( "stroke", "gray" )
      .style( "stroke-width", "3px" )
      .style( "opacity", "0.6" )
      .attr( "id", "view-id-" + view.id )
      .attr( "x", ( view.pos_x - MARGIN.view.left + MARGIN.view.top ) * small_late + small_view_margin )
      .attr( "y", view.pos_y * small_late + small_view_margin )
      .attr( "width", view.getWidth() * small_late - small_view_margin * 2 )
      .attr( "height", view.getHeight() * small_late - small_view_margin * 2 );

    $( "#layoutview-area" )
      .append( $( "<div></div>", {
        "class": "small-view",
        "id": "view-id-" + view.id
      } ).css( {
        "position": "absolute",
        "padding": "10px",
        "left": ( view.pos_x - MARGIN.view.left + MARGIN.view.top ) * small_late + small_view_margin,
        "top": view.pos_y * small_late + small_view_margin,
        "width": view.getWidth() * small_late - small_view_margin - 20,
        "height": view.getHeight() * small_late - small_view_margin - 20
      } ).text( view.id + ". " +  view.feature_name )
      .data( "scroll-y", view.pos_y - MARGIN.view.top )
      .on( "click", function(){
        $( ".mdl-layout__content" ).animate( {
          scrollTop: $( this ).data( "scroll-y" )
        } );
      } ) );

    for( history in view.event_history ){
      var from_view = view.event_history[ history ].from_view;

      if( !from_view ) continue;

      var from_x = ( from_view.pos_x - MARGIN.view.left + MARGIN.view.top + from_view.getWidth() ) * small_late - small_view_margin;
      var from_y = ( from_view.pos_y + from_view.getHeight() ) * small_late - small_view_margin;

      var to_x = ( view.pos_x - MARGIN.view.left + MARGIN.view.top ) * small_late + small_view_margin;
      var to_y = ( view.pos_y ) * small_late + small_view_margin;

      d3.select( "#layoutview" )
        .append( "circle" )
        .classed( "small-view", true )
        .attr( "id", "view-id-" + view.id )
        .attr( "cx", from_x )
        .attr( "cy", from_y )
        .attr( "r", 4 );

      d3.select( "#layoutview" )
        .append( "circle" )
        .classed( "small-view", true )
        .attr( "id", "view-id-" + view.id )
        .attr( "cx", to_x )
        .attr( "cy", to_y )
        .attr( "r", 4 );

      d3.select( "#layoutview" )
        .append( "line" )
        .classed( "small-view", true )
        .attr( "id", "view-id-" + view.id )
        .attr( "x1", from_x )
        .attr( "y1", from_y )
        .attr( "x2", to_x )
        .attr( "y2", to_y );
    }
  }
};
