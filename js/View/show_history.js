pattern_vis.View.prototype.show_history = function(){
  var that = this;

  for( event_id in this.event_history ){
    var from_view = this.event_history[ event_id ].from_view;
    var from_d3_vis_val = this.event_history[ event_id ].from_d3_vis_val;
    var from_pos_x = from_view.pos_x * 1.0
                    + MARGIN.graph.left
                    + from_d3_vis_val.attr( "center-x" ) * 1.0;
    var from_pos_y = from_view.pos_y * 1.0
                    + MARGIN.graph.top
                    + from_d3_vis_val.attr( "center-y" ) * 1.0;

    var to_d3_vis_val = this.event_history[ event_id ].to_d3_vis_val;
    var to_pos_x = this.pos_x * 1.0
                    + MARGIN.graph.left
                    + to_d3_vis_val.attr( "center-x" ) * 1.0;
    var to_pos_y = this.pos_y * 1.0
                    + MARGIN.graph.top
                    + to_d3_vis_val.attr( "center-y" ) * 1.0;

    d3.select( "#effect-area" ).append( "line" )
      .attr( "class", "history-line" )
      .attr( "x1", parseInt( to_pos_x, 10 ) )
      .attr( "y1", parseInt( to_pos_y, 10 ) )
      .attr( "x2", parseInt( from_pos_x, 10 ) )
      .attr( "y2", parseInt( from_pos_y, 10 ) );

    from_view.show_history();
  }
};
