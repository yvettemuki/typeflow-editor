<template>
	<ul class="selector-container" id="selector">
		<li class="selection-item" @click="_exportPNG"><b>PNG</b></li>
		<li class="selection-item" @click="_exportSVG"><b>SVG</b></li>
		<li class="selection-item" @click="_exportXML"><b>XML</b></li>
	</ul>
</template>

<script>
	export default {
		name: "Selector",
		props: {
		},
		data() {
			return {

			}
		},
		methods: {
			_exportPNG: function () {
				this.$emit('exportPNG');
			},

			_exportSVG: function () {
				this.$emit('exportSVG');
			},

			_exportXML: function () {
				this.$emit('exportXML');
			},
		}
	}
</script>

<style lang="less" scoped>
	.selector-container {
		position: relative;
		z-index: 999;
		top: 6px;
		height: 80px;
		width: 80px;
		border-radius: 4px;
		background: #ffffff;
		box-shadow: 0px 2px 8px 0px #EDEDED;
		margin: 0;
		padding: 10px 0px;
	}
	.selection-item {
		font-size: 10px;
		color: #333333;
		padding: 0 20px;
	}
	.selection-item:hover {
		background: #315B96;
		color: #ffffff;
	}
</style>