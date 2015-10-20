for( id in Feature ){
  var $li = $( "<li></li>", {
    "class": "mdl-menu__item add-feature-button",
    "data-feature-name": id
  } ).text( Feature[ id ].name_ja );

  $( ".add-feature-buttons" ).append( $li );
};
