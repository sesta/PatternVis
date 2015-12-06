$( function(){
  d3.select( ".page-content" )
    .append( "svg" )
    .attr( "id", "effect-area" );

  d3.select( "body" )
    .append( "div" )
    .attr( "id", "smallview-area" )
    .attr( "class", "selectable-area" )
    .append( "svg" )
    .attr( "id", "smallview" );

  d3.select( "body" )
    .append( "svg" )
    .attr( "id", "overview-area" )
    .style( "display", "none" );

  $( "#detail-area" ).hide();

  var $selectable_area = $( "<div></div>" ,{
    "class": "selectable-area"
  } ).css( "display", "none" );
  $( "body" ).append( $selectable_area );

  overview = new pattern_vis.Overview();

  $( ".relayout" ).on( "click", function(){
    pattern_vis.layout();
  } );

  pattern_vis.updateAreaSize();
  pattern_vis.input_data( "data/shop_itemTrans.csv" );
} );
