Feature.compute_period_spectrum = function( event_id ){
  var ft = [];
  var fw = new Array( setting.sampling_num / 5 );

  for( var i = 0 ; i < setting.sampling_num ; i++ ){
    ft.push( 0 );
  }

  data[ event_id ].times.filter( utility.inSettingTime )
  .forEach( function( time ){
    ft[ parseInt( ( time.date - setting.time.start ) / setting.sampling_interval, 10 ) ]++;
  } );

  fw[ 0 ] = 0;
  fw[ 1 ] = 0;

  for( var i = 2 ; i < setting.sampling_num/5 ; i++ ){
    var re_f = 0;
    var im_f = 0;

    for( var j = 1 ; j < setting.sampling_num ; j++ ){
      re_f += ft[ j ] * Math.cos( 2 * Math.PI * j / i );
      im_f += ft[ j ] * Math.sin( 2 * Math.PI * j / i );
    }

    fw[ i ] = parseInt( re_f * re_f + im_f * im_f, 10 );
  }

  return fw;
}
