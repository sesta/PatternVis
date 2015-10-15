pattern_vis.View.prototype.create_view_dom = function(){
  var $view = $( "<div></div>", {
    id: "view_" + this.id,
    "class": "mdl-card mdl-shadow--2dp view"
  } ).css( "width", this.svg_width + "px");;

  var $svg = $( "<div></div>", {
    "class": "graph-area"
  } ).css( "height", this.svg_height + "px" )
     .css( "width", this.svg_width + "px");

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

  $view.append( $svg );
  $view.append( $title );
  $view.append( $menu );

  $( "#view-area" ).append( $view );
  this.$view = $view;
};
