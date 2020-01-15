# typeflow-editor
### build with the vue and mxGraph
### backend resource: https://github.com/yvettemuki/editor-service

## Introduction
### Core appearance
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/home.png" width="100%">

### Left side is the element bar including different types of draggable resources, and also including the graph page setting bar of its size
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/element_bar.png" width="30%">

### To add custom element, click the "+" icon in specific element bar and input the new type name to create new one
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/add_element.png" width="30%">

### To set the specific element type group, click the "gear" icon to open the element type setting panel
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/element_setting.png" width="60%">

### After drag the one of the elements in three types of Definition(PureFunction/InputEndpoint/OutputEndpoint), the form will display to fill 
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/inputForm.png" width="60%">


### After fill some Definition creating forms, you can connect them in the rule:
###### only same the name output of one Definition instance can connect to another Definition instance's same name input
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/connection_1.png" width="30%">
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/connection_2.png" width="30%">


### After finish dragging elements, filling their forms and connecting them, you will get the typeflow model 
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/draw.png" width="100%">


### To check or update the created elements you can *double click* the Definition vertex (InputEndpoint, OutputEndpoint, PureFunction) 
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/update1.png" width="50%">
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/update2.png" width="60%">


### To *undo*, *redo*, *delete*, *zoom*(in/out), you can right side float toolbar
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/toolbar.png" height="300px">


### To *import model*, *export model*, *generate code* and *save model*, you can click the buttons on the top side
###### export can choose 3 types: png, svg and xml
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/file_multipulate.png" width="40%">
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/export.png" width="10%">


### When import, you can choose import *from local* or *from database*
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/import_selection.png" width="50%">


### When from *database*, and you can delete model when click the "delete" button on the right top side of each item
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/import_choose.png" width="80%">


### To check some model information
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/model_info.png" width="30%">

### When you click the "?" icon, you can get the guidance about how to use typeflow editor
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/help_msg.png" width="100%">
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/help_msg_2.png" width="100%">

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Attention:
Default port is 8080, if you need see vue cli3 document to change the default port

When you change the backend server address(port), you need to change the proxy in vue.config.js file 
