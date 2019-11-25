<template>
  <div class="typeflow-container">
    <div class="title"><b>Typeflow Editor</b></div>
    <div
      v-if="isFormShow"
      class="form-cover">
      <FillForm :type="nowDefiType" :id="nowVertexId" :formType="'ADD_FORM_TYPE'" v-on="{
        getValueFromForm: _getValueFromForm,
        closeForm: _closeForm
    }"/>
    </div>
    <div
      v-if="isCheckShow"
      class="form-cover">
      <FillForm :definition="nowSelectedDefi" :id="nowVertexId" :formType="'CHECK_OR_CHANGE_FORM_TYPE'"
        v-on="{
        changeValueFromForm: _changeValueFromForm,
        closeFormDoneNothing: _closeFormDoneNothing
        }"/>
    </div>
    <div
      v-if="isResFormShow"
      class="form-cover">
      <SimpleInput title="Resource" :id="nowVertexId"
        v-on="{
          getValueFromSimpleForm: _getValueFromResForm,
          closeSimpleForm: _closeResForm
        }"/>
    </div>
    <div class="main-container">
      <ul id="definitionList">
        <span class="left-elements-title"><b>Definitions</b></span>
        <div class="left-basic-li">
          <li
            v-for="(ele, idx) in resElements"
            :key="idx">
            <div
              v-if="ele.defiType == 'PureFunction'"
              :data-type="ele.defiType"
              class="mxResElement leftElement"
              id="pureFunctionElement">
              {{ele.defiType}}
            </div>
            <div
              v-else
              :data-type="ele.defiType"
              class="mxResElement leftElement"
              id="endpointElement">
              {{ele.defiType}}
            </div>
          </li>
        </div>
        <span class="left-elements-title"><b>Resources</b></span>
        <div class="left-basic-li">
          <li
            class="mxResElement leftElement resourceElement"
            :data-type="'Resource'">Resource</li>
        </div>
        <span class="left-elements-title"><b>Tools</b></span>
        <div class="left-basic-li function-div">
          <li class="leftElement functionElement deleteSelected" @click="_deleteSelected">Delete</li>
          <li class="leftElement functionElement save">Save</li>
          <li class="leftElement functionElement export">Export PNG</li>
          <li class="leftElement functionElement export" @click="_toXML">Export XML</li>
        </div>
        <span class="left-elements-title"><b>Zoom</b></span>
        <li class="zoom-li">
          <Add weight="4" size="16" radius="100" color="#000000" @click.native="_zoomIn"></Add>
          <Delete height="4" width="16" radius="999" color="#000000" @click.native="_zoomOut"></Delete>
        </li>
      </ul>
      <div class="container-border"><div id="mxContainer"></div></div>
    </div>
<!--    <div id="test-font-width"></div>-->
  </div>
</template>
<script>
import mxgraph from "../graph/index";
import FillForm from "./FillForm";
import {genGraph, destroyGraph, Graph} from "../graph/Graph";
import {resElements} from "../common/data";
import Add from "./Add";
import Delete from "./Delete";
import SimpleInput from "./SimpleInput";

const {
  mxEvent,
  mxCell,
  mxGeometry,
  mxUtils,
  mxGraph,
  mxEventObject,
} = mxgraph;

const ADD_FORM_TYPE = "ADD_FROM_TYPE";
const CHECK_OR_CHANGE_FORM_TYPE = "CHECK_OR_CHANGE_FORM_TYPE";

let graph = null;
let idSeed = -1;

const initGraph = () => {
  graph = genGraph(document.getElementById('mxContainer'));
  makeDraggable(document.getElementsByClassName('mxResElement'));
  listenGraphEvent();
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
  let newVertex;
  if (defiType == 'PureFunction') {
    newVertex = new mxCell(defiType, new mxGeometry(0, 0, 160, 50), `function_node`);
    //customize new type data, to store vertex id \ type \ content
    newVertex.data = {
      definition: null
    }
  }
  else if (defiType == 'InputEndpoint' || defiType == 'OutputEndpoint') {
    newVertex = new mxCell(defiType, new mxGeometry(0, 0, 160, 50), `endpoint_node`);
    newVertex.data = {
      definition: null
    }
  }
  else {
    newVertex = new mxCell(defiType, new mxGeometry(0, 0, 160, 50), `resource_node`);
  }
  newVertex.vertex = true;
  const cells = graph.importCells([newVertex], x, y, target);
  if(cells != null && cells.length > 0) {
    graph.setSelectionCells(cells);
  }

};

const updateVertex = (vertexId, definition) => {
  var defiVertex = graph.getModel().getCell(vertexId);
  graph.getModel().setValue(defiVertex, definition.name);
  defiVertex.data.definition = definition;

  let width = calFontWidth(definition.name);
  var geo = graph.getCellGeometry(defiVertex);
  geo = geo.clone();
  geo.width = width;
  graph.getModel().setGeometry(defiVertex, geo);

  let x = defiVertex.getGeometry().x;
  let y = defiVertex.getGeometry().y;

  var typeVertex = graph.insertVertex(defiVertex, null, definition.type,
    0, 0, width, 20,
    `defitype_node;constituent=1;`,
    true);
  typeVertex.setConnectable(false);

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
      var inVertex = graph.insertVertex(parent, null, inputs[idx].id, x+relativePosi*110+width/2-50, y-90, 100, 30, `inout_node`);
      //add the 'data' to identify the vertex for the connection validation
      inVertex.data = {
        input: inputs[idx]
      }
      let edge = graph.insertEdge(parent, null, '', inVertex, defiVertex);
      edge.setConnectable(false);
      relativePosi++;
    }
    //update outputs(common + alternative + exception)
    let commonOutputs = definition.outputs;
    let alterOutputs = definition.alternativeOutputs;
    let exceptionOutputs = definition.exceptionOutputs;

    let len2 = commonOutputs.length + alterOutputs.length + exceptionOutputs.length;
    let mid2 = Math.floor(len2 / 2);
    let relativePosi2 = -mid2;
    for(let idx = 0; idx < commonOutputs.length; idx++) {
      let outVertex = graph.insertVertex(parent, null, commonOutputs[idx].id, x+relativePosi2*110+width/2-50, y+90+30, 100, 30, `inout_node`);
      outVertex.data = {
        output: commonOutputs[idx]
      }
      let edge = graph.insertEdge(parent, null, '', defiVertex, outVertex);
      edge.setConnectable(false);
      relativePosi2++;
    }
    for(let idx = 0; idx < alterOutputs.length; idx++) {
      let outVertex = graph.insertVertex(parent, null, alterOutputs[idx].id, x+relativePosi2*110+width/2-50, y+90+30, 100, 30, `alterout_node`);
      outVertex.data = {
        alterOutputs: alterOutputs[idx]
      }
      let edge = graph.insertEdge(parent, null, '', defiVertex, outVertex);
      edge.setConnectable(false);
      relativePosi2++;
    }
    for(let idx = 0; idx < exceptionOutputs.length; idx++) {
      let outVertex = graph.insertVertex(parent, null, exceptionOutputs[idx].id, x+relativePosi2*110+width/2-50, y+90+30, 100, 30, `exceptout_node`);
      outVertex.data = {
        exceptionOutputs: exceptionOutputs[idx]
      }
      let edge = graph.insertEdge(parent, null, '', defiVertex, outVertex);
      edge.setConnectable(false);
      relativePosi2++;
    }
  } finally {
    model.endUpdate();
  }

};

const updateResVertex = (id, name) => {
  let resVertex = graph.getModel().getCell(id);
  graph.getModel().setValue(resVertex, name);
  // let width = calFontWidth(name);
  // var geo = graph.getCellGeometry(resVertex);
  // geo = geo.clone();
  // geo.width = width;
  // graph.getModel().setGeometry(resVertex, geo);
}

const adjustVertexWidth = (vertex, width) => {

}

const setConnectValidation = (vm) => {
  //validate the connection
  mxGraph.prototype.isValidConnection = (source, target) => {
    //here source and target is object of cell
    window.console.log("int the conncetion validate")
    const sourceElement = source.data;
    const targetElement = target.data;
    if(sourceElement.hasOwnProperty('output') && targetElement.hasOwnProperty('input')) {
      return sourceElement.output.id == targetElement.input.id;
    }
    return false;
  }
};

const listenGraphEvent = () => {
  graph.addListener(mxEvent.CLICK, (sender, evt) => {
    let e = evt.getProperty('event');
    let cell = evt.getProperty('cell');

    if(!cell) {
      return;
    }

    const clickDefinition = cell.style.includes('endpoint_node') || cell.style.includes('function_node') || cell.style.includes('definame_node');
    if(clickDefinition) {
      window.console.log("click definition event");
      if(cell.style.includes('definame_node')) {
        graph.fireEvent(new mxEventObject(mxEvent.DEFINITION_CLICK, 'cell', cell.parent));
      } else {
        graph.fireEvent(new mxEventObject(mxEvent.DEFINITION_CLICK, 'cell', cell));
      }
    }
  })
};

const calFontWidth = (str) => {
  let len = str.length;
  len = (len * 14 + 4) > 160 ? (len * 14 + 4) : 160;
  return len;
}



export default {
  name: "Editor",

  data() {
    return {
    resElements,
    isFormShow: false,
    nowDefiType: "Definition",
    nowVertexId: -1,
    nowSelectedDefi: {
      type: '',
      name: '',
      inputs: '',
      outputs: [],
      alternativeOutputs: [],
      exceptionOutputs: []
    },
    definitions: [],
    isAutoAdd: false,
    isCheckShow: false,
    isResFormShow: false,
  };
  },

  components: {
    SimpleInput,
    Delete,
    Add,
    FillForm,
  },

  methods: {
    _getValueFromForm: function(vertexId, defiType, defiName, inputs, outputs, alternativeOutputs, exceptionOutputs) {
       //use the data from form to create new definition
      let definition = {
        type: defiType,
        name: defiName,
        inputs: inputs,
        outputs: outputs,
        alternativeOutputs: alternativeOutputs,
        exceptionOutputs: exceptionOutputs,
      }
      this.definitions.push(definition);
      this.isAutoAdd = true;
      updateVertex(vertexId, definition);
      this.isAutoAdd = false;
      window.console.log(graph.getChildEdges(graph.getDefaultParent()));
      this.isResFormShow = false; //??????????????? why must
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
          if(cell.value == 'PureFunction' || cell.value == 'InputEndpoint' || cell.value == 'OutputEndpoint') {
            this.nowDefiType =  cell.getValue();
            this.nowVertexId = cell.getId();
            this.isFormShow = true;
          } else {
            //window.console.log(cell.value);
            this.nowVertexId = cell.getId();
            this.isResFormShow = true;
          }
        }
        if(cell.edge) {
          cell.setConnectable(false);
          if(!this.isAutoAdd) {
            this._adjustConnection(cell);
          }
        }
      });

      //listen to click event
      graph.addListener(mxEvent.DEFINITION_CLICK, this._showSelectedDefinitionForm);
    },

    _closeForm: function (id) {
      let deleteVertex = graph.getModel().getCell(id);
      graph.setSelectionCell(deleteVertex);
      deleteVertex.removeFromParent();
      graph.clearSelection();
      graph.refresh(deleteVertex);
      this.isFormShow = false;
    },

    _closeResForm: function (id) {
      let deleteVertex = graph.getModel().getCell(id);
      graph.setSelectionCell(deleteVertex);
      deleteVertex.removeFromParent();
      graph.clearSelection();
      graph.refresh(deleteVertex);
      this.isResFormShow = false;
    },

    _adjustConnection: function (edge) {
      //change the target
      let target = edge.target;
      let targetEdge = target.edges[0];
      let newTarget = targetEdge.target; //from now target always in index 0
      edge.target = newTarget;
      graph.connectCell(edge, newTarget, false);

      //delete the old unused edge
      graph.setSelectionCell(targetEdge);
      targetEdge.removeFromParent();
      graph.setSelectionCell(target);
      target.removeFromParent();

      graph.refresh(target.edges[0]);
      graph.refresh(target);
    },

    _toXML: function () {
      graph.exportModelXML();
    },

    _deleteSelected: function () {
      let target = graph.getSelectionCell();
      target.removeFromParent();
      graph.clearSelection();
      graph.refresh(target);
    },

    _zoomIn: function () {
      graph.zoomIn();
    },

    _zoomOut: function () {
      graph.zoomOut();
    },

    _showSelectedDefinitionForm (sender, evt) {
      let cell = evt.getProperty('cell');
      this.nowVertexId = cell.id;
      let definition = cell.data;
      this.nowSelectedDefi = definition;
      window.console.log(definition);
      window.console.log(definition.name);
      window.console.log(this.nowSelectedDefi.name);
      // this.isCheckShow = true;
    },

    _closeFormDoneNothing: function () {
      this.isCheckShow = false;
    },

    _changeValueFromForm: function () {
      this.$message.info("test change value from form");
    },

    _getValueFromResForm: function (id, name) {
      updateResVertex(id, name);
      this.isResFormShow = false;
    },

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
    height: 100%;
  }
  .container-border {
    height: calc(80vh);
    min-width: 980px;
    width: 100%;
    padding: 8px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0px 1px 2px 1.5px #e3e3e3;
  }
  .main-container {
    display: flex;
    flex-direction: row;
    padding: 0 30px 10px 30px;
  }
  .leftElement {
    height: 40px;
    width: 150px;
    line-height: 40px;
    border-radius: 4px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 10px;
    margin-top: 10px;
    cursor: cell;
  }
  #pureFunctionElement {
    /*background: #00918e;*/
    background: #42b982;
  }
  #endpointElement {
    /*background: #42b982;*/
    background: #34495d;
  }
  .functionElement {
    background: #4dd599;
    cursor: pointer;
  }
  .functionElement:hover {
    background: #45bf89;
  }
  .deleteSelected {
    background: #64caed;
  }
  .deleteSelected:hover {
    background: #e35351;
  }
  .export {
    background: #4f81c7;
  }
  .export:hover {
    background: #4775b4;
  }
  .save {
    background: #64c4ed;
  }
  .save:hover {
    background: #f28633;
  }
  #definitionList {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
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
  .zoom-li {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background: #ffffff;
    padding: 0px 10px 0px 10px;
    border-radius: 999px;
    box-shadow: 0px 1px 2px 1.5px #e3e3e3;
  }
  .left-basic-li {
    padding: 0px 10px 0px 10px;
    margin-bottom: 30px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 1.5px #e3e3e3;
  }
  .left-elements-title {
    margin-bottom: 10px;
    font-size: 14px;
  }
  #test-font-width {
    position: absolute;
    height: auto;
    width: auto;
    visibility: hidden;
    white-space: nowrap;
    z-index: -999;
  }
  .resourceElement {
    background: #00918e;
  }
</style>
