Feature.compute_crowd_time = function( event_id ){
  var event_counts = Feature.get( "event_counts", event_id );
  var average_count = Feature.get( "event_count", event_id ) / 24;
  var sd_count = 0;
  var crowd_time = [];

  event_counts.forEach( function( count ){
    sd_count = Math.pow( count - average_count, 2 );
  } );

  sd_count = Math.sqrt( sd_count / 24 );

  event_counts.forEach( function( count, index ){
    if( count > ( average_count + sd_count * 2 ) ){
      crowd_time.push( index );
    }
  } );

  return crowd_time;
}
