$( function(){
  d3.select( ".page-content" )
    .append( "svg" )
    .attr( "id", "effect-area" )
    .attr( "width", $( ".mdl-layout__content" ).width() )
    .attr( "height", $( ".mdl-layout__content" ).height() + 900);

  pattern_vis.input_data( "data/shop_itemTrans.csv" );
} );
