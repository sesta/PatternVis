pattern_vis.layoutSmallView = function(){
  d3.selectAll( "#smallview-area .small-view" ).remove();

  var small_late = 240.0 / ( pattern_vis.area_width - MARGIN.view.left + MARGIN.view.top );
  var small_view_margin = 7;

  for( var index = 0 ; index < views.length ; index++ ){
    var view = views[ index ];
    var prev_view = views[ index - 1 ];

    if( prev_view == "break_line" ) prev_view = null;

    if( view == "break_line" ){
      if( prev_view ){
        d3.select( "#smallview" )
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

    d3.select( "#smallview" )
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

    $( "#smallview-area" )
      .append( $( "<div></div>", {
        "class": "small-view",
        "id": "view-id-" + view.id
      } ).css( {
        "position": "absolute",
        "padding": "10px",
        "left": view_left,
        "top": view_top,
        "width": view.getWidth() * small_late - small_view_margin - 20,
        "height": view.getHeight() * small_late - small_view_margin - 20
      } ).data( "scroll-y", view.pos_y - MARGIN.view.top )
      .on( "click", function(){
        $( ".mdl-layout__content" ).animate( {
          scrollTop: $( this ).data( "scroll-y" )
        } );
      } ) );

    var view_width = view.getWidth() * small_late - small_view_margin * 2 - 4;
    var view_height = view.getHeight() * small_late - small_view_margin * 2 - 4;
    var view_left = ( view.pos_x - MARGIN.view.left + MARGIN.view.top ) * small_late + small_view_margin;
    var view_top = view.pos_y * small_late + small_view_margin;

    var tile_num_y = parseInt( Math.sqrt( view.event_ids.length * view_height / view_width ) + 0.5, 10 );
    var tile_num_x = Math.ceil( view.event_ids.length / tile_num_y );

    var tile_size_x = view_width / tile_num_x;
    var tile_size_y = view_height / tile_num_y;

    var base_i = 0;

    var copy_event_ids = view.event_ids.concat();

    if( view.feature_sort )
      copy_event_ids.sort( function( a, b ){
        var feature_id = view.feature_id;
        var ather_feature_graph_types = [
          "matrix",
          "multi_area",
          "multi_bar",
          "uniq_matrix"
        ];

        if( ather_feature_graph_types.indexOf( view.graph_type ) > -1 )
          feature_id = "event_count";

        var count_a = Feature.get( feature_id, a );
        var count_b = Feature.get( feature_id, b );

        if( count_a > count_b )
          return -1;
        return 1;
      } );

    if( view.type_sort )
      copy_event_ids.sort( function( a, b ){
        if( event_map.type[ a ] > event_map.type[ b ] )
          return -1;
        return 1;
      } );


    copy_event_ids.forEach( function( id, index ){
      $( "#smallview-area" )
        .append( $( "<div></div>", {
          "class": "small-view vis-val view-id-" + view.id + " event-id-" + id,
          "event-id": id,
          "view-id": view.id
        } ).css( {
          "background": event_map.color[ id ],
          "position": "absolute",
          "left": view_left + 3,
          "top": view_top + tile_size_y * base_i + 3,
          "width": tile_size_x - 2,
          "height": tile_size_y - 2,
          "opacity": "0.2"
        } ).on( "mouseover", function(){
          Ui.over_vis_val( $( this ) );
        } ).on( "mouseout", function(){
          Ui.out_vis_val( $( this ) );
        } ) );

      base_i ++;

      if( base_i >= tile_num_y ){
        base_i = 0;
        view_left += tile_size_x;
      }
    } );

    for( history in view.event_history ){
      var from_view = view.event_history[ history ].from_view;
      var from_d3_vis_val = view.event_history[ history ].from_d3_vis_val;

      if( !from_view ) continue;

      if( from_d3_vis_val )
        $( ".small-view.view-id-" + from_view.id + ".event-id-" + from_d3_vis_val.attr( "event-id" ) )
          .css( "opacity", "1" );

      var from_x = ( from_view.pos_x - MARGIN.view.left + MARGIN.view.top + from_view.getWidth() ) * small_late - small_view_margin;
      var from_y = ( from_view.pos_y + from_view.getHeight() ) * small_late - small_view_margin;

      var to_x = ( view.pos_x - MARGIN.view.left + MARGIN.view.top ) * small_late + small_view_margin;
      var to_y = ( view.pos_y ) * small_late + small_view_margin;

      d3.select( "#smallview" )
        .append( "circle" )
        .classed( "small-view", true )
        .attr( "id", "view-id-" + view.id )
        .attr( "cx", from_x )
        .attr( "cy", from_y )
        .attr( "r", 4 );

      d3.select( "#smallview" )
        .append( "circle" )
        .classed( "small-view", true )
        .attr( "id", "view-id-" + view.id )
        .attr( "cx", to_x )
        .attr( "cy", to_y )
        .attr( "r", 4 );

      d3.select( "#smallview" )
        .append( "line" )
        .classed( "small-view", true )
        .attr( "id", "view-id-" + view.id )
        .attr( "x1", from_x )
        .attr( "y1", from_y )
        .attr( "x2", to_x )
        .attr( "y2", to_y );
    }
  }

  $( "#smallview-area" ).selectable( {
    selecting: function( event, ui ){
      $( this ).children( ".ui-selecting.vis-val" )
        .each( function(){
          var from_view = views_map[ $( this ).attr( "view-id" ) ];
          var $selected = from_view.$view.find( "div.event-id-" + $( this ).attr( "event-id" ) );
          Ui.select_vis_val( $selected, from_view );
        } );
    },
    stop: function( event, ui ){
      if( $( this ).children( ".ui-selected.vis-val" ).length == 0 ){
        Ui.cancel_selecting();
      }
    }
  } );

};
