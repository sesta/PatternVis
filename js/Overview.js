pattern_vis.Overview = function(){
  var d3_svg = d3.select( "#overview-area" );

  var d3_graph = d3_svg.append( "g" )
    .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

  d3_graph.append( "g" )
    .attr( "class", "x axis" );

  d3_graph.append( "g" )
    .attr( "class", "y axis" );

  var records_history = [];
  var history_ids = [];

  this.setHistory = function( history_id, event_ids ){
    history_ids.push( history_id );
    var records = [];

    if( event_ids.length == 0 ){
      records = data.times;
    }

    event_ids.forEach( function( event_id ){
      data[ event_id ].times.forEach( function( time ){
        records.push( {
          id: history_id,
          value: time.date,
          event_ids: [ event_id ]
        } );
      } );
    } );

    records.sort( function( a, b ){
      if( a.value < b.value ) return -1;
      return 1;
    } );

    var last_date = new Date( 0 );
    records.forEach( function( record ){
      if( Math.abs( record.value - last_date ) > ( 6 * 60 * 60 * 1000 ) ){
        records_history.push( record );
        last_date = record.value;
      }else{
        records_history[ records_history.length - 1 ].event_ids.push( record.event_ids[ 0 ] );
      }
    } );
  };

  this.draw = function(){
    var graph_width = $( "body" ).width() - MARGIN.graph.left - MARGIN.graph.right;
    var graph_height = 200 - MARGIN.graph.top - MARGIN.graph.bottom / 2;

    var x = d3.time.scale()
      .range( [ 0, graph_width ] );

    var y = d3.scale.ordinal()
      .rangePoints( [ graph_height, 0 ], 1 );

    var xAxis = d3.svg.axis()
      .scale( x )
      .orient( "bottom" )
      .tickFormat( d3.time.format( "%m/%d" ) );

    var yAxis = d3.svg.axis()
      .scale( y )
      .orient( "left" );

    x.domain( [
      setting.time.start,
      setting.time.end
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
      .attr( "class", function( d ) {
        var class_string = "dot vis-val"
        d.event_ids.forEach( function( id ){
          class_string += " event-id-" + id;
        } );
        return  class_string;
      } )
      .attr( "event-id", function( d ){ return d.event_ids.toString(); } )
      .on( "mouseover", function( d, i ){
        Ui.over_vis_val( d3.select( this ) );
      } )
      .on( "mouseout", function( d, i ){
        Ui.out_vis_val( d3.select( this ) );
      } );

    d3_graph.selectAll( ".dot" )
      .attr( "cx", function( d ) { return x( d.value ); } )
      .attr( "cy", function( d ) { return y( d.id ); } )
      .attr( "r", 3 );

   var $selectable_area = $( "#overview-area" ).next( ".selectable-area" );
    $selectable_area.children().remove();

   d3_graph.selectAll( ".vis-val" ).each( function( d ){
     var event_id_class_string = "";
     d.event_ids.forEach( function( id ){
       event_id_class_string += " event-id-" + id;
     } );

     var $selectable_div = $( "<div></div>", {
       "event-id": d.event_ids.toString(),
       "class": event_id_class_string,
       "center-y": $( this ).attr( "cy" ),
       "center-x": $( this ).attr( "cx" ),
       } ).css( {
         top: ( MARGIN.graph.top + $( this ).attr( "cy" ) * 1.0 - 5 ) + "px",
         left: ( MARGIN.graph.left + $( this ).attr( "cx" ) * 1.0 - 3 ) + "px",
         height: "6px",
         width: "6px",
         "border-radius": "12px"
       } ).on( "mouseover", function(){
         Ui.over_vis_val( $( this ) );
       } ).on( "mouseout", function(){
         Ui.out_vis_val( $( this ) );
       } );

     $selectable_area.append( $selectable_div );
   } );

   $selectable_area.selectable( {
     selecting: function( event, ui ){
       $( this ).children( ".ui-selecting" )
         .each( function(){
           Ui.select_vis_val( $( this ), null );
         } );
     },
     stop: function( event, ui ){
      if( $( this ).children( ".ui-selected" ).length == 0 ){
        $( ".selected" ).removeClass( "selected" );
        Ui.selected_events = {};
      }
     }
   } );

  };
};
