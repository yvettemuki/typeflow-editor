<template>
	<div class="head-container">
		<span>{{title}}</span>
		<div class="tool-div">
			<img class="setting-btn" src="../assets/setting.png" @click="_elementSetting"/>
			<Add class="add-icon" weight="2" color="#333333" @click.native="_addElement"></Add>
		</div>
	</div>
</template>

<script>
	import Add from "./basicComponents/Add";
	export default {
		name: "ElementHead",
		components: {
			Add,
		},
		props: {
			title: {
				default: '',
				type: String,
			},
		},
		data() {
			return {

			}
		},
		methods: {
			_addElement: function () {
				this.$emit('addElement', this.title);
			},
			_elementSetting: function () {
				this.$emit('setElement', this.title);
			}
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
		cursor: default;
	}
	.tool-div {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.setting-btn {
		width: 15px;
		margin-right: 8px;
		cursor: pointer;
	}
	.setting-btn:hover {
		content: url("../assets/setting_hover.png");
	}


</style>