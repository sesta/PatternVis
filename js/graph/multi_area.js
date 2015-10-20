pattern_vis.View.prototype.multi_areaCreate = function(){
  var that = this;

  this.d3_svg = d3.select( "#view-" + this.id ).append( "svg" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.event_ids.forEach( function( event_id ){
    that.d3_graph.append( "g" )
      .attr( "class", "x axis event-id-" + event_id );

    that.d3_graph.append( "g" )
      .attr( "class", "y axis event-id-" + event_id )
      .append( "text" )
      .attr( "class", "event_name" );

    that.d3_graph.append( "path" )
      .attr( "class", "area vis-val event-id-" + event_id );
  } );
}

pattern_vis.View.prototype.multi_areaDraw = function(){
  var that = this;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var one_graph_height = ( graph_height - MARGIN.graph.space * ( this.event_ids.length - 1 ) )
                            / this.event_ids.length;
  var base_height = 0;

  var x = d3.scale.ordinal()
    .rangePoints( [ 0, graph_width ] );

  var y = d3.scale.linear()
    .range( [ one_graph_height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" );

  this.event_ids.forEach( function( event_id ){
    var data = [];
    features[ that.feature_id ][ event_id ].forEach( function( value, index ){
      data.push( {
        id: index,
        value: value
      } );
    } );

    var area = d3.svg.area()
          .x( function( d ){ return x( d.id ); } )
          .y0( one_graph_height )
          .y1( function( d ){ return y( d.value); } );

    x.domain( d3.range( data.length ) );
    y.domain( [ 0, d3.max( data, function(d){ return d.value; } ) ] );

    that.d3_graph.select( ".x.axis.event-id-" + event_id )
      .attr( "transform", "translate(0," + ( one_graph_height + base_height ) + ")" )
      .call( xAxis );

    that.d3_graph.select( ".y.axis.event-id-" + event_id )
      .attr( "transform", "translate(0," + base_height + ")" )
      .call( yAxis )
      .select( "text" )
      .attr( "transform", "translate( -" + ( MARGIN.graph.left - 20 ) + ", 0 )" )
      .attr( "dy", one_graph_height / 2 )
      .text( event_id );

    that.d3_graph.selectAll( ".area.event-id-" + event_id )
      .datum( data )
      .attr( "transform", "translate(0," + base_height + ")" )
      .attr( "d", area );

    base_height += one_graph_height + MARGIN.graph.space;
  } );
};
