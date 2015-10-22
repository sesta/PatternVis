pattern_vis.layout = function(){
  var min_height = 300;
  var area_height = $( ".mdl-layout__content" ).height();
  var area_width = $( ".mdl-layout__content" ).width();

  var base_pos_y = MARGIN.view.top;
  var base_index = 0;
  var size_late = 1;
  var max_height = area_height;

  views.forEach( function( view, index ){
    view.pos_x = MARGIN.view.left;
    view.pos_y = base_pos_y;
    var prev_view = views[ index - 1 ];

    if( prev_view && ( index != base_index )){
      view.pos_x = prev_view.pos_x + prev_view.getWidth() + MARGIN.view.space;
    }

    view.svg_height = ( max_height - MARGIN.view.space - MARGIN.view.bottom - 50 ) * size_late;
    view.svg_width = view.svg_height / view.size_aspect;

    if( ( view.pos_x + view.svg_width + MARGIN.view.right) > area_width ){
      size_late *= area_width / ( view.pos_x + view.svg_width + MARGIN.view.right + MARGIN.view.space * index );

      for( var i = base_index ; i <= index ; i++ ){
        var view = views[ i ];

        view.pos_x = MARGIN.view.left;
        prev_view = views[ i - 1 ];

        if( prev_view && ( i != base_index ) ){
          view.pos_x = prev_view.pos_x + prev_view.getWidth() + MARGIN.view.space;
        }

        view.svg_height = ( max_height - MARGIN.view.space - MARGIN.view.bottom - 50 ) * size_late;
        view.svg_width = view.svg_height / view.size_aspect;

      }

      if( view.svg_height < min_height ){
        base_pos_y += view.getHeight() + MARGIN.view.space;
        base_index = index + 1;
        size_late = 1;
        max_height -= min_height;
      }
    }
  } );

  views.forEach( function( view, index ){
    view.$view.css( "top", view.pos_y + "px" );
    view.$view.css( "left", view.pos_x + "px" );
    view.$view.css( "width", view.getWidth() + "px" );
    view.$view.find( "svg" ).css( "height", view.svg_height + "px" );
    view.$view.find( "svg" ).css( "width", view.svg_width + "px" );

    view[ view.graph_type + "Draw" ]();
  } );
};
