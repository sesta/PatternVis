pattern_vis.View.prototype.draw = function(){
  var that = this;

  var graph_width = this.svg_width - pattern_vis.graph_margin.left - pattern_vis.graph_margin.right;
  var graph_height = this.svg_height - pattern_vis.graph_margin.top - pattern_vis.graph_margin.bottom;

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

  var graph = d3.select( "#view_" + this.id + " .graph-area" ).append( "svg" )
    .attr( "width", this.svg_width )
    .attr( "height", this.svg_height )
    .append( "g" )
    .attr( "transform", "translate(" + pattern_vis.graph_margin.left + "," + pattern_vis.graph_margin.top + ")");

  data = [];
  this.event_ids.forEach( function( id ){
    data.push( {
      id: id,
      value: features[ that.feature_id ][ id ]
    } );
  } );
  x.domain( this.event_ids );
  y.domain( [ 0, d3.max( data, function(d){ return d.value; } ) ] );

  graph.append( "g" )
    .attr( "class", "x axis" )
    .attr( "transform", "translate(0," + graph_height + ")" )
    .call( xAxis );

  graph.append( "g" )
    .attr( "class", "y axis" )
    .call( yAxis )
    .append( "text" )
    .attr( "transform", "rotate(-90)" )
    .attr( "y", 6 )
    .attr( "dy", ".71em" )
    .style( "text-anchor", "end" );

  graph.selectAll( ".bar" )
    .data( data )
    .enter().append( "rect" )
    .attr( "class", "bar" )
    .attr( "x", function( d ) { return x( d.id ); } )
    .attr( "width", x.rangeBand() )
    .attr( "y", function( d ) { return y( d.value ); } )
    .attr( "height", function( d ) { return graph_height - y( d.value ); } );

  this.d3_graph = graph;
};
