$( ".add-feature-button" ).on( "click", function(){
  views.push(
    new pattern_vis.View( $( this ).data( "feature-name" ) )
  );

  Ui.cancel_all();
  pattern_vis.layout();
} );
