<template>
  <Panel title="typeflow-container">
    <div id="mxContainer"></div>
    <div
      v-if="isFormShow"
      class="form-cover">
      <FillForm :type="nowDefiType" v-on:getValueFromForm="_getValueFromForm"></FillForm>
    </div>
    <ul id="definitionList">
      <li
        v-for="(ele, idx) in resElements"
        :key="idx">
        <div
          :data-type="ele.defiType"
          class="mxResElement">
          {{ele.defiType}}
        </div>
      </li>
    </ul>
  </Panel>
</template>
<script>
import mxgraph from "../graph/index";
import Panel from "./Panel";
import FillForm from "./FillForm";
import {genGraph, destroyGraph, Graph} from "../graph/Graph";
import {resElements} from "../common/data";

const {
  mxEvent,
  mxCell,
  mxGeometry,
  mxUtils,
} = mxgraph;

const FROM_EDITOR_LOG = "FROM_EDITOR_LOG";

let graph = null;

const initGraph = () => {
  graph = genGraph(document.getElementById('mxContainer'));
  makeDraggable(document.getElementsByClassName('mxResElement'))
}

const makeDraggable = (sourceElements) => {
  //decide drop validate
  const dropValidate = function(evt) {
    const x = mxEvent.getClientX(evt);
    const y = mxEvent.getClientY(evt);
    //use x and y to attain the ele
    const ele = document.elementFromPoint(x, y);
    //decide whether is dropped inside the graph container
    if(mxUtils.isAncestorNode(graph.container, ele)) {
      return graph;
    }
    return null;
  };

  //after drop success, create something
  const dropSuccessAndCreate = function (graph, evt, target, x, y) {
    insertVertex(this.element, target, x, y);
    //this._displayFillForm();
  };

  //add the drag event for every definition element
  Array.from(sourceElements).forEach((ele) => {
    const afterEle = ele;
    mxUtils.makeDraggable(ele, dropValidate, dropSuccessAndCreate, afterEle,
            null, null, null, true);
  });


}

const insertVertex = (dom, target, x, y) => {
  const defiType = dom.getAttribute('data-type');
  window.console.log(FROM_EDITOR_LOG + defiType);
  var defiVertex = new mxCell(defiType, new mxGeometry(0, 0, 150, 40), `defi_node`);
  defiVertex.vertex = true;

  const cells = graph.importCells([defiVertex], x, y, target);
  if(cells != null && cells.length > 0) {
    graph.setSelectionCells(cells);
  }

};

export default {
  name: "Editor",

  data() {
    return {
    resElements,
    isFormShow: false,
    nowDefiType: "Definition",
    definitions: [],
  };
  },

  components: {
    FillForm,
    Panel
  },

  methods: {
    _displayFillForm: function() {
      this.isFormShow = true;
      window.console.log(this.isFormShow)
     },
    _getValueFromForm: function(defiName, inputs, outputs) {
       //use the data from form to create new definition
      window.console.log(defiName)
      window.console.log(inputs)
      window.console.log(outputs)
      this.isFormShow = false;
    },

    //listen to graph event
    _listenEvent: function () {
      //listen Add cell event
      graph.addListener(mxEvent.CELLS_ADDED, (sender, evt) => {
        const cell = evt.properties.cells[0];
        if (graph.isPart(cell)) {
          return;
        }
        if (cell.vertex) {
          this.isFormShow = true;
        }
      });

    }

  },

  mounted() {
    initGraph();
    this._listenEvent();
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
  .form-cover {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
