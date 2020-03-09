<template>
	<ul class="array-type-selector" :style="selectorPosi">
		<li v-for="(item, id) in selections" :key="id">
			{{item.value}}
		</li>
	</ul>
</template>

<script>
	export default {
		name: "ArrayTypeSelector",

		props: {
			selections: {
				default: null,
				type: Array
			},
			x: {
				default: 0,
				type: Number
			},
			y: {
				default: 0,
				type: Number
			}
		},

		data() {
			return {
				selectorPosi: {
					top: this.y + "px",
					left: this.x + "px"
				}
			}
		},

		methods: {

		},

		mounted() {
			window.console.log(this.selections)
		}
	}
</script>

<style lang="less" scoped>
	.array-type-selector {
		position: fixed;
		height: 140px;
		width: 130px;
		padding: 20px;
		z-index: 1;
		background: #ffffff;
		box-shadow: 0 0 8px 0 #eeeeee;
		border-radius: 4px;
	}
</style>