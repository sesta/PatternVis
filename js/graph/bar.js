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
  var that = this;

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
      if( that.feature_id == "sd_time" )
        return d + "時間";
      return d;
    } );

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
      if( that.event_history[ d.id ] )
        that.event_history[ d.id ].to_d3_vis_val = d3.select( this );
      return "bar vis-val event-id-" + d.id;
    } );

  this.d3_graph.selectAll( ".bar" )
    .attr( "event-id", function( d ){ return d.id; } )
    .attr( "x", function( d ){ return x( d.id ); } )
    .attr( "width", x.rangeBand() )
    .attr( "y", function( d ){ return y( d.value ); } )
    .attr( "height", function( d ){ return graph_height - y( d.value ); } )
    .on( "click", function( d, i ){
      Ui.click_vis_val( d3.select( this ), that );
    } )
    .on( "mouseover", function( d, i ){
      Ui.over_vis_val( d3.select( this ) );
    } )
    .on( "mouseout", function( d, i ){
      Ui.out_vis_val( d3.select( this ) );
    } );
};
