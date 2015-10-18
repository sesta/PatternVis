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
      svg_width: 200,
      svg_height: 300,
    } );

    this.create_view_dom();
    this.draw();

    id_num++;
  };
} )();

pattern_vis.View.prototype.getHeight = function(){
  return this.svg_height + 50;
};

pattern_vis.View.prototype.getWidth = function(){
  return this.svg_width;
};
