pattern_vis.View = ( function(){
  var id_num = 0;

  return function( feature_id ){
    $.extend( this, {
      id: id_num,
      event_ids: [ "0", "1" ],
      feature_id: feature_id,
      feature_name: "発生頻度",
      $view: null,
      d3_graph: null,
      pos_x: 0,
      pos_y: 0,
      size_aspect: 2,
      svg_width: 200,
      svg_height: 400
    } );

    this.create_view_dom();

    id_num++;
  };
} )();

pattern_vis.View.prototype.getHeight = function(){
  return this.svg_height + 50;
};

pattern_vis.View.prototype.getWidth = function(){
  return this.svg_width;
};
