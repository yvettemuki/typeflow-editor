<template>
	<div id="model-svg"></div>
</template>

<script>
	export default {
		name: "ModelSvg",
		props: {
			xml: {
				default: null,
				type: String
			}
		},
		methods: {
			_toSvgDom: function () {
				let svg = this.xml;
				let container = document.getElementById("model-svg");
				container.innerHTML = svg;

			}
		},

		mounted() {
			this._toSvgDom();
		}

	}
</script>

<style lang="less" scoped>
</style>