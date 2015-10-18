$( ".add-feature-button" ).on( "click", function(){
  pattern_vis.views.push(
    new pattern_vis.View( $( this ).data( "feature-name" ) )
  );
  pattern_vis.layout();
} );
