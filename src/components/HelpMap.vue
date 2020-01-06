<template>
	<div class="help-container">
		<div id="drag-item">
			<Rectangle color="#1C86EE" radius="4" height="700" width="250" border-width="2"/>
			<img src="../assets/arrow.png" class="arrow-img"/>
			<div class="font-area"><span class="help-type">Draggable Area</span><br> Elements is composed with 5 types: <br>Definiton, InputEndpoint, OutputEndpoint, Other Resources and Custom Components.</div>
		</div>
	</div>
</template>

<script>
	import Rectangle from "./Rectangle";
	export default {
		name: "HelpMap",
		components: {Rectangle}
	}
</script>

<style lang="less" scoped>
	.help-container {
		position: relative;
		height: 100%;
		width: 100%;
	}
	.rectangle {
		height: 700px;
		width: 250px;
		border: 2px solid #1a7edf;
		border-radius: 4px;
	}
	#drag-item {
		position: absolute;
		top: 100px;
		left: 10px;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	.font-area {
		margin-left: 30px;
		text-align: left;
	}
	.help-type {
		font-weight: bold;
		font-size: 18px;
	}
	.arrow-img {
		height: 32px;
		margin-left: 20px;
	}
</style>