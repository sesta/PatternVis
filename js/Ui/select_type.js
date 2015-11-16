Ui.select_type = function( type ){
  var event_ids =  event_map.same_type_ids[ type ];

  event_ids.forEach( function( event_id ){
    if( !Ui.selected_events[ event_id ] ){
      Ui.selected_events[ event_id ] = {
        from_view: null,
        from_d3_vis_val: null
      };
    }

    $( '.selectable-area .event-id-' + event_id + ':not(".area")' )
      .addClass( "selected" );

    d3.selectAll( ".area.vis-val.event-id-" + event_id )
      .classed( "selected", true );
  } );
};
