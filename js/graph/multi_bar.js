pattern_vis.View.prototype.multi_barCreate = function(){
  var self = this;

  this.d3_svg = d3.select( "#view-" + this.id ).append( "svg" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.d3_graph.append( "g" )
      .attr( "class", "x axis" );

  this.event_ids.forEach( function( event_id ){
    self.d3_graph.append( "g" )
      .attr( "class", "y axis event-id-" + event_id )
      .append( "text" )
      .attr( "class", "event_name" );
  } );
}

pattern_vis.View.prototype.multi_barDraw = function(){
  var self = this;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var one_graph_height = ( graph_height - MARGIN.graph.space * ( this.event_ids.length - 1 ) )
                            / this.event_ids.length;
  var base_height = 0;

  var x = d3.scale.ordinal()
    .rangeRoundBands( [ 0, graph_width ] );

  var y = d3.scale.linear()
    .range( [ one_graph_height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" )
    .tickFormat( function( d ){
      if( ( d % 4 ) != 0 )
        return "";
      return d * setting.sampling_interval / ( 1000 * 60 * 60 * 24 ) + "day";
    } );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" )
    .tickFormat( "" );

  var copy_event_ids = this.event_ids.concat();

  if( this.feature_sort )
    copy_event_ids.sort( function( a, b ){
      var count_a = Feature.get( "event_count", a );
      var count_b = Feature.get( "event_count", b );

      if( count_a > count_b ) return -1;
      return 1;
    } );

  if( this.type_sort )
    copy_event_ids.sort( function( a, b ){
      if( event_map.type[ a ] > event_map.type[ b ] )
        return -1;
      return 1;
    } );

  copy_event_ids.forEach( function( event_id ){
    var data = [];
    Feature.get( self.feature_id, event_id ).forEach( function( value, index ){
      data.push( {
        id: index,
        value: value,
        event_id: event_id
      } );
    } );

    x.domain( d3.range( data.length ) );
    y.domain( [ 0, d3.max( data, function(d){ return d.value; } ) ] );

    self.d3_graph.select( ".x.axis" )
      .attr( "transform", "translate(0," + graph_height + ")" )
      .call( xAxis );

    self.d3_graph.select( ".y.axis.event-id-" + event_id )
      .attr( "transform", "translate(0," + base_height + ")" )
      .call( yAxis )
      .select( "text" )
      .attr( "transform", "translate( -" + ( MARGIN.graph.left - 20 ) + ", 0 )" )
      .attr( "dy", one_graph_height / 2 )
      .text( event_map.id[ event_id ].slice( 0, 3 ) + "..."  );

    self.d3_graph.selectAll( ".bar.event-id-" + event_id )
      .data( data )
      .enter().append( "rect" )
      .attr( "class", function( d ){
        if( self.event_history[ event_id ] && ( d.id == parseInt( setting.sampling_num / 10, 10 ) ) )
          self.event_history[ event_id ].to_d3_vis_val = d3.select( this );
        return "bar vis-val event-id-" + event_id;
      });

    self.d3_graph.selectAll( ".bar.event-id-" + event_id )
      .attr( "event-id", event_id )
      .attr( "fill", function( d ){ return event_map.color[ event_id ]; } )
      .attr( "x", function( d ) { return x( d.id ); } )
      .attr( "width", x.rangeBand() )
      .attr( "y", function( d ) { return y( d.value ) + base_height; } )
      .attr( "height", function( d ) { return one_graph_height - y( d.value ); } )
      .attr( "center-x", function( d ){ return x( d.id ) + x.rangeBand() / 2.0; } )
      .attr( "center-y", function( d ){ return y( d.value ) + base_height + ( one_graph_height - y( d.value ) ) / 2.0; } )
      .on( "click", function( d, i ){
        Ui.click_vis_val( d3.select( this ), self );
      } )
      .on( "mouseover", function( d, i ){
        Ui.over_vis_val( d3.select( this ) );
      } )
      .on( "mouseout", function( d, i ){
        Ui.out_vis_val( d3.select( this ) );
      } );

    base_height += one_graph_height + MARGIN.graph.space;
  } );

  var $selectable_area = self.$view.find( ".selectable-area" );
  $selectable_area.children().remove();

  var val_id = 0;
  this.d3_graph.selectAll( ".vis-val" ).each( function( d ){
    var $selectable_div = $( "<div></div>", {
      "event-id": d.event_id,
      "class": "event-id-" + d.event_id,
      "center-y": $( this ).attr( "center-y" ),
      "center-x": $( this ).attr( "center-x" ),
      "val-id": val_id
    } ).css( {
        top: ( MARGIN.graph.top + $( this ).attr( "y" ) * 1.0 ) + "px",
        left: ( MARGIN.graph.left + $( this ).attr( "x" ) * 1.0 ) + "px",
        height: $( this ).attr( "height" ) + "px",
        width: $( this ).attr( "width" ) + "px"
      } ).on( "mouseover", function(){
        Ui.over_vis_val( $( this ) );
      } ).on( "mouseout", function(){
        Ui.out_vis_val( $( this ) );
      } );

    d3.select( this ).classed( "val-id-" + val_id, true );

    val_id++;

    $selectable_area.append( $selectable_div );
  } );

  $selectable_area.selectable( {
    stop: function( event, ui ){
      $( this ).children( ".ui-selected" )
        .each( function(){
          Ui.select_vis_val( $( this ), self );
        } );
      if( $( this ).children( ".ui-selected" ).length == 0 ){
        Ui.cancel_selecting();
      }
    }
  } );
};
