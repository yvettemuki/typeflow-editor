<template>
	<div v-bind:style="delDiv" class="delDiv">
		<div v-bind:style="del" class="del"></div>
	</div>
</template>

<script>
	export default {
		name: "Delete",
		props: {
			width: {
				type: String,
				default: '12'
			},
			height: {
				type: String,
				default: '2'
			},
			color: {
				type: String,
				default: '#000000'
			},
			radius: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				del: {
					height: this.height + 'px',
					width: this.width + 'px',
					background: this.color,
					'border-radius': this.radius + 'px',
					position: 'absolute',
					top: this.width / 2 - this.height / 2 + 'px'
				},
				delDiv: {
					hover: {color: '#333333'},
					height: this.width + 'px',
					width: this.width + 'px',
					position: 'relative',
					cursor: 'pointer'
				},
			}
		}
	}

</script>

<style scoped>
	.delDiv:hover .del {
		background: #1C86EE !important;
	}
</style>