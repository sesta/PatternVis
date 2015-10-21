Ui.click_vis_val = function( d3_dom ){
  var selected = d3_dom.classed( "selected" );
  var event_ids =  d3_dom.attr( "event-id" ).split( "," );

  event_ids.forEach( function( event_id ){
    if( selected )
      Ui.selected_ids.splice( Ui.selected_ids.indexOf( event_id ), 1 );
    else
      Ui.selected_ids.push( event_id );

    d3.selectAll( ".vis-val.event-id-" + event_id )
      .classed( "selected", !selected );
  } );
};
