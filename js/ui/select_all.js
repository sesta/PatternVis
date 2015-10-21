Ui.select_all = function(){
  Ui.selected_ids.forEach( function( id ){
    d3.selectAll( ".vis-val.event-id-" + id )
      .classed( "selected", false );
  } );

  Ui.selected_ids = [];
};
