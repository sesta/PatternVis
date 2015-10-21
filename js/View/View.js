pattern_vis.View = ( function(){
  var id_num = 0;

  return function( feature_id ){
    $.extend( this, {
      id: id_num,
      event_ids: Ui.selected_ids.concat(),
      feature_id: feature_id,
      feature_name: Feature[ feature_id ].name_ja,
      graph_type: Feature[ feature_id ].graph_type,
      $view: null,
      d3_svg: null,
      d3_graph: null,
      pos_x: 0,
      pos_y: 0,
      size_aspect: Feature[ feature_id ].size_aspect,
      svg_width: 200,
      svg_height: 400
    } );

    if( this.event_ids.length == 0 )
      this.event_ids = event_map.id_list;

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
