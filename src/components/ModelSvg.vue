<template>
	<div :id="id"></div>
</template>

<script>
	export default {
		name: "ModelSvg",
		props: {
			id: {
				default: null,
				type: String,
			},
			xml: {
				default: null,
				type: String
			}
		},
		methods: {
			_toSvgDom: function () {
				let svg = this.xml;
				let container = document.getElementById(this.id);
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