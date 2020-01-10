<template>
	<div :id="model.name" @click="_chooseItem(model)">
	</div>
</template>

<script>
	export default {
		name: "ModelSvg",
		props: {
			model: {
				default: null,
				type: Object
			}
		},

		methods: {
			_toSvgDom: function () {
				let svg = this.model.svgXml;
				let container = document.getElementById(this.model.name);
				container.innerHTML = svg;
			},

			_chooseItem: function (model) {
				this.$emit('getModelItem', model);
			}
		},

		mounted() {
			this._toSvgDom();
		}

	}
</script>

<style lang="less" scoped>
</style>