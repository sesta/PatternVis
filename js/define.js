var pattern_vis = {
  area_width: 0,
  area_height: 0,
  updateAreaSize: function(){
    this.area_width = $( ".mdl-layout__content" ).width();
    this.area_height = $( "#view-area" ).height() + 200;

    d3.select( "#effect-area" )
      .attr( "width", this.area_width )
      .attr( "height", this.area_height );

    $( "#smallview-area" )
      .css( "height", $( "body" ).height() - 64 )
  }
};

var data = {
  time: {
    start: new Date(),
    end: new Date(0)
  },
  paths: {}
};

var event_map = {
  colors: d3.scale.category10(),
  name: {},
  id: {},
  id_list: [],
  type: {},
  same_type_ids: {},
  color: {}
};

var setting = {
  time: {
    step: 1000 * 60 * 60 * 24,
    start: new Date(),
    end: new Date(0),
  },
  sampling_num: 300,
  sampling_interval: 1000 * 60 * 60 * 6
};

var MARGIN = {
  view: {
    top: 30,
    bottom: 30,
    left: 270,
    right: 30,
    space: 20,
    label: 40
  },
  graph: {
    top: 50,
    bottom: 50,
    left: 70,
    right: 20,
    space: 5
  }
};

var views = [];
var views_map = {
  origin: { feature_name: "origin" }
};

var Feature = {
  event_count: {
    name_ja: "発生頻度",
    size_aspect: 1.5,
    graph_type: "bar",
    values: {}
  },
  event_counts: {
    name_ja: "発生分布",
    size_aspect: 1.0,
    graph_type: "multi_area",
    values: {}
  },
  event_count_max_time: {
    name_ja: "最頻時間帯",
    size_aspect: 1.0,
    graph_type: "scatter",
    values: {}
  },
  average_time: {
    name_ja: "発生しやすい時刻",
    size_aspect: 1.0,
    graph_type: "scatter",
    values: {}
  },
  sd_time: {
    name_ja: "発生時刻のばらつき",
    size_aspect: 1.0,
    graph_type: "bar",
    values: {}
  },
  period_spectrum: {
    name_ja: "周期性の強さ",
    size_aspect: 1.0,
    graph_type: "multi_bar",
    values: {}
  },
  average_time_difference: {
    name_ja: "発生しやすい時刻の近さ",
    size_aspect: 1.0,
    graph_type: "matrix",
    values: {}
  },
  similar: {
    name_ja: "発生時間帯の類似性",
    size_aspect: 1.0,
    graph_type: "matrix",
    values: {}
  },
  crowd_time: {
    name_ja: "特に多く発生している時間帯",
    size_aspect: 1.0,
    graph_type: "scatter",
    values: {}
  },
  with_happen_count: {
    name_ja: "同時に発生した回数",
    size_aspect: 1.0,
    graph_type: "uniq_matrix",
    values: {}
  },
  with_happen_rate: {
    name_ja: "同時に発生する確率",
    size_aspect: 1.0,
    graph_type: "uniq_matrix",
    values: {}
  }
};

var Ui = {
  animation_time: 500,
  selected_events: {},
  history_clicked_view: null
};
