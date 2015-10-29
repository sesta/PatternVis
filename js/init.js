$( function(){
  d3.select( ".page-content" )
    .append( "svg" )
    .attr( "id", "effect-area" );

  pattern_vis.updateAreaSize();

  pattern_vis.input_data( "data/shop_itemTrans.csv" );
} );
