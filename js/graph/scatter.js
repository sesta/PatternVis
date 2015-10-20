pattern_vis.View.prototype.scatterCreate = function(){
  this.size_aspect = 4.0 / this.event_ids.length;

  this.d3_svg = d3.select( "#view-" + this.id ).append( "svg" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.d3_graph.append( "g" )
    .attr( "class", "x axis" );

  this.d3_graph.append( "g" )
    .attr( "class", "y axis" );
}

pattern_vis.View.prototype.scatterDraw = function(){
  var that = this;
  var circle_size = 6;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var x = d3.scale.ordinal()
    .rangePoints( [ 0, graph_width ], 1 );

  var y = d3.scale.linear()
    .range( [ graph_height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" );

  var data = [];
  this.event_ids.forEach( function( id ){
    data.push( {
      id: id,
      value: Feature[ that.feature_id ][ id ]
    } );
  } );
  x.domain( this.event_ids );
  y.domain( [ 0, d3.max( data, function(d){ return d.value; } ) ] );

  this.d3_graph.select( ".x.axis" )
    .attr( "transform", "translate(0," + graph_height + ")" )
    .call( xAxis );

  this.d3_graph.select( ".y.axis" )
    .call( yAxis );

  this.d3_graph.selectAll( ".dot" )
    .data( data )
    .enter().append( "circle" )
    .attr( "class", "dot vis-val" );

  this.d3_graph.selectAll( ".dot" )
    .attr( "cx", function( d ) { return x( d.id ); } )
    .attr( "cy", function( d ) { return y( d.value ); } )
    .attr( "r", 6 );
};
