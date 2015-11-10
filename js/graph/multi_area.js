pattern_vis.View.prototype.multi_areaCreate = function(){
  var self = this;

  this.d3_svg = d3.select( "#view-" + this.id ).append( "svg" );

  this.d3_graph = this.d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  this.d3_graph.append( "g" )
    .attr( "class", "x axis" );

  this.event_ids.forEach( function( event_id ){
    self.d3_graph.append( "g" )
      .attr( "class", "y axis event-id-" + event_id )
      .append( "text" )
      .attr( "class", "event_name" );

    var d3_vis_val = self.d3_graph.append( "path" )
      .attr( "event-id", event_id )
      .attr( "class", "area vis-val event-id-" + event_id )
      .on( "click", function( d, i ){
        Ui.click_vis_val( d3.select( this ), self );
      } )
      .on( "mouseover", function( d, i ){
        Ui.over_vis_val( d3.select( this ) );
      } )
      .on( "mouseout", function( d, i ){
        Ui.out_vis_val( d3.select( this ) );
      } );

    if( self.event_history[ event_id ] )
      self.event_history[ event_id ].to_d3_vis_val = d3_vis_val;
  } );
}

pattern_vis.View.prototype.multi_areaDraw = function(){
  var self = this;

  var graph_width = this.svg_width - MARGIN.graph.left - MARGIN.graph.right;
  var graph_height = this.svg_height - MARGIN.graph.top - MARGIN.graph.bottom;

  var one_graph_height = graph_height / this.event_ids.length;
  var base_height = 0;

  var x = d3.time.scale()
    .range( [ 0, graph_width ] );

  var y = d3.scale.linear()
    .range( [ one_graph_height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" )
    .tickFormat( d3.time.format( "%H:%M" ) );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" )
    .tickFormat( "" );

  this.event_ids.forEach( function( event_id ){
    var data = [];
    Feature.get( self.feature_id, event_id ).forEach( function( value, index ){
      data.push( {
        id: index,
        value: value,
        event_id: event_id
      } );
    } );

    var area = d3.svg.area()
          .x( function( d ){ return x( new Date( 0, 0, 0, d.id ) ); } )
          .y0( one_graph_height )
          .y1( function( d ){ return y( d.value ); } );

    x.domain( [ new Date( 0, 0, 0, 0 ), new Date( 0, 0, 0, 24 ) ] );
    y.domain( [ 0, d3.max( data, function(d){ return d.value; } ) ] );

    self.d3_graph.select( ".x.axis" )
      .attr( "transform", "translate(0," + graph_height + ")" )
      .call( xAxis );

    self.d3_graph.select( ".y.axis.event-id-" + event_id )
      .attr( "transform", "translate(0," + base_height + ")" )
      .call( yAxis )
      .select( "text" )
      .attr( "transform", "translate( -" + ( MARGIN.graph.left - 20 ) + ", 0 )" )
      .attr( "dy", one_graph_height / 2 )
      .text( event_map.id[ event_id ].slice( 0, 3 ) + "..." );

    self.d3_graph.selectAll( ".area.event-id-" + event_id )
      .datum( data )
      .attr( "transform", "translate(0," + base_height + ")" )
      .attr( "d", area )
      .attr( "center-x", function( d ){ return graph_width / 2.0; } )
      .attr( "center-y", function( d ){ return base_height + one_graph_height / 2.0; } );

    base_height += one_graph_height;
  } );

  var $selectable_area = self.$view.find( ".selectable-area" );
  $selectable_area.children().remove();

  var val_id = 0;
  this.d3_graph.selectAll( ".vis-val" ).each( function( d ){
    var $selectable_div = $( "<div></div>", {
      "event-id": d[0].event_id,
      "class": "area event-id-" + d[0].event_id,
      "center-y": $( this ).attr( "center-y" ),
      "center-x": $( this ).attr( "center-x" ),
      "val-id": val_id
    } ).css( {
        top: ( MARGIN.graph.top + $( this ).attr( "center-y" ) * 1.0 ) + "px",
        left:  MARGIN.graph.left + "px",
        height: ( one_graph_height / 3 ) + "px",
        width: graph_width + "px"
      } ).on( "mouseover", function(){
        Ui.over_vis_val( $( this ) );
      } ).on( "mouseout", function(){
        Ui.out_vis_val( $( this ) );
      } );

    d3.select( this ).classed( "val-id-" + val_id, true );

    val_id++;

    $selectable_area.append( $selectable_div );
  } );

  $selectable_area.selectable( {
    selecting: function( event, ui ){
      $( this ).children( ".ui-selecting" )
        .each( function(){
          Ui.select_vis_val( $( this ), self );
        } );
    },
    stop: function( event, ui ){
      if( $( this ).children( ".ui-selected" ).length == 0 ){
        Ui.cancel_selecting();
      }
    }
  } );
};
