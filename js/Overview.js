pattern_vis.Overview = function(){
  this.d3_svg = d3.select( "#overview-area" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.d3_graph.append( "g" )
    .attr( "class", "x axis" );

  this.d3_graph.append( "g" )
    .attr( "class", "y axis" );

  this.draw = function( times ){
    var graph_width = $( "body" ).width() - MARGIN.graph.left - MARGIN.graph.right;
    var graph_height = 200 - MARGIN.graph.top - MARGIN.graph.bottom;

    var x = d3.scale.linear()
      .range( [ 0, graph_width ] );

    var y = d3.scale.ordinal()
      .rangePoints( [ graph_height, 0 ], 1 );

    var xAxis = d3.svg.axis()
      .scale( x )
      .orient( "bottom" );

    var yAxis = d3.svg.axis()
      .scale( y )
      .orient( "left" );

    x.domain( [
      setting.time.start.getTime(),
      setting.time.end.getTime()
    ] );
    y.domain( [ 0 ] );

    this.d3_graph.select( ".x.axis" )
      .attr( "transform", "translate(0," + graph_height + ")" )
      .call( xAxis );

    this.d3_graph.select( ".y.axis" )
      .call( yAxis );

    this.d3_graph.selectAll( ".dot" )
      .data( data.times )
      .enter().append( "circle" )
      .attr( "class", function( d ){
        return "dot vis-val event-id-" + d.id;
      } );

    this.d3_graph.selectAll( ".dot" )
      .attr( "cx", function( d ) { return x( d ); } )
      .attr( "cy", function( d ) { return y( 0 ); } )
      .attr( "r", 6 );
  };
};
