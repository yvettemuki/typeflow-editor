<template>
	<div class="import-view">
		<span class="title"><b>History Model List</b></span>
		<button class="close-btn" @click="_closePanel"></button>
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
	export default {
		name: "ImportModelPanel",
		props: {
			modelList: {
				default: null,
				type: Array
			}
		},
		data() {
			return {

			}
		},
		methods: {
			_closePanel: function () {
				this.$emit("closeImportPanel");
			},

			// _sendSelectModel: function (model) {
			// 	this.$emit("getValueFromImportPanel", model);
			// }
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
	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		height: 13px;
		width: 13px;
		background-image: url("../assets/close_btn_2.png");
		background-repeat: no-repeat;
		background-size: 100%;
		cursor: pointer;
	}
	.close-btn:hover {
		background-image: url("../assets/close_btn_hover.png");
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