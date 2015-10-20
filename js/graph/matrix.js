pattern_vis.View.prototype.matrixCreate = function(){
  this.d3_svg = d3.select( "#view-" + this.id ).append( "svg" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.d3_graph.append( "g" )
    .attr( "class", "x axis" );

  this.d3_graph.append( "g" )
    .attr( "class", "y axis" );
}

pattern_vis.View.prototype.matrixDraw = function(){
  var that = this;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands( [ 0, graph_width ], .2 );

  var y = d3.scale.ordinal()
    .rangeRoundBands( [ graph_height, 0 ], .2 );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" );

  var data = [];
  this.event_ids.forEach( function( event_id_1 ){
    that.event_ids.forEach( function( event_id_2 ){
      data.push( {
        id_1: event_id_1,
        id_2: event_id_2,
        value: features[ that.feature_id ][ event_id_1 ][ event_id_2 ]
      } );
    } );
  } );
  var max_value = d3.max( data, function( d ){ return d.value; } );

  x.domain( this.event_ids );
  y.domain( this.event_ids );

  this.d3_graph.select( ".x.axis" )
    .attr( "transform", "translate(0," + graph_height + ")" )
    .call( xAxis );

  this.d3_graph.select( ".y.axis" )
    .call( yAxis );

  this.d3_graph.selectAll( ".bar" )
    .data( data )
    .enter().append( "rect" )
    .attr( "class", "bar" );

  this.d3_graph.selectAll( ".bar" )
    .attr( "x", function( d ) { return x( d.id_1 ); } )
    .attr( "width", x.rangeBand() )
    .attr( "y", function( d ) { return y( d.id_2 ); } )
    .attr( "height", y.rangeBand() )
    .attr( "fill", getGrayScale );

  function getGrayScale( d ){
    var gray_scale = 255 - parseInt( 255 * d.value / max_value, 10 );
    return "rgb( " + gray_scale + "," + gray_scale + "," + gray_scale + " )";
  }
};
