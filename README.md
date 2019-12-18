# typeflow-editor
### build with the vue and mxGraph
### backend resource: https://github.com/yvettemuki/editor-service

## Introduction
### Core appearance
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/home.png" width="100%">


### After drag the one of the elements in "definitions", the form will display to fill 
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/inputForm.png" width="60%">


### After finishing creating your typflow-model
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/draw.png" width="100%">


### To **check or update** the created elements you can **double click** the Definition vertex (InputEndpoint, OutputEndpoint, PureFunction) 
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/update1.png" width="60%">
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/update2.png" width="60%">


### To **delete**, **zoom**(in/out), **export**, **import** or **save**, use the left tool bar
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/toolbar.png" width="20%">


### When import, you can choose import **from local** or **from database**
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/import_choose.png" width="50%">


### When from **database**
<img src="https://github.com/yvettemuki/typeflow-editor/raw/master/static/images/choose_panel.png" width="100%">


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
