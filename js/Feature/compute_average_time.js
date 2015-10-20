Feature.compute_average_time = function( event_id ){
  var pos_x = 0;
  var pos_y = 0;

  data[ event_id ].times.forEach( function( time ){
    var time_real_number = time.date.getHours() + time.date.getSeconds() / 60;
    pos_x += Math.cos( Math.PI / 2 - Math.PI * 2 * time_real_number / 24 );
    pos_y += Math.sin( Math.PI / 2 - Math.PI * 2 * time_real_number / 24 );
  } );

  pos_x /= data[ event_id ].times.length;
  pos_y /= data[ event_id ].times.length;

  data[ event_id ].pos_x = pos_x;
  data[ event_id ].pos_y = pos_y;

  return [ 24 * ( 1.25 - Math.atan2( pos_y, pos_x ) / Math.PI / 2 ) % 24 ];
}
