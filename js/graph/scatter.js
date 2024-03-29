pattern_vis.View.prototype.scatterCreate = function(){
  this.size_aspect = 4.0 / this.event_ids.length;
  if( this.size_aspect < 0.5 )
    this.size_aspect = 0.5;
  if( this.size_aspect > 2 )
    this.size_aspect = 2;

  this.d3_svg = d3.select( "#view-" + this.id ).append( "svg" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.d3_graph.append( "g" )
    .attr( "class", "x axis" );

  this.d3_graph.append( "g" )
    .attr( "class", "y axis" );
}

pattern_vis.View.prototype.scatterDraw = function(){
  var self = this;
  var circle_size = 6;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var x = d3.time.scale()
    .range( [ 0, graph_width ] );

  var y = d3.scale.ordinal()
    .rangePoints( [ graph_height, 0 ], 1 );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" )
    .tickFormat( d3.time.format( "%H:%M" ) );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" )
    .tickFormat( function( d ){ return event_map.id[ d ].slice( 0, 3 ) + "..."; } );

  var data = [];
  this.event_ids.forEach( function( event_id ){
    Feature.get( self.feature_id, event_id ).forEach( function( value ){
      data.push( {
        id: event_id,
        value: value
      } );
    } );
  } );

  var copy_event_ids = this.event_ids.concat();

  if( this.feature_sort )
    copy_event_ids.sort( function( a, b ){
      var count_a = Feature.get( self.feature_id, a );
      var count_b = Feature.get( self.feature_id, b );

      if( count_a[ 0 ] > count_b[ 0 ] )
        return -1;
      return 1;
    } );

  if( this.type_sort )
    copy_event_ids.sort( function( a, b ){
      if( event_map.type[ a ] > event_map.type[ b ] )
        return -1;
      return 1;
    } );

  x.domain( [ new Date( 0, 0, 0, 0 ), new Date( 0, 0, 0, 24 ) ] );
  y.domain( copy_event_ids );

  this.d3_graph.select( ".x.axis" )
    .attr( "transform", "translate(0," + graph_height + ")" )
    .call( xAxis );

  this.d3_graph.select( ".y.axis" )
    .call( yAxis );

  this.d3_graph.selectAll( ".dot" )
    .data( data )
    .enter().append( "circle" )
    .attr( "class", function( d ){
      if( self.event_history[ d.id ] )
        self.event_history[ d.id ].to_d3_vis_val = d3.select( this );
      return "dot vis-val event-id-" + d.id;
    } ).attr( "fill", "white" );

  var $selectable_area = self.$view.find( ".selectable-area" );
  $selectable_area.children().remove();

  var val_id = 0;

  this.d3_graph.selectAll( ".dot" ).transition().duration( 500 )
    .delay( function( d, i ){ return i * Ui.animation_time / data.length; } )
    .attr( "event-id", function( d ){ return d.id; } )
    .attr( "fill", function( d ){ return event_map.color[ d.id ]; } )
    .attr( "cx", function( d ) { return x( new Date( 0, 0, 0, d.value ) ); } )
    .attr( "cy", function( d ) { return y( d.id ); } )
    .attr( "center-x", function( d ) { return x( new Date( 0, 0, 0, d.value )  ); } )
    .attr( "center-y", function( d ) { return y( d.id ); } )
    .attr( "r", 6 )
    .each( "end", function( d ){
      var $selectable_div = $( "<div></div>", {
        "event-id": d.id,
        "class": "event-id-" + d.id,
        "center-y": $( this ).attr( "center-y" ),
        "center-x": $( this ).attr( "center-x" ),
        "val-id": val_id,
        "feature-name": self.feature_name,
        "value": d.value
      } ).css( {
        top: ( MARGIN.graph.top + $( this ).attr( "cy" ) * 1.0 - 6 ) + "px",
        left: ( MARGIN.graph.left + $( this ).attr( "cx" ) * 1.0 - 6 ) + "px",
        height: "12px",
        width: "12px",
        "border-radius": "12px",
      } ).on( "mouseover", function(){
        Ui.over_vis_val( $( this ) );
      } ).on( "mouseout", function(){
        Ui.out_vis_val( $( this ) );
        Ui.hiddenDetail();
      } ).on( "mousemove", function( event ){
        Ui.showDetail( $( this ), event );
      } );

      d3.select( this ).classed( "val-id-" + val_id, true );

      val_id++;

        $selectable_area.append( $selectable_div );
    } );

  $selectable_area.selectable( {
    selecting: function( event, ui ){
      $( this ).children( ".ui-selecting:not( .selected )" )
        .each( function(){
          Ui.select_vis_val( $( this ), self );
        } );
    },
    stop: function( event, ui ){
      if( $( this ).children( ".ui-selected" ).length == 0 ){
        Ui.cancel_selecting();
      }
    }
  } );
};
