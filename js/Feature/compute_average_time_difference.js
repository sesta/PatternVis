Feature.compute_average_time_difference = function( event_id_1, event_id_2 ){
  var average_time_1 = this.get( "average_time", event_id_1 );
  var average_time_2 = this.get( "average_time", event_id_2 );

  return 12 - utility.getTimeDiffOnPeriod( average_time_1, average_time_2 );
}
