$( function(){
  $( ".start-time-slider" ).on( "change", function(){
    setting.time.start = new Date( $( this ).val() * 1.0 );

    if( setting.time.start > setting.time.end ){
      setting.time.start = setting.time.end;
      $( this ).val( setting.time.end.getTime() );
    }

    $( ".start-time-span" )
      .text( d3.time.format( "%Y/%m/%d" )( setting.time.start ) );
  } );

  $( ".end-time-slider" ).on( "change", function(){
    setting.time.end = new Date( $( this ).val() * 1.0 );

    if( setting.time.end < setting.time.start ){
      setting.time.end = setting.time.start;
      $( this ).val( setting.time.start.getTime() );
    }

    $( ".end-time-span" )
      .text( d3.time.format( "%Y/%m/%d" )( setting.time.end ) );
  } );
} );
