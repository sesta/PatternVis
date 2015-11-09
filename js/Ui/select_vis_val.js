Ui.select_vis_val = function( $selected, view ){
  var event_ids =  $selected.attr( "event-id" ).split( "," );

  event_ids.forEach( function( event_id ){
    if( !Ui.selected_events[ event_id ] ){
      Ui.selected_events[ event_id ] = {
        from_view: view,
        $from_vis_val: $selected
      };
    }

    $( ".selectable-area .event-id-" + event_id )
      .addClass( "selected" );
  } );
};
