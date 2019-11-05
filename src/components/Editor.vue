<template>
  <Panel title="typeflow-container">
    <div id="mxContainer"></div>
  </Panel>
</template>

<script>
    import mxgraph from "../graph/index";
    import Panel from "./Panel";
    // eslint-disable-next-line no-unused-vars
    const {mxGraph, mxClient, mxCodec, mxUtils, mxConstants, mxPerimeter} = mxgraph;

    const initGraph = (container) => {
        if(!mxClient.isBrowserSupported())
        {
            mxUtils.error('Browser is not supported!', 200, false);
        }
        else
        {

            var graph = new mxGraph(container);
            var parent = graph.getDefaultParent();
          graph.getModel().beginUpdate();
            try
            {
              var v1 = graph.insertVertex(parent, null, 'InputEndpoint', 20, 20, 80, 30);
              var v2 = graph.insertVertex(parent, null, 'PureFunction', 20, 100, 80, 30);
              var v3 = graph.insertVertex(parent, null, 'OutputEndpoint', 20, 180, 80, 30);
              graph.insertEdge(parent, null, '', v1, v2);
              graph.insertEdge(parent, null, '', v2, v3);
            }
            finally
            {
              graph.getModel().endUpdate();
            }

        }
    };

    export default {
        name: "Editor",

        components: {
            Panel
        },

        methods: {

        },

        mounted() {
            initGraph(document.getElementById('mxContainer'));

        }
    }


</script>

<style lang="less" scoped>

</style>