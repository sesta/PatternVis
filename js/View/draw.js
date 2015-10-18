pattern_vis.View.prototype.draw = function(){
  var that = this;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands( [ 0, graph_width ], .05 );

  var y = d3.scale.linear()
    .range( [ graph_height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" );

  data = [];
  this.event_ids.forEach( function( id ){
    data.push( {
      id: id,
      value: features[ that.feature_id ][ id ]
    } );
  } );
  x.domain( this.event_ids );
  y.domain( [ 0, d3.max( data, function(d){ return d.value; } ) ] );

  this.d3_graph.select( ".x.axis" )
    .attr( "transform", "translate(0," + graph_height + ")" )
    .call( xAxis );

  this.d3_graph.select( ".y.axis" )
    .call( yAxis )
    .select( "text" )
    .attr( "transform", "rotate(-90)" )
    .attr( "y", 6 )
    .attr( "dy", ".71em" )
    .style( "text-anchor", "end" );

  this.d3_graph.selectAll( ".bar" )
    .data( data )
    .enter().append( "rect" )
    .attr( "class", "bar" );

  this.d3_graph.selectAll( ".bar" )
    .attr( "x", function( d ) { return x( d.id ); } )
    .attr( "width", x.rangeBand() )
    .attr( "y", function( d ) { return y( d.value ); } )
    .attr( "height", function( d ) { return graph_height - y( d.value ); } );
};
