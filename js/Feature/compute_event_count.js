Feature.compute_event_count = function( event_id ){
  return data[ event_id ].times.filter( utility.inSettingTime ).length;
};
