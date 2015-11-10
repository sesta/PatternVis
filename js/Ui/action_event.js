$( function(){
  $( ".show-overview" ).on( "click", function(){
    var $overview = $( "#overview-area" );
    var $selectable_area = $overview.next( ".selectable-area" );
    if( $overview.css( "display" ) == "block" ){
      $overview.css( "display", "none" );
      $selectable_area.css( "display", "none" );
    }else{
      $overview.css( "display", "block" );
      $selectable_area.css( "display", "block" );
    }
  } );
} );
