<template>
	<div class="desc-container" :style="container">
		<img :style="picture" :src="picUrl"/>
		<div class="desc-font" :style="fontStyle">{{desc}}</div>
	</div>
</template>

<script>
	export default {
		name: "HelpDescription",
		props: {
			picUrl: {
				default: null,
				type: String
			},
			picWidth: {
				default: '100',
				type: String
			},
			desc: {
				default: null,
				type: String
			},
			containerWidth: {
				default: null,
				type: String,
			},
			fontSize: {
				default: '16',
				type: String,
			},
			fontWeight: {
				default: 'normal',
				type: String
			}
		},
		data() {
			return {
				picture: {
					width: this.picWidth + "px",
				},
				container: {
					width: this.containerWidth + "px",
				},
				fontStyle: {
					fontSize: this.fontSize + "px",
					fontWeight: this.fontWeight,
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	.desc-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.desc-font {
		margin-top: 30px;
	}

</style>