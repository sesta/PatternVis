for( id in features ){
  var $li = $( "<li></li>", {
    "class": "mdl-menu__item add-feature-button",
    "data-feature-name": id
  } ).text( features[ id ].name_ja );

  $( ".add-feature-buttons" ).append( $li );
};
