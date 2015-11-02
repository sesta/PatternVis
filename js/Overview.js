pattern_vis.Overview = function(){
  var d3_svg = d3.select( "#overview-area" );

  var d3_graph = d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  d3_graph.append( "g" )
    .attr( "class", "x axis" );

  d3_graph.append( "g" )
    .attr( "class", "y axis" );

  var record_history = [];
  var history_ids = [];

  this.setHistory = function( history_id, event_ids ){
    history_ids.push( history_id );
    if( event_ids.length == 0 ){
      records_history = data.times;
      return;
    }

    event_ids.forEach( function( event_id ){
      data[ event_id ].times.forEach( function( time ){
        records_history.push( {
          id: history_id,
          value: time.date.getTime()
        } );
      } );
    } );
  };

  this.draw = function(){
    var graph_width = $( "body" ).width() - MARGIN.graph.left - MARGIN.graph.right;
    var graph_height = 200 - MARGIN.graph.top - MARGIN.graph.bottom / 2;

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

    y.domain( history_ids.reverse() );
    history_ids.reverse();

    d3_graph.select( ".x.axis" )
      .attr( "transform", "translate(0," + graph_height + ")" )
      .call( xAxis );

    d3_graph.select( ".y.axis" )
      .call( yAxis );

    d3_graph.selectAll( ".dot" )
      .data( records_history )
      .enter().append( "circle" )
      .attr( "class", "dot" );

    d3_graph.selectAll( ".dot" )
      .attr( "cx", function( d ) { return x( d.value ); } )
      .attr( "cy", function( d ) { return y( d.id ); } )
      .attr( "r", 3 );
  };
};
