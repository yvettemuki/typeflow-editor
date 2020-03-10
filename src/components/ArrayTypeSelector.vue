<template>
	<ul class="array-type-selector" :style="selectorPosi">
		<li v-for="(item, id) in selections"
				:key="id"
				class="array-type-selector-item"
				@click="_selectArrayType(item, $event)">
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
			},
			index: {
				default: -1,
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
			_selectArrayType: function (item, event) {
				this.$emit('addArrayType', item, this.index);
			}
		},

		mounted() {
		}
	}
</script>

<style lang="less" scoped>
	.array-type-selector {
		position: fixed;
		max-height: 100px;
		overflow-y: scroll;
		width: 170px;
		padding: 20px 0;
		z-index: 999;
		text-align: left;
		background: #ffffff;
		box-shadow: 0 0 8px 0 #eeeeee;
		border-radius: 4px;
	}
	.array-type-selector-item {
		width: 130px;
		height: 34px;
		padding: 2px 20px;
		line-height: 34px;
		font-weight: bold;
		font-size: 12px;
		color: #606266;
		cursor: pointer;
	}
	.array-type-selector-item:hover {
		background: #F5F7FA;
	}
</style>