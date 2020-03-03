<template>
	<div v-if="isSelectViewShow" class="second-select">
		test the show of select
	</div>
</template>

<script>
	export default {
		name: "SecondSelector",
		props: {

		},
		data() {
			return {
				isSelectViewShow: true
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.second-select {
		position: absolute;
		left: 30px;
		height: 170px;
		width: 164px;
		padding: 2px;
		background: #9e9e9e;
	}
</style>