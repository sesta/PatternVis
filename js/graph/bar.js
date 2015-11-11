pattern_vis.View.prototype.barCreate = function(){
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

pattern_vis.View.prototype.barDraw = function(){
  var self = this;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands( [ 0, graph_width ], .2 );

  var y = d3.scale.linear()
    .range( [ graph_height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" )
    .tickFormat( function( d ){ return event_map.id[ d ].slice( 0, 3 ) + "..."; } );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" )
    .tickFormat( function( d ){
      if( self.feature_id == "sd_time" )
        return d + "h";
      return d;
    } );

  var data = [];
  this.event_ids.forEach( function( event_id ){
    data.push( {
      id: event_id,
      value: Feature.get( self.feature_id, event_id )
    } );
  } );

  var copy_event_ids = this.event_ids.concat();

  if( this.feature_sort )
    copy_event_ids.sort( function( a, b ){
      var count_a = Feature.get( self.feature_id, a );
      var count_b = Feature.get( self.feature_id, b );

      if( count_a > count_b )
        return -1;
      return 1;
    } );

  x.domain( copy_event_ids );
  y.domain( [ 0, d3.max( data, function( d ){ return d.value; } ) ] );

  this.d3_graph.select( ".x.axis" )
    .attr( "transform", "translate(0," + graph_height + ")" )
    .call( xAxis )
    .selectAll( "text" )
    .style( "text-anchor", "end" )
    .attr( "dx", "-.8em" )
    .attr( "dy", ".15em" )
    .attr( "transform", "rotate(-65)" );

  this.d3_graph.select( ".y.axis" )
    .call( yAxis );

  this.d3_graph.selectAll( ".bar" )
    .data( data )
    .enter().append( "rect" )
    .attr( "class", function( d ){
      if( self.event_history[ d.id ] )
        self.event_history[ d.id ].to_d3_vis_val = d3.select( this );
      return "bar vis-val event-id-" + d.id;
    } );

  this.d3_graph.selectAll( ".bar" )
    .attr( "event-id", function( d ){ return d.id; } )
    .attr( "x", function( d ){ return x( d.id ); } )
    .attr( "width", x.rangeBand() )
    .attr( "y", function( d ){ return y( d.value ); } )
    .attr( "height", function( d ){ return graph_height - y( d.value ); } )
    .attr( "center-x", function( d ){ return x( d.id ) + x.rangeBand() / 2.0; } )
    .attr( "center-y", function( d ){ return y( d.value ) + ( graph_height - y( d.value ) ) / 2.0; } )
    .on( "click", function( d, i ){
      Ui.click_vis_val( d3.select( this ), self );
    } )
    .on( "mouseover", function( d, i ){
      Ui.over_vis_val( d3.select( this ) );
    } )
    .on( "mouseout", function( d, i ){
      Ui.out_vis_val( d3.select( this ) );
    } );

  var $selectable_area = self.$view.find( ".selectable-area" );
  $selectable_area.children().remove();

  var val_id = 0;
  this.d3_graph.selectAll( ".vis-val" ).each( function( d ){
    var $selectable_div = $( "<div></div>", {
      "event-id": d.id,
      "class": "event-id-" + d.id,
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
    selecting: function( event, ui ){
      $( this ).children( ".ui-selecting" )
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
