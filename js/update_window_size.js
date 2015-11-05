$(function(){
  var timer = false;
  $( window ).resize( function(){
    if( timer !== false ){
      clearTimeout( timer );
    }

    timer = setTimeout( function() {
      // pattern_vis.layout();
      // jquery ui を使うと、viewのサイズを変えるだけで実行されてしまう
    }, 200 );
  });
});
