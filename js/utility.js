var utility = {};

utility.getTimeDiffOnPeriod = function( time_1, time_2 ){
  return Math.abs( 12 - ( ( time_1 - time_2 + 36 ) % 24 ));
};

utility.formatSecondsToDate = function( seconds ){
  var date = new Date( seconds );
  return date.getMonth() + "/" + date.getDate();
};
