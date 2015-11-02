$( function(){
  d3.select( ".page-content" )
    .append( "svg" )
    .attr( "id", "effect-area" );
  d3.select( "body" )
    .append( "svg" )
    .attr( "id", "overview-area" );

  pattern_vis.updateAreaSize();
  overview = new pattern_vis.Overview();
  pattern_vis.input_data( "data/shop_itemTrans.csv" );
} );
