Ui.cancel_all = function(){
  $( ".selected" ).removeClass( ".selected" );

  Ui.history_clicked_view = null;

  Ui.selected_events = {};
};
