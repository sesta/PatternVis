Ui.cancel_all = function(){
  for( event_id in Ui.selected_events ){
    d3.selectAll( ".vis-val.event-id-" + event_id )
      .classed( "selected", false );
  };

  Ui.selected_events = {};
};
