<template>
	<div v-bind:style="lineStyle"></div>
</template>

<script>
	export default {
		name: "BasicLine",
		props: {
			height: {
				default: "1",
				type: String
			},
			width: {
				default: "100",
				type: String
			},
			color: {
				default: "#000000",
				type: String
			}
		},
		data() {
			return {
				lineStyle: {
					height: this.height + "px",
					width: this.width + "%",
					background: this.color
				}
			}
		}
	}
</script>

<style scoped>

</style>