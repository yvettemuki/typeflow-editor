<template>
	<div>
		<img :style="picture" src="picUrl"/>
		<div>{{desc}}</div>
	</div>
</template>

<script>
	export default {
		name: "SimpleDescription",
		props: {
			picUrl: {
				default: '',
				type: String
			},
			picWidth: {
				default: 100,
				type: Number
			},
			desc: {
				default: '',
				type: String
			}
		},
		data() {
			return {
				picture: {
					width: this.picWidth,
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.desc-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>