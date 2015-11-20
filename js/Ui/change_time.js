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
    updateDataByTime();
    pattern_vis.layout();
  } );

  $( ".end-time-slider" ).on( "change", function(){
    setting.time.end = new Date( $( this ).val() * 1.0 );

    if( setting.time.end < setting.time.start ){
      setting.time.end = setting.time.start;
      $( this ).val( setting.time.start.getTime() );

      return;
    }

    overview.filterRecordsByTime();
    updateDataByTime();
    pattern_vis.layout();
  } );

  var updateDataByTime = function(){
    /*
    for( id in event_map.id ){
      data[ id ].times = [];
    }

    for( path in data.paths ){
      data.paths[ path ].forEach( function( record ){
        for( var i = 0 ; i < ( record.length - 1 ) ; i++ ){
          data[ event_map.name[ event_name ] ].times.push( time );
      } );
    }

    */

    for( type in Feature ){
      Feature[ type ].values = {};
    }
  };
} );
