pattern_vis.input_data = (function(){
  var id_num = 1;

  return function( data_path ){
    d3.text( data_path, function( err, text ){
      if( err ){
        throw err;
      }

      var row_data = d3.csv.parseRows( text );
      var row_times = [];

      row_data.forEach( function( record ){
        var time = formatDateString( record[ record.length -1 ] );

        record[ record.length - 1 ] = time;

        for( var i = 0 ; i < ( record.length - 1 ) ; i++ ){
          var event_name = record[ i ];
          if( !( event_name in event_map.name ) ){
            event_map.name[ event_name ] = id_num;
            event_map.id[ id_num ] = event_name;
            event_map.id_list.push( id_num );
            data[ id_num ] = {
              data_path: data_path,
              record_index: i,
              times: []
            };

            id_num ++;
          }

          row_times.push( {
            id: "origin",
            value: time.date,
            event_id: event_map.name[ event_name ]
          } );

          data[ event_map.name[ event_name ] ].times.push( time );
        }
      } );

      data[ data_path ] = row_data;
      data.times = row_times;

      overview.setHistory( "origin", [] );
      overview.draw();
    });
  };

  function formatDateString( string ){
    var regx = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/g;
    var date;
    string.replace(regx,function(match,p1,p2,p3,p4,p5,p6){
      try{
        date = new Date(p1,p2-1,p3,p4,p5,p6);
      }catch(err){
        console.log(match);
      }
    });

    if( date > setting.time.end )
      setting.time.end = date;

    if( date < setting.time.start )
      setting.time.start = date;

    return {
      ms: date.getTime(),
      date: date
    };
  }
})();
