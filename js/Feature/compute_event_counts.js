Feature.compute_event_counts = function( event_id ){
  var counts = [];
  for( var i = 0 ; i < 24 ; i++ )
    counts.push( 0 );

  data[ event_id ].times.forEach( function( time ){
    counts[  time.date.getHours() ]++;
  } );

  return counts;
}
