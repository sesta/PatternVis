$(function(){
  var timer = false;
  $( window ).resize( function(){
    if( timer !== false ){
      clearTimeout( timer );
    }

    timer = setTimeout( function() {
      pattern_vis.layout();
    }, 200 );
  });
});
