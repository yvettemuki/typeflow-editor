<template>
  <div id="app">
    <Editor></Editor>
  </div>
</template>

<script>
import Editor from '../components/Editor.vue'

export default {
  name: 'app',
  components: {
    Editor
  }
}
</script>

<style>
html {
  min-width: 1400px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
