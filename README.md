# typeflow-editor
### build with the vue and mxGraph
### backend resource: https://github.com/yvettemuki/editor-service

## Introduction
### Core appearance
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/home2.0.png" width="100%">


### After drag the one of the elements in three types of Definition(PureFunction/InputEndpoint/OutputEndpoint), the form will display to fill 
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/inputForm.png" width="60%">


### After fill some Definition creating forms, you can connect them in the rule:
###### only same the name output of one Definition instance can connect to another Definition instance's same name input
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/connection_1.png" width="50%">
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/connection_2.png" width="50%">


### After finish dragging elements, filling their forms and connecting them, you will get the typeflow model 
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/draw.png" width="100%">


### To check or update the created elements you can *double click* the Definition vertex (InputEndpoint, OutputEndpoint, PureFunction) 
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/update1.png" width="40%">
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/update2.png" width="40%">


### To *undo*, *redo*, *delete*, *zoom*(in/out), you can use the left side tools which are on the bottom of the panel
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/toolbar2.0.png" width="20%">


### To *import model*, *export model*, *generate code* and *save model*, you can click the buttons on the top side
###### export can choose 3 types: png, svg and xml
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/file_multipulate.png" width="40%">
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/export.png" width="10%">


### When import, you can choose import *from local* or *from database*
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/import_selection.png" width="50%">


### When from *database*, and you can delete model when click the "delete" button on the right top side of each item
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/import_choose.png" width="100%">


### To check some model information
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/model_info.png" width="20%">

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
