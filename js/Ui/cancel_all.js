Ui.cancel_all = function(){
  this.cancel_selecting();

  $( ".history-line" ).remove();
  Ui.history_clicked_view = null;
};

Ui.cancel_selecting = function(){
  $( ".selected" ).removeClass( "selected" );
  d3.selectAll( "path.vis-val" ).classed( "selected", false );

  Ui.selected_events = {};
};
