pattern_vis.View.prototype.create_dom = function(){
  var that = this;

  var $view = $( "<div></div>", {
    id: "view_" + this.id,
    "class": "mdl-card mdl-shadow--2dp view"
  } );

  var $title = $( "<div></div>", {
    "class": "mdl-card__actions mdl-card--border",
  } ).append( $( "<span></span>", {
    "class": "mdl-button mdl-button--colored",
  } ).text( this.feature_name ) );

  var $menu = $( "<div></div>", {
    "class": "mdl-card__menu",
  } ).append( $( "<button></button>", {
    "class": "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect",
  } ).append( $( "<i></i>", {
    "class": "material-icons",
  } ).text( "share" ) ) );

  $( "#view-area" ).append( $view );
  this.$view = $view;

  this[ this.graph_type + "Create" ]();

  this.$view.append( $title );
  this.$view.append( $menu );
};
