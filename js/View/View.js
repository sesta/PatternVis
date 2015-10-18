pattern_vis.View = ( function(){
  var id_num = 0;

  return function( feature_id ){
    $.extend( this, {
      id: id_num,
      event_ids: [ "a", "b" ],
      feature_id: feature_id,
      feature_name: features[ feature_id ].name_ja,
      $view: null,
      d3_svg: null,
      d3_graph: null,
      pos_x: 0,
      pos_y: 0,
      size_aspect: features[ feature_id ].size_aspect,
      svg_width: 200,
      svg_height: 400
    } );

    this.create_dom();

    id_num++;
  };
} )();

pattern_vis.View.prototype.getHeight = function(){
  return this.svg_height + 50;
};

pattern_vis.View.prototype.getWidth = function(){
  return this.svg_width;
};
