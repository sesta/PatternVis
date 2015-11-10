Ui.over_vis_val = function( $vis_val ){
  var event_ids =  $vis_val.attr( "event-id" ).split( "," );

  event_ids.forEach( function( event_id ){
    $( '.selectable-area .event-id-' + event_id + ':not(".area")' )
      .addClass( "hover" );

    d3.selectAll( ".area.vis-val.event-id-" + event_id )
      .classed( "hover", true );
  } );
};
