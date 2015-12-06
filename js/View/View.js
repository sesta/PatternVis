pattern_vis.View = ( function(){
  var id_num = 0;

  return function( feature_id ){
    var self = this;

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
      svg_height: 400,
      feature_sort: false,
      type_sort: false
    } );

    if( this.event_ids.length == 0 ){
      this.event_ids = event_map.id_list
    }else{
      overview.setHistory( this.id, this.event_ids );
    }

    this.create_dom();

    this.$view.find( ".show-history-button" ).on( "click", function(){
      self.showHistory();
      Ui.history_clicked_view = self;
    });

    this.$view.find( ".remove-button" ).on( "click", function(){
      self.$view.remove();
      views.splice( views.indexOf( self ), 1 );

      views.forEach( function( view ){
        var ids = [];

        if( view != "break_line" )
          for( history in view.event_history ){
            if( view.event_history[ history ].from_view == self )
              ids.push( history );
          }

        ids.forEach( function( id ){
          delete view.event_history[ id ];
        } );
      } );

      pattern_vis.layout();
      Ui.cancel_all();
    } );

    this.$view.find( ".feature-sort-button" ).on( "click", function(){
      $( ".history-line" ).remove();
      self.feature_sort = !self.feature_sort;
      self[ self.graph_type + "Draw" ]();

      if( Ui.history_clicked_view )
        Ui.history_clicked_view.showHistory();

      pattern_vis.layoutSmallView();
    } );

    this.$view.find( ".type-sort-button" ).on( "click", function(){
      $( ".history-line" ).remove();
      self.type_sort = !self.type_sort;
      self[ self.graph_type + "Draw" ]();

      if( Ui.history_clicked_view )
        Ui.history_clicked_view.showHistory();

      pattern_vis.layoutSmallView();
    } );

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

  this.$view.find( ".selectable-area" ).css( "height", this.svg_height + "px" );
  this.$view.find( ".selectable-area" ).css( "width", this.svg_width + "px" );
};
