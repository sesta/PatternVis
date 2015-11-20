$( function(){
  $( ".start-time-slider" ).on( "input", function(){
    $( ".start-time-span" )
      .text( d3.time.format( "%Y/%m/%d" )( new Date( $( this ).val() * 1.0 ) ) );
  } );

  $( ".end-time-slider" ).on( "input", function(){
    $( ".end-time-span" )
      .text( d3.time.format( "%Y/%m/%d" )( new Date( $( this ).val() * 1.0 ) ) );
  } );

  $( ".start-time-slider" ).on( "change", function(){
    setting.time.start = new Date( $( this ).val() * 1.0 );

    if( setting.time.start > setting.time.end ){
      setting.time.start = setting.time.end;
      $( this ).val( setting.time.end.getTime() );

      return;
    }

    overview.filterRecordsByTime();
  } );

  $( ".end-time-slider" ).on( "change", function(){
    setting.time.end = new Date( $( this ).val() * 1.0 );

    if( setting.time.end < setting.time.start ){
      setting.time.end = setting.time.start;
      $( this ).val( setting.time.start.getTime() );

      return;
    }

    overview.filterRecordsByTime();
  } );
} );
