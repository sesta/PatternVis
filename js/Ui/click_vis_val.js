Ui.click_vis_val = function( d3_dom, view ){
  var selected = d3_dom.classed( "selected" );
  var event_ids =  d3_dom.attr( "event-id" ).split( "," );

  event_ids.forEach( function( event_id ){
    if( selected )
      delete Ui.selected_events[ event_id ];
    else
      Ui.selected_events[ event_id ] = {
        from_view: view,
        from_d3_vis_val: d3_dom
      };

    d3.selectAll( ".vis-val.event-id-" + event_id )
      .classed( "selected", !selected );
  } );
};
