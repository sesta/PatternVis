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

  var data = [];
  this.event_ids.forEach( function( event_id ){
    Feature.get( that.feature_id, event_id ).forEach( function( value ){
      data.push( {
        id: event_id,
        value: value
      } );
    } );
  } );
  x.domain( [ 0, 24 ] );
  y.domain( this.event_ids );

  this.d3_graph.select( ".x.axis" )
    .attr( "transform", "translate(0," + graph_height + ")" )
    .call( xAxis );

  this.d3_graph.select( ".y.axis" )
    .call( yAxis );

  this.d3_graph.selectAll( ".dot" )
    .data( data )
    .enter().append( "circle" )
    .attr( "class", function( d ){ return "dot vis-val event-id-" + d.id;} );

  this.d3_graph.selectAll( ".dot" )
    .attr( "event-id", function( d ){ return d.id; } )
    .attr( "cx", function( d ) { return x( d.value ); } )
    .attr( "cy", function( d ) { return y( d.id ); } )
    .attr( "r", 6 )
    .on( "click", function( d, i ){
      Ui.click_vis_val( d3.select( this ) );
    } );
};
