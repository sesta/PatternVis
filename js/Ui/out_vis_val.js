Ui.out_vis_val = function( d3_dom ){
  var event_ids =  d3_dom.attr( "event-id" ).split( "," );

  event_ids.forEach( function( event_id ){
    d3.selectAll( ".vis-val.event-id-" + event_id )
      .classed( "hover", false );
  } );
};
