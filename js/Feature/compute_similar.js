Feature.compute_similar = function( event_id_1, event_id_2 ){
  var event_counts_1 = this.get( "event_counts", event_id_1 );
  var event_counts_2 = this.get( "event_counts", event_id_2 );
  var scalar_1 = 0;
  var scalar_2 = 0;
  var similar = 0;

  event_counts_1.forEach( function( count, index ){
    scalar_1 += count * count;
    scalar_2 += event_counts_2[ index ] * event_counts_2[ index ];
    similar += count * event_counts_2[ index ];
  } );

  scalar_1 = Math.sqrt( scalar_1 );
  scalar_2 = Math.sqrt( scalar_2 );

  return similar / scalar_1 / scalar_2;
}
