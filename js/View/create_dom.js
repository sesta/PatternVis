pattern_vis.View.prototype.create_dom = function(){
  var self = this;

  var $view = $( "<div></div>", {
    id: "view-" + this.id,
    "class": "mdl-card mdl-shadow--2dp view"
  } );

  var $title = $( "<div></div>", {
    "class": "mdl-card__actions mdl-card--border",
    "data-view-id": self.id_num
  } ).append( $( "<span></span>", {
    "class": "mdl-button mdl-button--colored",
  } ).text( this.id + ". " + this.feature_name ) );

  var $menu = $( "<div></div>", {
    "class": "mdl-card__menu",
  } ).append( $( "<button></button>", {
    "class": "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect show-history-button",
  } ).append( $( "<i></i>", {
    "class": "material-icons",
  } ).text( "history" ) ) );

  $menu.append( $( "<button></button>", {
    "class": "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect feature-sort-button",
  } ).append( $( "<img>", {
    "src": "images/sort_feature.png",
    "width": "32px"
  } ) ) );

  $menu.append( $( "<button></button>", {
    "class": "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect type-sort-button",
  } ).append( $( "<img>", {
    "src": "images/sort_type.png",
    "width": "32px"
  } ) ) );

  $menu.append( $( "<button></button>", {
    "class": "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect remove-button",
  } ).append( $( "<i></i>", {
    "class": "material-icons",
  } ).text( "clear" ).css( "color", "red" ) ) );

  var $selectable_area = $( "<div></div>" ,{
    "class": "selectable-area"
  } );

  $( "#view-area" ).append( $view );
  this.$view = $view;

  this[ this.graph_type + "Create" ]();

  this.$view.append( $title );
  this.$view.append( $menu );
  this.$view.append( $selectable_area );

  $view.draggable( {
    handle: ".mdl-card__actions",
    start: function( event, ui ){
      $( "#view-area" ).append( self.$view );
      $( ".history-line" ).remove();
    },
    stop: function( event, ui ){
      self.pos_x = ui.position.left;
      self.pos_y = ui.position.top;

      pattern_vis.layoutSmallView();

      if( Ui.history_clicked_view )
        Ui.history_clicked_view.showHistory();
    }
  } );

  $view.resizable( {
    start: function( event, ui ){
      $( "#view-area" ).append( self.$view );
      $( ".history-line" ).remove();
    },
    stop: function( event, ui ){
      self.svg_height = $( this ).height() - MARGIN.view.label;
      self.svg_width = $( this ).width();
      self.updateSvgSize();
      self[ self.graph_type + "Draw" ]();

      pattern_vis.layoutSmallView();

      if( Ui.history_clicked_view )
        setTimeout( function(){
          Ui.history_clicked_view.showHistory();
        }, self.event_ids.length * 10 + 500 );
    }
  } );
};
