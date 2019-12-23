<template>
	<div id="app">
		<EditorNew></EditorNew>
	</div>
</template>

<script>
    import Editor from '../components/Editor.vue'
		import EditorNew from "../components/EditorNew";

    export default {
        name: 'app',
        components: {
					EditorNew,
        }
    }
</script>

<style>
	html {
		min-width: 1400px;
	}
	body {
		margin: 0;
	}
	#app {
		font-family: Arial;
		/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 0;
	}
</style>
