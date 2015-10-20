Feature.get = function( feature_id, event_id_1, event_id_2 ){
  var value = this[ feature_id ][ event_id_1 ];

  if( value && event_id_2 )
    value = this[ feature_id ][ event_id_1 ][ event_id_2 ];

  if( value ) return value;

  value = Feature[ "compute_" + feature_id ]( event_id_1, event_id_2 );

  if( event_id_2 ){
    if( !this[ feature_id ][ event_id_1 ] )
      this[ feature_id ][ event_id_1 ] = {};
    this[ feature_id ][ event_id_1 ][ event_id_2 ] = value;

    return value;
  }

  this[ feature_id ][ event_id_1 ] = value;

  return value;
};
