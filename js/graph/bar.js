pattern_vis.View.prototype.barCreate = function(){
  this.size_aspect = 4.0 / this.event_ids.length;

  this.d3_svg = d3.select( "#view-" + this.id ).append( "svg" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.d3_graph.append( "g" )
    .attr( "class", "x axis" );

  this.d3_graph.append( "g" )
    .attr( "class", "y axis" );
}

pattern_vis.View.prototype.barDraw = function(){
  var that = this;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands( [ 0, graph_width ], .2 );

  var y = d3.scale.linear()
    .range( [ graph_height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" );

  var data = [];
  this.event_ids.forEach( function( event_id ){
    data.push( {
      id: event_id,
      value: Feature.get( that.feature_id, event_id )
    } );
  } );

  x.domain( this.event_ids );
  y.domain( [ 0, d3.max( data, function(d){ return d.value; } ) ] );

  this.d3_graph.select( ".x.axis" )
    .attr( "transform", "translate(0," + graph_height + ")" )
    .call( xAxis );

  this.d3_graph.select( ".y.axis" )
    .call( yAxis );

  this.d3_graph.selectAll( ".bar" )
    .data( data )
    .enter().append( "rect" )
    .attr( "class", function( d ){ return "bar vis-val event-id-" + d.id;} );

  this.d3_graph.selectAll( ".bar" )
    .attr( "event-id", function( d ){ return d.id; } )
    .attr( "x", function( d ){ return x( d.id ); } )
    .attr( "width", x.rangeBand() )
    .attr( "y", function( d ){ return y( d.value ); } )
    .attr( "height", function( d ){ return graph_height - y( d.value ); } )
    .on( "click", function( d, i ){
      Ui.click_vis_val( d3.select( this ) );
    } );
};
