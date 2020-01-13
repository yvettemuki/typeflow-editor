<template>
	<div class="head-container">
		<span>{{title}}</span>
		<Add class="add-icon" color="#333333"></Add>
	</div>
</template>

<script>
	import Add from "./Add";
	export default {
		name: "ElementHead",
		props: {
			title: {
				default: '',
				type: String,
			},
		},
		components: {
			Add,
		}
	}
</script>

<style lang="less" scoped>
	.head-container {
		height: 40px;
		line-height: 40px;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 14px;
		justify-content: space-between;
		padding: 0 20px 0px 20px;
	}

</style>