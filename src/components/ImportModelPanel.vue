<template>
	<div class="import-view">
		<span class="title"><b>History Model List</b></span>
		<CloseIcon @click.native="_closePanel" top="10" right="10" size="24"></CloseIcon>
		<div v-if="modelList == null || modelList.length == 0" class="no-data-content">You still have not save any models</div>
		<ul v-else class="import-list-view">
			<li v-for="(model, idx) in modelList"
				:key="idx"
				class="model-li">
				<slot name="model" v-bind:model="model"></slot>
			</li>
		</ul>
	</div>
</template>

<script>
	import CloseIcon from "./basicComponents/CloseIcon";
	export default {
		name: "ImportModelPanel",
		components: {CloseIcon},
		props: {
			modelList: {
				default: null,
				type: Array
			}
		},
		methods: {
			_closePanel: function () {
				this.$emit("closeImportPanel");
			},
		}
	}
</script>

<style lang="less" scoped>
	.import-view {
		width: 800px;
		height: 500px;
		background: #ffffff;
		border-radius: 10px;
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 30px;
	}
	.import-list-view {
		width: 87%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 30px auto;
		overflow-y: scroll;
		padding: 0;
	}
	.title {
		font-size: 18px;
	}
	.model-li {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10px
	}
	.no-data-content {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #9e9e9e;
		font-weight: bold;
	}
</style>