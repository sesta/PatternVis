pattern_vis.View.prototype.uniq_matrixCreate = function(){
  this.d3_svg = d3.select( "#view-" + this.id ).append( "svg" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.d3_graph.append( "g" )
    .attr( "class", "x axis" );

  this.d3_graph.append( "g" )
    .attr( "class", "y axis" );
}

pattern_vis.View.prototype.uniq_matrixDraw = function(){
  var that = this;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands( [ 0, graph_width ], .2 );

  var y = d3.scale.ordinal()
    .rangeRoundBands( [ graph_height, 0 ], .2 );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" )
    .tickFormat( function( d ){ return event_map.id[ d ].slice( 0, 3 ) + "..."; } );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" )
    .tickFormat( function( d ){ return event_map.id[ d ].slice( 0, 3 ) + "..."; } );

  var data = [];
  this.event_ids.forEach( function( event_id_1 ){
    that.event_ids.forEach( function( event_id_2 ){
      data.push( {
        id_1: event_id_1,
        id_2: event_id_2,
        value: Feature.get( that.feature_id, event_id_1, event_id_2 )
      } );
    } );
  } );
  var max_value = d3.max( data, function( d ){ return d.value; } );

  x.domain( this.event_ids );
  y.domain( this.event_ids );

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

  this.d3_graph.selectAll( ".matrix" )
    .data( data )
    .enter().append( "rect" )
    .attr( "class", function( d ){
      if( that.event_history[ d.id_1 ] && ( d.id_1 == d.id_2 ) )
        that.event_history[ d.id_1 ].to_d3_vis_val = d3.select( this );
      return "matrix vis-val event-id-" + d.id_1 + " event-id-" + d.id_2;
    } );

  this.d3_graph.selectAll( ".matrix" )
    .attr( "event-id", function( d ){ return d.id_1 + "," + d.id_2; } )
    .attr( "x", function( d ) { return x( d.id_1 ); } )
    .attr( "width", x.rangeBand() )
    .attr( "y", function( d ) { return y( d.id_2 ); } )
    .attr( "height", y.rangeBand() )
    .attr( "center-x", function( d ){ return x( d.id_1 ) + x.rangeBand() / 2.0; } )
    .attr( "center-y", function( d ){ return y( d.id_2 ) + y.rangeBand() / 2.0; } )
    .attr( "fill", getGrayScale )
    .on( "click", function( d, i ){
      Ui.click_vis_val( d3.select( this ), that );
    } )
    .on( "mouseover", function( d, i ){
      Ui.over_vis_val( d3.select( this ) );
    } )
    .on( "mouseout", function( d, i ){
      Ui.out_vis_val( d3.select( this ) );
    } );

  function getGrayScale( d ){
    var gray_scale = 255 - parseInt( 255 * d.value / max_value, 10 );
    return "rgb( " + gray_scale + "," + gray_scale + "," + gray_scale + " )";
  }
};
