Feature.compute_sd_time = function( event_id ){
  var sd_time = 0;
  var average_time = this.get( "average_time", event_id );

  data[ event_id ].times.forEach( function( time ){
    var time_real_number = time.date.getHours() + time.date.getSeconds() / 60;
    var diff_time = 12 - ( ( time_real_number + 36 - average_time ) % 24 );
    sd_time += Math.pow( diff_time, 2 );
  } );

  return Math.sqrt( sd_time / data[ event_id ].times.length );
}
