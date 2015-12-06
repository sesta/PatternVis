Ui.showDetail = function( $vis_val, event ){
  var $detail = $( "#detail-area" );

  $detail.find( ".detail-event-name" )
    .text( event_map.id[ $vis_val.attr( "event-id" ) ] );
  $detail.find( ".detail-feature-name" )
    .text( $vis_val.attr( "feature-name" ) );
  $detail.find( ".detail-value" )
    .text( $vis_val.attr( "value" ) );

  $detail.css( {
    "top": ( event.pageY - $detail.height() - 40 ) + "px",
    "left": ( event.pageX - $detail.width() - 40 ) + "px"
  } ).show();

  if( event.pageY < $detail.height() + 40 )
    $detail.css( "top", event.pageY + 20 + "px" );

  if( event.pageX < $detail.width() + 40 )
    $detail.css( "left", event.pageX + 20 + "px" );
}

Ui.hiddenDetail = function(){
  var $detail = $( "#detail-area" ).hide();
}
