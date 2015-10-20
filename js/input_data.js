pattern_vis.input_data = (function(){
  var id_num = 0;

  return function( data_path ){
    d3.text( data_path, function( err, text ){
      if( err ){
        throw err;
      }

      var row_data = d3.csv.parseRows( text );

      row_data.forEach( function( record ){
        var time = formatDateString( record[ record.length -1 ] );

        record[ record.length - 1 ] = time;

        for( var i = 0 ; i < ( record.length - 1 ) ; i++ ){
          var event_name = record[ i ];
          if( !( event_name in id_map ) ){
            id_map[ event_name ] = id_num;
            id_map[ id_num ] = event_name;
            data[ id_num ] = {
              data_path: data_path,
              times: []
            };

            id_num ++;
          }

          data[ id_map[ event_name ] ].times.push( time );
        }
      } );

      data[ data_path ] = row_data;
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

    return {
      ms: date.getTime(),
      date: date
    };
  }
})();
