<template>
	<div class="info-div" :style="info">Enter {{this.msg}} variable types</div>
</template>

<script>
	export default {
		name: "Info",
		props: {
			msg: {
				default: 'info',
				type: String
			},
			width: {
				default: '0',
				type: String
			},
			height: {
				default: '0',
				type: String
			},
			x: {
				default: '0',
				type: String
			},
			y: {
				default: '0',
				type: String
			},
		},
		data() {
			return {
				info: {
					height: this.height + 'px',
					width: this.width + 'px',
					top: this.y + 'px',
					left: this.x + 'px',
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.info-div {
		box-shadow: 0px 1px 2px 1.5px #e5e5e5;
		background: rgba(255,255,255,0.6);
		border-radius: 4px;
		position: absolute;
		z-index: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

</style>