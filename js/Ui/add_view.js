$( function(){
  $( ".add-feature-button" ).on( "click", function(){
    var view = new pattern_vis.View( $( this ).data( "feature-name" ) );
    views.push( view );
    views_map[ view.id ] = view;

    overview.draw();

    Ui.cancel_all();
    pattern_vis.layout();
  } );

  $( ".next-line" ).on( "click", function(){
    views.push( "break_line" );
  } );
} );
