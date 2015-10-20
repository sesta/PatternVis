var utility = {};

utility.getTimeDiffOnPeriod = function( time_1, time_2 ){
  return Math.abs( 12 - ( ( time_1 - time_2 + 36 ) % 24 ));
};
