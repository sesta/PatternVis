Feature.compute_with_happen_count = function( event_id_1, event_id_2 ){
  var data_records = data[ data[ event_id_1 ].data_path ];
  var record_index_1 = data[ event_id_1 ].record_index;
  var record_index_2 = data[ event_id_2 ].record_index;
  var event_name_1 = event_map.id[ event_id_1 ];
  var event_name_2 = event_map.id[ event_id_2 ];
  var count = 0;

  data_records.forEach( function( record ){
    if( ( record[ record_index_1 ] == event_name_1 )
        && ( record[ record_index_2 ] == event_name_2 ) )
      count++;
  });

  return count;
}
