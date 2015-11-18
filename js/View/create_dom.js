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
  } ).text( "share" ) ) );

  $menu.append( $( "<button></button>", {
    "class": "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect feature-sort-button",
  } ).append( $( "<i></i>", {
    "class": "material-icons",
  } ).text( "sort" ) ) );

  $menu.append( $( "<button></button>", {
    "class": "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect type-sort-button",
  } ).append( $( "<i></i>", {
    "class": "material-icons",
  } ).text( "sort" ) ) );

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

      if( Ui.history_clicked_view )
        Ui.history_clicked_view.showHistory();
    }
  } );
};
