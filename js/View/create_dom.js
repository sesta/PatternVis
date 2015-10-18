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

  make_graph();

  this.$view.append( $title );
  this.$view.append( $menu );

  function make_graph(){
    that.d3_svg = d3.select( "#view_" + that.id ).append( "svg" );

    that.d3_graph = that.d3_svg.append( "g" )
      .attr( "transform", "translate(" + MARGIN.graph.left + "," + MARGIN.graph.top + ")");

    that.d3_graph.append( "g" )
      .attr( "class", "x axis" );

    that.d3_graph.append( "g" )
      .attr( "class", "y axis" )
      .append( "text" );
  }
};
