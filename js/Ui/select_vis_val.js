Ui.select_vis_val = function( $selected, view ){
  var event_ids =  $selected.attr( "event-id" ).split( "," );

  event_ids.forEach( function( event_id ){
    if( !Ui.selected_events[ event_id ] ){
      if( !view ){
        Ui.selected_events[ event_id ] = {
          from_view: null,
          from_d3_vis_val: null
        };
      }else{
        Ui.selected_events[ event_id ] = {
          from_view: view,
          from_d3_vis_val: view.d3_graph.select( ".val-id-" + $selected.attr( "val-id" ) )
        };
      }
    }

    $( '.selectable-area .event-id-' + event_id + ':not(".area")' )
      .addClass( "selected" );

    d3.selectAll( ".area.vis-val.event-id-" + event_id )
      .classed( "selected", true );
  } );
};
