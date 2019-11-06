<template>
  <Panel title="typeflow-container">
    <div id="mxContainer"></div>
    <ul id="definitionList">
      <li
        v-for="(ele, idx) in resElements"
        :key="idx">
        <div
          class="mxResElement"
          v-bind="ele">
          {{ele.type}}
        </div>
      </li>
    </ul>
  </Panel>
</template>

<script>
import mxgraph from "../graph/index";
import Panel from "./Panel";
import {genGraph} from "../graph/Graph";
import {resElements} from "../common/data";

// eslint-disable-next-line no-unused-vars
const {
  mxEvent,
  mxCell,
  mxGeometry,
  mxUtils,
  mxDragSource,
} = mxgraph;

let graph = null;

const initGraph = () => {
  graph = genGraph(document.getElementById('mxContainer'));
  makeDraggable(document.getElementById('mxDraggableRes'));
}

const makeDraggable = (draggableRes) => {
  var dragEle = createDraggableEle();
  var ds = mxUtils.makeDraggable(draggableRes, dropGraph, dropSuccessCb, dragEle, null, null, graph);
  ds.createDragElement = mxDragSource.prototype.createDragElement;
}

const createDraggableEle = () => {
  var dragEle = document.createElement('div');
  dragEle.style.border = 'dashed black 1px';
  dragEle.style.width = '120px';
  dragEle.style.height = '40px';
  return dragEle;
}

// 判断drop是否有效
const dropGraph = function (evt) {
  const x = mxEvent.getClientX(evt);
  const y = mxEvent.getClientY(evt);
  // 获取 x,y 所在的元素
  const elt = document.elementFromPoint(x, y);
  // 如果鼠标落在graph容器
  if (mxUtils.isAncestorNode(graph.container, elt)) {
    return graph;
  }
  // 鼠标落在其他地方
  return null;
};
// drop成功后新建一个节点
const dropSuccessCb = function (graph, evt, target, x, y) {
  const cell = new mxCell('Test', new mxGeometry(0, 0, 120, 40));
  cell.vertex = true;
  const cells = graph.importCells([cell], x, y, target);
  if (cells != null && cells.length > 0) {
    graph.setSelectionCells(cells);
  }
};

export default {
  name: "Editor",

  data() {
    return {
    resElements
  };
  },

  components: {
    Panel
  },

  methods: {

  },

  mounted() {
    initGraph();
    makeDraggable(document.getElementById('mxDraggableRes'))
  }
}

</script>

<style lang="less" scoped>
  #mxContainer {
    background: #efefef;
    width: 100%;
    height: 500px;
  }
  .mxResElement {
    width: 150px;
    height: 20px;
    background: #2c3e50;
    color: #42b983;
  }
  #definitionList {
    position: relative;
    top: 20px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
  }
  .mxResElement {
    height: 40px;
    width: 150px;
    line-height: 40px;
    border-radius: 4px;
  }
</style>
