<template>
	<div v-bind:style="add" class="add">
		<div v-bind:style="row" class="add-ele"></div>
		<div v-bind:style="column" class="add-ele"></div>
	</div>
</template>

<script>
	export default {
		name: "Add",
		props: {
			size: {
				type: String,
				default: '12',
			},
			weight: {
				type: String,
				default: '2'
			},
			radius: {
				type: String,
				default: '0'
			},
			color: {
				type: String,
				default: '#42b983'
			}
		},
		data() {
			return {
				row: {
					height: this.weight + 'px',
					width: this.size + 'px',
					background: this.color,
					position: 'absolute',
					top: this.size / 2 - this.weight / 2 + 'px',
					'border-radius': this.radius + 'px',
				},
				column: {
					height: this.size + 'px',
					width: this.weight + 'px',
					background: this.color,
					position: 'absolute',
					left: this.size / 2 - this.weight / 2 + 'px',
					'border-radius': this.radius + 'px',
				},
				add: {
					position: 'relative',
					height: this.size + 'px',
					width: this.size + 'px',
					cursor: 'pointer'
				},
			}
		}
	}
</script>

<style lang="less" scoped>
	.add:hover .add-ele {
		background: #1C86EE !important;
	}
</style>