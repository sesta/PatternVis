pattern_vis.View = ( function(){
  var id_num = 0;

  return function( feature_id ){
    var that = this;

    var event_ids = [];
    for( event_id in Ui.selected_events ){
      event_ids.push( event_id );
    }

    $.extend( this, {
      id: id_num,
      event_ids: event_ids,
      event_history: $.extend( true, {}, Ui.selected_events ),
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

    if( this.event_ids.length == 0 ){
      this.event_ids = event_map.id_list
    }else{
      overview.setHistory( views.length, this.event_ids );
      overview.draw();
    }

    this.create_dom();

    this.$view.find( ".show-history-button" ).on( "click", function(){
      that.showHistory();
      Ui.history_clicked_view = that;
    });

    id_num++;
  };
} )();

pattern_vis.View.prototype.getHeight = function(){
  return this.svg_height * 1.0 + MARGIN.view.label;
};

pattern_vis.View.prototype.getWidth = function(){
  return this.svg_width * 1.0;
};

pattern_vis.View.prototype.getCenter = function(){
  return [ this.pos_x * 1.0 + this.getWidth() / 2.0, this.pos_y * 1.0 + this.getHeight() / 2 ];
};

pattern_vis.View.prototype.updateSvgSize = function(){
  this.$view.find( "svg" ).css( "height", this.svg_height + "px" );
  this.$view.find( "svg" ).css( "width", this.svg_width + "px" );
};
