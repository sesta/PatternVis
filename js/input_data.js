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
            event_map.type[ id_num ] = i;
            if( !event_map.same_type_ids[ i ] )
              event_map.same_type_ids[ i ] = [];
            event_map.same_type_ids[ i ].push( id_num );
            event_map.color[ id_num ] = event_map.colors( i );
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
            event_ids: [ event_map.name[ event_name ] ],
            count: 1
          } );

          data[ event_map.name[ event_name ] ].times.push( time );
        }
      } );

      data.paths[ data_path ] = row_data;
      data.times = row_times;

      setting.time.start = data.time.start;
      setting.time.end = data.time.end;

      $( ".start-time-span" )
        .text( d3.time.format( "%Y/%m/%d" )( setting.time.start ) );
      $( ".end-time-span" )
        .text( d3.time.format( "%Y/%m/%d" )( setting.time.end ) );

      $( ".start-time-slider" )
        .attr( {
          "min": setting.time.start.getTime(),
          "max": setting.time.end.getTime(),
          "value": setting.time.start.getTime()
        } );
      $( ".end-time-slider" )
        .attr( {
          "min": setting.time.start.getTime(),
          "max": setting.time.end.getTime(),
          "value": setting.time.end.getTime()
        } );

      overview.setHistory( "origin", [] );
      overview.draw();

      for( type in event_map.same_type_ids ){
        var size = event_map.same_type_ids[ type ].length;
        $( ".action-buttons" ).append( $( "<li></li>", {
          "class": "mdl-menu__item mdl-js-ripple-effect"
        } ).css( "color", event_map.colors( type ) )
        .text( "Select Type " + type + " ( " + size + " events )" )
        .data( "type", type )
        .on( "click", function(){
          Ui.select_type( $( this ).data( "type" ) );
        } ) );
      }
    });
  };

  function formatDateString( string ){
    var regx = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)/g;
    // var regx = /(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) ([AP]M)/g;
    var date;
    string.replace(regx,function(match,p1,p2,p3,p4,p5,p6){
    //string.replace(regx,function(match,p1,p2,p3,p4,p5,p6,p7){
      try{
        date = new Date(p1,p2-1,p3,p4,p5,p6);
        //date = new Date(p3,p1-1,p2,p4,p5,p6);
        if( p7 == "AM" && p4 == "12" )
          date = new Date(p3,p1-1,p2,0,p5,p6);
        if( p7 == "PM" && p4 != "12" )
          date = new Date(p3,p1-1,p2,p4 * 1.0 + 12,p5,p6);
      }catch(err){
        console.log(match);
      }
    });

    if( date > data.time.end )
      data.time.end = date;

    if( date < setting.time.start )
      data.time.start = date;

    return {
      ms: date.getTime(),
      date: date
    };
  }
})();
