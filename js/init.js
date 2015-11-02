$( function(){
  d3.select( ".page-content" )
    .append( "svg" )
    .attr( "id", "effect-area" );
  d3.select( "body" )
    .append( "svg" )
    .attr( "id", "overview-area" );

  overview = new pattern_vis.Overview();
  overview.draw();

  pattern_vis.updateAreaSize();

  pattern_vis.input_data( "data/shop_itemTrans.csv" );
} );
