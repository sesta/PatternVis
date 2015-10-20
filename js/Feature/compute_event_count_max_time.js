Feature.compute_event_count_max_time = function( event_id ){
  var counts = this.get( "event_counts", event_id );
  var max_index = 0;

  counts.forEach( function( count, index, array ){
    if( count > array[ max_index ] )
      max_index = index;
  } );

  return [ max_index ];
}
