<template>
  <div class="typeflow-container">
    <div class="title"><b>Typeflow Editor</b></div>
    <div id="mxContainer"></div>
    <div
      v-if="isFormShow"
      class="form-cover">
      <FillForm :type="nowDefiType" :id="nowVertexId" v-on="{
        getValueFromForm: _getValueFromForm,
        closeForm: _closeForm
        }"/>
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
  </div>
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
  mxGraph,
} = mxgraph;

const FROM_EDITOR_LOG = "FROM_EDITOR_LOG";

let graph = null;
let idSeed = -1;

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
  var defiVertex = new mxCell(defiType, new mxGeometry(0, 0, 160, 50), `defi_node`);
  idSeed++;
  defiVertex.vertex = true;
  //customize new type data, to store vertex id \ type \ content
  defiVertex.data = {
    definition: null
  }
  const cells = graph.importCells([defiVertex], x, y, target);
  if(cells != null && cells.length > 0) {
    graph.setSelectionCells(cells);
  }

};

const updateVertex = (vertexId, definition) => {
  var defiVertex = graph.getModel().getCell(vertexId);
  defiVertex.data.definition = definition;
  let x = defiVertex.getGeometry().x;
  let y = defiVertex.getGeometry().y;

  var titleVertex = graph.insertVertex(defiVertex, null, definition.name,
    0, 0.35, 150, 20,
    'constituent=1;whiteSpace=wrap;strokeColor=none;fillColor=none;fontColor=#ffffff;fontSize=22',
    true);
  titleVertex.setConnectable(false);

  var model = graph.getModel();
  var parent = graph.getDefaultParent();
  model.beginUpdate();
  try {
    //can't figure out why it can extract to function in this transaction
    //update inputs
    let inputs = definition.inputs;
    let len = inputs.length;
    let mid = Math.floor(len / 2);
    let relativePosi = -mid;
    for(let idx = 0; idx < len; idx++) {
      var inVertex = graph.insertVertex(parent, null, inputs[idx].id, x+relativePosi*90+40, y-90, 80, 30, `inout_node`);
      //add the 'data' to identify the vertex for the connection validation
      inVertex.data = {
        input: inputs[idx]
      }
      graph.insertEdge(parent, null, '', inVertex, defiVertex);
      relativePosi++;
    }

    //update outputs
    let outputs = definition.outputs;
    let len2 = outputs.length;
    let mid2 = Math.floor(len2 / 2);
    let relativePosi2 = -mid2;
    for(let idx = 0; idx < len2; idx++) {
      var outVertex = graph.insertVertex(parent, null, outputs[idx].id, x+relativePosi2*90+40, y+90, 80, 30, `inout_node`);
      outVertex.data = {
        output: outputs[idx]
      }
      graph.insertEdge(parent, null, '', defiVertex, outVertex);
      relativePosi2++;
    }
  } finally {
    model.endUpdate();
  }

};

const setConnectValidation = (vm) => {
  //validate the connection
  mxGraph.prototype.isValidConnection = (source, target) => {
    //here source and target is object of cell
    const sourceElement = source.data;
    const targetElement = target.data;
    if(sourceElement.hasOwnProperty('output') && targetElement.hasOwnProperty('input')) {
      return sourceElement.output.id == targetElement.input.id;
    }
    return false;
  }
}



export default {
  name: "Editor",

  data() {
    return {
    resElements,
    isFormShow: false,
    nowDefiType: "Definition",
    nowVertexId: -1,
    definitions: [],
    testReset: 0,
  };
  },

  components: {
    FillForm,
  },

  methods: {
    _getValueFromForm: function(vertexId, defiType, defiName, inputs, outputs) {
       //use the data from form to create new definition
      let definition = {
        type: defiType,
        name: defiName,
        inputs: inputs,
        outputs: outputs
      }
      this.definitions.push(definition);
      window.console.log(this.definitions);
      updateVertex(vertexId, definition);
      window.console.log(graph.getChildEdges(graph.getDefaultParent()));
      this.isFormShow = false;
    },

    _listenEvent: function () {
      //listen to graph event
      //listen Add cell event
      graph.addListener(mxEvent.CELLS_ADDED, (sender, evt) => {
        const cell = evt.properties.cells[0]; //root?
        if (graph.isPart(cell)) {
          return;
        }
        if (cell.vertex) {
          this.nowDefiType = cell.getValue();
          this.nowVertexId = cell.getId();
          this.isFormShow = true;
        }
        if(cell.edge) {
          this._adjustConnection(cell);
        }
      });


    },

    _closeForm: function (isFormShow) {
      window.console.log("test the show " + isFormShow)
      this.isFormShow = isFormShow;
    },

    _adjustConnection: function (edge) {

    }

  },

  mounted() {
    initGraph();
    this._listenEvent();
    setConnectValidation(this);
  }
}

</script>

<style lang="less" scoped>
  .title {
    font-size: 22px;
    margin: 20px 0 20px 0;
  }
  #mxContainer {
    background: #efefef;
    width: 100%;
    overflow: scroll;
    height: calc(75vh);
  }
  .mxResElement {
    width: 150px;
    height: 20px;
    font-weight: bold;
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
