<template>
	<div v-bind:style="recContainer"></div>
</template>

<script>
	export default {
		name: "SelectBox",

		props: {
			width: {
				default: '100',
				type: String,
			},
			height: {
				default: '100',
				type: String,
			},
			borderWidth: {
				default: '1',
				type: String
			},
			radius: {
				default: '4',
				type: String
			},
			color: {
				default: '#000000',
				type: String
			}
		},

		data() {
			return {
				recContainer: {
					width: this.width + "px",
					height: this.height + "px",
					border: this.borderWidth + "px " + "solid " + this.color,
					borderRadius: this.radius + "px",
					background: "transparent"
				}
			}
		}
	}
</script>

<style lang="less" scoped>


</style>