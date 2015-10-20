var pattern_vis = {};

var data = {};

var id_map = {};

var MARGIN = {
  view: {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
    space: 20
  },
  graph: {
    top: 50,
    bottom: 50,
    left: 70,
    right: 40,
    space: 40
  }
};

var views =  []

var Feature = {
  event_count: {
    name_ja: "発生頻度",
    size_aspect: 1.5,
    graph_type: "bar"
  },
  event_counts: {
    name_ja: "発生分布",
    size_aspect: 1.0,
    graph_type: "multi_area"
  },
  event_count_max_time: {
    name_ja: "最頻時間帯",
    size_aspect: 1.0,
    graph_type: "scatter"
  },
  average_time: {
    name_ja: "発生しやすい時刻",
    size_aspect: 1.0,
    graph_type: "scatter"
  },
  sd_time: {
    name_ja: "発生時刻のばらつき",
    size_aspect: 1.0,
    graph_type: "bar"
  },
  period_spectrum: {
    name_ja: "周期性の強さ",
    size_aspect: 1.0,
    graph_type: "multi_bar"
  },
  average_time_defference: {
    name_ja: "発生しやすい時刻の近さ",
    size_aspect: 1.0,
    graph_type: "matrix"
  },
  similar_by_vector: {
    name_ja: "発生時間帯の類似性",
    size_aspect: 1.0,
    graph_type: "matrix"
  },
  crowd_count_by_count: {
    name_ja: "特に多く発生している時間帯",
    size_aspect: 1.0,
    graph_type: "scatter"
  },
  with_happen_count: {
    name_ja: "同時に発生した回数",
    size_aspect: 1.0,
    graph_type: "uniq_matrix"
  }
};
