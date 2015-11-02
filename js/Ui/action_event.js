$( function(){
  $( ".show-overview" ).on( "click", function(){
    var $overview = $( "#overview-area" );
    if( $overview.css( "display" ) == "block" ){
      $overview.css( "display", "none" );
    }else{
      $overview.css( "display", "block" );
    }
  } );
} );
