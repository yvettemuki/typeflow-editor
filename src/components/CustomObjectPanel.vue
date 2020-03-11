<template>
	<div class="custom-object-panel">
		<span class="panel-title">Custom Object Create</span>
		<input v-model="customObjectName" class="custom-object-input" placeholder="type the custom object name"/>
		<ul class="custom-object-type-list">
			<li
				v-for="(item, idx) in resTypeList"
				:key="idx"
				class="custom-object-type-item">
				<span>{{item}}</span>
				<button class="close-btn" @click="_deleteOneType(idx)"></button>
			</li>
		</ul>
		<ul class="custom-object-type-select">
			<li
				v-for="(item, idx) in selectTypeList"
				:key="idx"
				class="custom-object-select-item"
				@click="_addOneType(item)">
				{{item.value}}
			</li>
		</ul>
		<EditorButton @click.native="_confirmCreateObject"></EditorButton>
	</div>
</template>

<script>
	import EditorButton from "./EditorButton";
	export default {
		name: "CustomObjectPanel",
		components: {EditorButton},
		props: {
			selections: {
				default: null,
				type: Array
			},
			index: {
				default: -1,
				type: Number
			}
		},

		data() {
			return {
				customObjectName: '',
				resTypeList: [],
				selectTypeList: this.selections[0].options
			}
		},

		methods: {
			_addOneType: function (item) {
				this.resTypeList.push(item.value)
			},

			_confirmCreateObject: function () {
				if (this._validateAllInputs()) {
					this.$emit('addNewObject', this.index, this.customObjectName, this.resTypeList)
				}
			},

			_validateAllInputs: function () {
				if (this.customObjectName.replace(/\s*/g, "").length <= 0) {
					this.$message.warning({
						duration: 2000,
						iconClass: 'icon-warn',
						message: "you have some blanks not filled!",
						customClass: 'warning-msg'
					});
					return false;
				} else if (this.resTypeList.length <= 0) {
					this.$message.warning({
						duration: 2000,
						iconClass: 'icon-warn',
						message: "you have to select the object attribute type!",
						customClass: 'warning-msg'
					});
					return false;
				} else {
					return true;
				}
			},
			
			_deleteOneType: function (index) {
				this.resTypeList.splice(index, 1);
			}
		},
	}
</script>

<style lang="less" scoped>
	.custom-object-panel {
		position: relative;
		z-index: 1000;
		width: 820px;
		height: 560px;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 10px;
		padding: 70px 70px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.panel-title {
		font-size: 16px;
		font-weight: bold;
	}
	.custom-object-input {
		margin-top: 38px;
		height: 40px;
		width: 360px;
		padding: 0 20px;
		border-radius: 4px;
		border:	2px solid #e1e1e1;
		font-size: 12px;
		font-weight: bold;
	}
	.custom-object-type-list {
		width: 80%;
		height: 200px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 37px;
	}
	.custom-object-type-item {
		position: relative;
		height: 30px;
		min-width: 86px;
		border-radius: 4px;
		line-height: 30px;
		text-align: center;
		box-shadow: 0 0 8px 0 #dcdcdc;
		margin: 7.5px;
		cursor: pointer;
		font-size: 12px;
		font-weight: bold;
	}
	.custom-object-type-select {
		width: 80%;
		height: 200px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.custom-object-select-item {
		height: 30px;
		min-width: 102px;
		text-align: center;
		line-height: 30px;
		font-size: 12px;
		font-weight: bold;
		border: 2px dashed #dcdcdc;
		border-radius: 4px;
		cursor: pointer;
		margin: 7.5px;
	}
	.custom-object-select-item:hover {
		background: #315B96;
		color: #ffffff;
	}
	.close-btn {
		position: absolute;
		right: 3px;
		top: 3px;
		height: 8px;
		width: 8px;
		background-image: url("../assets/close_btn_red.png");
		background-repeat: no-repeat;
		background-size: 100%;
		cursor: pointer;
	}
	.close-btn:hover {
		background-image: url("../assets/close_btn_hover.png");
	}
</style>
<style>
	.icon-warn {
		background-image: url("../assets/warning.png");
		height: 15px;
		width: 15px;
		margin-top: 2px;
		background-repeat: no-repeat;
		background-size: 100%;
		margin-right: 10px;
	}
	.warning-msg {
		background-color: #ffffff !important;
		font-weight: bold;
		font-family: Arial;
	}

	.el-message__content {
		color: #C94F4F !important;
	}
</style>