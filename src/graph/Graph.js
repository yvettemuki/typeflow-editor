import mxgraph from './index';
import _ from 'lodash';


const {
    mxGraph,
    mxVertexHandler,
    mxConstants,
    mxCellState,
    mxPerimeter,
    mxCellEditor,
    mxGraphHandler,
    mxEvent,
    mxEdgeHandler,
    mxShape,
    mxConnectionConstraint,
    mxPoint,
    mxEventObject,
    mxCodec,
    mxUtils,
    mxImageExport,
    mxXmlCanvas2D,
    mxSvgCanvas2D,
    mxRectangle,
    mxMouseEvent,
    mxClient,
    mxGraphView,
    Base64,

} = mxgraph;

Object.assign(mxEvent, {
    DEFINITION_DOUBLE_CLICK: 'DEFINITION_DOUBLE_CLICK',
});

export class Graph extends mxGraph {

    constructor(container) {
        super(container);
        this._init();
    }

    _init() {
        this._setDefaultConfig();
        this._setBackgroundDefault();
        this._setCanvasConfig();
        this._configConstituent();
        this._putVertexStyle();
        this._setDefaultEdgeStyle();
        this._setSelectableConfig();
        this._setAnchors();
        this._configCustomEvent();
        this._restoreModel();
        this._updateCanvas();
    }


    _updateCanvas() {
        let graph = this;
        if (graph.container != null) {
            graph.view.validateBackground();
        }
    }

    _configConstituent() {
        // Redirects selection to parent
        this.selectCellForEvent = (...args) => {
            const [cell] = args;
            if (this.isPart(cell)) {
                args[0] = this.model.getParent(cell);
                mxGraph.prototype.selectCellForEvent.call(this, args);
                return;
            }

            mxGraph.prototype.selectCellForEvent.apply(this, args);
        };

        /**
         * Redirects start drag to parent.
         */
        const graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
        mxGraphHandler.prototype.getInitialCellForEvent = function getInitialCellForEvent(...args) {
            // this 是 mxGraphHandler
            let cell = graphHandlerGetInitialCellForEvent.apply(this, args);
            if (this.graph.isPart(cell)) {
                cell = this.graph.getModel().getParent(cell);
            }

            return cell;
        };
    }


    _setBackgroundDefault() {
        this.transparentBackground = false;
        this.pageVisible = true;
        this.preferPageSize = false;
    }

    _setCanvasConfig() {
        // Uses HTML for background pages (to support grid background image)
        mxGraphView.prototype.validateBackgroundPage = function () {
            var graph = this.graph;

            if (graph.container != null && !graph.transparentBackground) {
                if (graph.pageVisible) {
                    window.console.log("validate background page && is page visible");
                    var bounds = this.getBackgroundPageBounds();
                    //console.log("the bound of background page is: " + bounds.height + " " + bounds.width);

                    if (this.backgroundPageShape == null) {
                        window.console.log("in the null");
                        // Finds first element in graph container
                        var firstChild = graph.container.firstChild;
                        window.console.log(firstChild);

                        while (firstChild != null && firstChild.nodeType != mxConstants.NODETYPE_ELEMENT) {
                            window.console.log("in the not null child1");
                            firstChild = firstChild.nextSibling;
                        }

                        if (firstChild != null) {
                            window.console.log("in the not null child2");
                            this.backgroundPageShape = this.createBackgroundPageShape(bounds);
                            this.backgroundPageShape.scale = 1;

                            // Shadow filter causes problems in outline window in quirks mode. IE8 standards
                            // also has known rendering issues inside mxWindow but not using shadow is worse.
                            this.backgroundPageShape.isShadow = !mxClient.IS_QUIRKS;
                            this.backgroundPageShape.dialect = mxConstants.DIALECT_STRICTHTML; //html initial type
                            this.backgroundPageShape.init(graph.container); //append child node into container dom

                            // Required for the browser to render the background page in correct order
                            firstChild.style.position = 'absolute';
                            graph.container.insertBefore(this.backgroundPageShape.node, firstChild);
                            this.backgroundPageShape.redraw();

                            this.backgroundPageShape.node.className = 'geBackgroundPage';
                        }
                    } else {
                        window.console.log("in the not null");
                        let graphBounds = this.getGraphBounds();
                        let scale = this.scale;
                        let gw = graphBounds.width;
                        let gh = graphBounds.height;
                        let gx = graphBounds.x;
                        let gy = graphBounds.y;

                        let pw = currentPageBounds.width;
                        let ph = currentPageBounds.height;

                        let dx = Math.ceil(gw + gx);
                        let dy = Math.ceil(gh + gy);

                        if (dx >= pw || dy >= ph) {
                            if (dx >= pw && dy < ph) {
                                currentPageBounds = new mxRectangle(0, 0, dx * 2, ph);
                            } else if (dx < pw && dy >= ph) {
                                currentPageBounds = new mxRectangle(0, 0, pw, dy*2);
                            } else {
                                currentPageBounds = new mxRectangle(0, 0, dx * 2, dy * 2);
                            }
                        }

                        this.backgroundPageShape.scale = 1;
                        this.backgroundPageShape.bounds = currentPageBounds;
                        graph.pageFormat = currentPageBounds;
                        this.backgroundPageShape.redraw();  //mxShape function to redraw the page(actually the canvas of the editor)
                    }
                } else if (this.backgroundPageShape != null) {
                    this.backgroundPageShape.destroy();
                    this.backgroundPageShape = null;
                }

                //this.validateBackgroundStyles(); //设置backgroundPage的样式，注销表示没有格子样式
            }
        };

        mxGraphView.prototype.getBackgroundPageBounds = function () {
            window.console.log("test in the ")
            var gb = this.getGraphBounds();

            // Computes unscaled, untranslated graph bounds
            window.console.log(gb.x + " " + this.translate.x);
            var x = (gb.width > 0) ? gb.x / this.scale - this.translate.x : 0;
            var y = (gb.height > 0) ? gb.y / this.scale - this.translate.y : 0;
            var w = gb.width / this.scale;
            var h = gb.height / this.scale;

            var fmt = this.graph.pageFormat;
            var ps = this.graph.pageScale;

            var pw = fmt.width * ps;
            var ph = fmt.height * ps;

            var x0 = Math.floor(Math.min(0, x) / pw);
            var y0 = Math.floor(Math.min(0, y) / ph);
            var xe = Math.ceil(Math.max(1, x + w) / pw);
            var ye = Math.ceil(Math.max(1, y + h) / ph);

            var rows = xe - x0;
            var cols = ye - y0;

            var bounds = new mxRectangle(this.scale * (this.translate.x + x0 * pw), this.scale *
              (this.translate.y + y0 * ph), this.scale * rows * pw, this.scale * cols * ph);
            return bounds;
        }
    }

    _setDefaultConfig() {
        this.setConnectable(true);
        mxEvent.disableContextMenu(this.container);

        // 固定节点大小
        this.setCellsResizable(false);

        // 编辑时按回车键不换行，而是完成输入
        this.setEnterStopsCellEditing(true);
        // 编辑时按 escape 后完成输入
        mxCellEditor.prototype.escapeCancelsEditing = false;
        // 失焦时完成输入
        mxCellEditor.prototype.blurEnabled = true;

        // 禁止节点折叠
        this.foldingEnabled = true;
        // 文本包裹效果必须开启此配置
        this.setHtmlLabels(true);

        // 拖拽过程对齐线
        mxGraphHandler.prototype.guidesEnabled = true;

        // 禁止游离线条
        this.setDisconnectOnMove(false);
        this.setAllowDanglingEdges(false);
        mxGraph.prototype.isCellMovable = cell => !cell.edge;

        // 禁止调整线条弯曲度
        this.setCellsBendable(false);

        // 禁止从将label从线条上拖离
        mxGraph.prototype.edgeLabelsMovable = false;

    }

    _setSelectableConfig() {
        mxGraph.prototype.isCellSelectable = function (cell) {
            var state = this.view.getState(cell);
            var style = (state != null) ? state.style : this.getCellStyle(cell);

            return this.isCellsSelectable() && !this.isCellLocked(cell) && style['selectable'] != 0;
        }
    }

    _putVertexStyle() {
        const normalTypeStyle = {
            [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_IMAGE,
            [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
        };
        this.getStylesheet().putCellStyle('normalType', normalTypeStyle);

        const functionNodeStyle = {
            [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_LABEL,
            [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
            [mxConstants.STYLE_ROUNDED]: true,
            [mxConstants.STYLE_ARCSIZE]: 8,

            [mxConstants.STYLE_STROKECOLOR]: '#42b982',
            [mxConstants.STYLE_FONTCOLOR]: '#ffffff',
            [mxConstants.STYLE_FILLCOLOR]: '#42b982',
            [mxConstants.STYLE_FONTSTYLE]: mxConstants.FONT_BOLD,
            [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: '#42b982',
            [mxConstants.STYLE_FONTSIZE]: 20,
            [mxConstants.STYLE_ALIGN]: mxConstants.ALIGN_CENTER,
            [mxConstants.STYLE_WHITE_SPACE]: 'wrap',
            [mxConstants.WORD_WRAP]: 'break-word'
            //[mxConstants.STYLE_VERTICAL_ALIGN]: mxConstants.ALIGN_TOP,
        };
        this.getStylesheet().putCellStyle('function_node', functionNodeStyle);

        const endPointNodeStyle = {
            [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_LABEL,
            [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
            [mxConstants.STYLE_ROUNDED]: true,
            [mxConstants.STYLE_ARCSIZE]: 8,

            // [mxConstants.STYLE_STROKECOLOR]: '#42b983',
            [mxConstants.STYLE_STROKECOLOR]: '#34495d',
            [mxConstants.STYLE_FONTCOLOR]: '#ffffff',
            [mxConstants.STYLE_FILLCOLOR]: '#34495d',
            [mxConstants.STYLE_FONTSTYLE]: mxConstants.FONT_BOLD,
            [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: '#34495d',
            [mxConstants.STYLE_FONTSIZE]: 20,
            [mxConstants.STYLE_ALIGN]: mxConstants.ALIGN_CENTER,
            [mxConstants.STYLE_WHITE_SPACE]: 'wrap',
            [mxConstants.WORD_WRAP]: 'break-word'
            //[mxConstants.STYLE_VERTICAL_ALIGN]: mxConstants.ALIGN_TOP,
        };
        this.getStylesheet().putCellStyle('endpoint_node', endPointNodeStyle);

        const resourceNodeStyle = {
            [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_LABEL,
            [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
            [mxConstants.STYLE_ROUNDED]: true,
            [mxConstants.STYLE_ARCSIZE]: 8,
            // [mxConstants.STYLE_STROKECOLOR]: '#1089ff',
            [mxConstants.STYLE_STROKECOLOR]: '#34495d',
            [mxConstants.STYLE_FONTCOLOR]: '#ffffff',
            [mxConstants.STYLE_FILLCOLOR]: '#34495d',
            [mxConstants.STYLE_FONTSTYLE]: mxConstants.FONT_BOLD,
            [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: '#34495d',
            [mxConstants.STYLE_FONTSIZE]: 20,
            [mxConstants.STYLE_ALIGN]: mxConstants.ALIGN_CENTER,
            [mxConstants.STYLE_WHITE_SPACE]: 'wrap',
            [mxConstants.WORD_WRAP]: 'break-word'
        };
        this.getStylesheet().putCellStyle('resource_node', resourceNodeStyle);

        const inOutNodeStyle = {
            [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_LABEL,
            [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
            [mxConstants.STYLE_ROUNDED]: true,
            [mxConstants.STYLE_ARCSIZE]: 8,
            [mxConstants.STYLE_STROKECOLOR]: '#ffdc34',
            [mxConstants.STYLE_FONTCOLOR]: '#ffffff',
            [mxConstants.STYLE_FILLCOLOR]: '#f7be16',
            [mxConstants.STYLE_FONTSIZE]: 12,
            [mxConstants.STYLE_FONTSTYLE]: mxConstants.FONT_BOLD,
            [mxConstants.STYLE_ALIGN]: mxConstants.ALIGN_CENTER,
        }
        this.getStylesheet().putCellStyle('inout_node', inOutNodeStyle);

        const exceptOutNodeStyle = {
            [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_LABEL,
            [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
            [mxConstants.STYLE_ROUNDED]: true,
            [mxConstants.STYLE_ARCSIZE]: 8,
            [mxConstants.STYLE_STROKECOLOR]: '#EA5E5E',
            [mxConstants.STYLE_FONTCOLOR]: '#ffffff',
            [mxConstants.STYLE_FILLCOLOR]: '#EA5E5E',
            [mxConstants.STYLE_FONTSIZE]: 12,
            [mxConstants.STYLE_FONTSTYLE]: mxConstants.FONT_BOLD,
            [mxConstants.STYLE_ALIGN]: mxConstants.ALIGN_CENTER,
        }
        this.getStylesheet().putCellStyle('exceptout_node', exceptOutNodeStyle);

        const alterOutNodeStyle = {
            [mxConstants.STYLE_SHAPE]: mxConstants.SHAPE_LABEL,
            [mxConstants.STYLE_PERIMETER]: mxPerimeter.RectanglePerimeter,
            [mxConstants.STYLE_ROUNDED]: true,
            [mxConstants.STYLE_ARCSIZE]: 8,
            [mxConstants.STYLE_STROKECOLOR]: '#F58B54',
            [mxConstants.STYLE_FONTCOLOR]: '#ffffff',
            [mxConstants.STYLE_FILLCOLOR]: '#F58B54',
            [mxConstants.STYLE_FONTSIZE]: 12,
            [mxConstants.STYLE_FONTSTYLE]: mxConstants.FONT_BOLD,
            [mxConstants.STYLE_ALIGN]: mxConstants.ALIGN_CENTER,
        }
        this.getStylesheet().putCellStyle('alterout_node', alterOutNodeStyle);

        const defiTypeNodeStyle = {
            [mxConstants.STYLE_STROKECOLOR]: 'none',
            [mxConstants.STYLE_FILLCOLOR]: 'none',
            [mxConstants.STYLE_FONTCOLOR]: '#beebe9',
            [mxConstants.STYLE_FONTSIZE]: '12',
            [mxConstants.STYLE_FONTSTYLE]: '1',
            [mxConstants.STYLE_SPACING_TOP]: '2',
        }
        this.getStylesheet().putCellStyle('defitype_node', defiTypeNodeStyle);

        // 设置选中状态节点的边角为圆角，默认是直角
        const oldCreateSelectionShape = mxVertexHandler.prototype.createSelectionShape;
        mxVertexHandler.prototype.createSelectionShape = function createSelectionShape(...args) {
            const res = oldCreateSelectionShape.apply(this, args);
            res.isRounded = true;
            // style 属性来自 mxShape , mxRectangle 继承自 mxShape
            res.style = {
                arcSize: 6,
            };
            return res;
        };
    }

    _setDefaultEdgeStyle() {
        const style = this.getStylesheet().getDefaultEdgeStyle();
        Object.assign(style, {
            [mxConstants.STYLE_ROUNDED]: true, // 设置线条拐弯处为圆角
            [mxConstants.STYLE_STROKEWIDTH]: '2',
            [mxConstants.STYLE_STROKECOLOR]: '#333333',
            [mxConstants.STYLE_EDGE]: mxConstants.EDGESTYLE_TOPTOBOTTOM,
            // [mxConstants.STYLE_EDGE]: mxEdgeStyle.TopToBottom,
            [mxConstants.STYLE_FONTCOLOR]: '#33333',
            [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: '#ffa94d',
            "selectable": '0'
        });
        // 设置拖拽线的过程出现折线，默认为直线
        this.connectionHandler.createEdgeState = () => {
            const edge = this.createEdge();
            return new mxCellState(this.view, edge, this.getCellStyle(edge));
        };
    }

    _setAnchors() {
        // 禁止从节点中心拖拽出线条
        this.connectionHandler.isConnectableCell = () => false;


        // Overridden to define per-shape connection points
        mxGraph.prototype.getAllConnectionConstraints = (terminal) => {
            if (terminal != null && terminal.shape != null) {
                if (terminal.shape.stencil != null) {
                    if (terminal.shape.stencil != null) {
                        return terminal.shape.stencil.constraints;
                    }
                } else if (terminal.shape.constraints != null) {
                    return terminal.shape.constraints;
                }
            }

            return null;
        };

        // Defines the default constraints for all shapes
        mxShape.prototype.constraints = [
            new mxConnectionConstraint(new mxPoint(0.5, 0), true),
            new mxConnectionConstraint(new mxPoint(0.5, 1), true)];

    }

    _configCustomEvent() {
        const graph = this;
        const oldStart = mxEdgeHandler.prototype.start;
        mxEdgeHandler.prototype.start = function start(...args) {
            oldStart.apply(this, args);
            graph.fireEvent(new mxEventObject(mxEvent.EDGE_START_MOVE,
                'edge', this.state.cell,
                'source', this.isSource,
            ));
        };


        const oldCreatePreviewShape = mxGraphHandler.prototype.createPreviewShape;
        mxGraphHandler.prototype.createPreviewShape = function createPreviewShape(...args) {
            graph.fireEvent(new mxEventObject(mxEvent.VERTEX_START_MOVE));
            return oldCreatePreviewShape.apply(this, args);
        };
    }

    _restoreModel() {
        Object.values(this.getModel().cells)
          .forEach(cell => {
              if (cell.vertex && cell.data) {
                  cell.data = JSON.parse(cell.data);
              }
          });
    }

    //the custom data should be stringify
    _getExportModel() {
        const model = _.cloneDeep(this.getModel());
        Object.values(model.cells)
          .forEach(cell => {
              if(cell.vertex && cell.data) {
                  cell.data = JSON.stringify(cell.data);
              }
          });
        return model;
    }

    isPart(cell) {
        const state = this.view.getState(cell);
        const style = (state != null) ? state.style : this.getCellStyle(cell);
        return style.constituent === 1;
    }


    exportModelXML() {
        var encoder = new mxCodec(mxUtils.createXmlDocument());
        var node = encoder.encode(this._getExportModel());
        return mxUtils.getPrettyXml(node);
        // mxUtils.popup(mxUtils.getPrettyXml(node), false);
    }

    exportPicXML() {
        const xmlDoc = mxUtils.createXmlDocument();
        const root = xmlDoc.createElement('output');
        xmlDoc.appendChild(root);

        const {scale} = this.view;
        // 这个项目画布边宽为0，可以自行进行调整
        const border = 10;

        const bounds = this.getGraphBounds();
        const xmlCanvas = new mxXmlCanvas2D(root);
        xmlCanvas.translate(
            Math.floor((border / scale - bounds.x) / scale),
            Math.floor((border / scale - bounds.y) / scale),
        );
        xmlCanvas.scale(1);

        const imgExport = new mxImageExport();
        imgExport.drawState(this.getView().getState(this.model.root), xmlCanvas);

        const w = Math.ceil(bounds.width * scale / scale + 2 * border);
        const h = Math.ceil(bounds.height * scale / scale + 2 * border);

        const xml = mxUtils.getPrettyXml(root);

        return {
            xml: xml,
            width: w,
            height: h,
        };
    }

    exportModelSvg() {
        var scale = this.view.scale;
        var bounds = this.getGraphBounds();
        var border = 10;

        // Prepares SVG document that holds the output
        var svgDoc = mxUtils.createXmlDocument();
        var root = (svgDoc.createElementNS != null) ?
          svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');

        if (root.style != null) {
            root.style.backgroundColor = '#FFFFFF';
        } else {
            root.setAttribute('style', 'background-color:#FFFFFF');
        }

        if (svgDoc.createElementNS == null) {
            root.setAttribute('xmlns', mxConstants.NS_SVG);
        }
        var width = Math.ceil(bounds.width * scale / scale + 2 * border);
        var height = Math.ceil(bounds.height * scale / scale + 2 * border);
        root.setAttribute('class', 'svg-container');
        root.setAttribute('width', width + 'px');
        root.setAttribute('height', height + 'px');
        root.setAttribute('viewBox', "0 0 " + width + " " + height);
        root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
        root.setAttribute('version', '1.1');

        // Adds group for anti-aliasing via transform
        var group = (svgDoc.createElementNS != null) ?
          svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
        group.setAttribute('transform', 'translate(0.5,0.5)');
        root.appendChild(group);
        svgDoc.appendChild(root);

        // Renders graph. Offset will be multiplied with state's scale when painting state.
        var svgCanvas = new mxSvgCanvas2D(group);
        svgCanvas.translate(Math.floor(border / scale - bounds.x), Math.floor(border / scale - bounds.y));
        svgCanvas.scale(scale);

        var imgExport = new mxImageExport();
        imgExport.drawState(this.getView().getState(this.model.root), svgCanvas);

        //var xml = encodeURIComponent(mxUtils.getXml(root)); //no need
        var xml = mxUtils.getXml(root);
        return xml;

    }

    importModelFromXML(xml) {
        graph.getModel().beginUpdate();
        try {
            var doc = mxUtils.parseXml(xml);
            var codec = new mxCodec(doc);
            codec.decode(doc.documentElement, graph.getModel());
        } finally {
            graph.getModel().endUpdate();
        }
        this._restoreModel();
    }

    isGraphEmpty() {
        let count = graph.getModel().getChildCount(graph.getDefaultParent());
        if (count <= 0) {
            return true;
        }
        return false;
    }

    updateBackgroundPage(selected) {
        window.console.log("in the update");
        let newBounds;
        if (selected.includes('a4')) {
            newBounds = new mxRectangle(0, 0, 827, 1169);
        } else if (selected.includes('a5')) {
            newBounds = new mxRectangle(0, 0, 583, 827);
        } else {
            newBounds = new mxRectangle(0, 0, 400, 400);
        }
        graph.view.backgroundPageShape.bounds = newBounds;
        graph.view.backgroundPageShape.scale = 1;
        graph.view.backgroundPageShape.redraw();
        currentPageBounds = newBounds;
    }

}

let graph = {};
let currentPageBounds = mxConstants.PAGE_FORMAT_A4_PORTRAIT;

export const destroyGraph = () => {
    graph.destroy();
    graph = {};
};

export const genGraph = (container) => {
    graph = new Graph(container);
    //set the graph can zoom
    graph.centerZoom = true;
    return graph;
};

export const getGraph = () => graph;
