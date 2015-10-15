pattern_vis.View = ( function(){
  var id_num = 0;

  return function( feature_id ){
    $.extend( this, {
      id: id_num,
      feature_id: feature_id,
      feature_name: "発生頻度",
      $view: null,
      $svg: null,
      width: 300,
      height: 300
    } );

    this.create_view_dom();
    this.draw();

    id_num++;
  };
} )();

