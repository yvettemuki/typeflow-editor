<template>
	<div class="info-input-list-container">
		<div v-if="isArrayTypeSelectShow" @click="_hideArrayTypeSelector" class="array-selection-layer"></div>
		<div v-if="isObjectCreatePanelShow" class="panel-layer">
			<CustomObjectPanel
				:selections="selections"
				:index="currentIndex"
				v-on="{
					addNewObject: _addNewObject,
					closeCreateObjectPanel: _hideObjectCreatePanel
				}"
			></CustomObjectPanel>
		</div>
		<div class="defi-input-section">
			<div class="defi-title-info-and-add">
				<div class="defi-title-info">
					<label class="defi-title"><b>{{this.listType}} list</b></label>
					<div class="defi-info">
						<Info class="info" :msg="this.listType" height="40" width="100" x="20"></Info>
					</div>
				</div>
				<div class="add" @click="_addOne"></div>
			</div>
			<div class="blank-block" v-if="list.length <= 0">
				add one if you need
			</div>
			<ul v-else class="defi-input-ul">
				<li
					v-for="(input, idx) in list"
					:key="idx"
					class="input-desc">
					<TypeSelector
						:list-type="listType"
						:index="idx"
						:selections="selections"
						:ref="listType + idx"
						v-on="{
						showArrayTypeSelect: _showArrayTypeSelect,
						showObjectCreatePanel: _showObjectCreatePanel,
						addNormalType: _addNormalType
					}"
					></TypeSelector>
					<ArrayTypeSelector
						v-if="isArrayTypeSelectShow"
						:x="x"
						:y="y"
						:index="idx"
						:selections="selections[0].options"
						v-on="{
						addArrayType: _addArrayType
						}"
					></ArrayTypeSelector>
					<input v-model="input.value" class="inputs-field"/>
					<div class="delete" @click="_deleteOne(idx)"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Info from './Info'
	import TypeSelector from "./TypeSelector";
	import ArrayTypeSelector from "./ArrayTypeSelector";
	import inOutputTypes from "../configs/inOutputTypes";
	import CustomObjectPanel from "./CustomObjectPanel";
	import store from "../store";

	export default {
		name: "InfoInputList",
		components: {
			CustomObjectPanel,
			ArrayTypeSelector,
			TypeSelector,
			Info
		},
		props: {
			listType: {
				type: String,
				default: "no assign title"
			},
			list: {
				type: Array,
				default: null
			},
		},
		data() {
			return {
				isArrayTypeSelectShow: false,
				selections: store.getSelections(),
				x: 0,
				y: 0,
				currentSelected: '',
				isObjectCreatePanelShow: false,
				currentIndex: -1
			}
		},
		methods: {
			_addOne: function () {
				this.list.push({
					index: this.list.length,
					id: "",
					value: ""
				})
			},

			_deleteOne: function (index) {
				this.list.splice(index, 1)
				this.list.map(ele => ele.index = ele.indexOf(ele))
			},

			_showArrayTypeSelect: function (idx, type, selected) {
				this.currentSelected = selected;
				const sectionIndex = inOutputTypes.indexOf(this.listType);
				const section = document.getElementsByClassName('defi-input-section')[sectionIndex];
				const selector = section.childNodes[1].children[idx];
				const x = selector.getClientRects()[0].x;
				const y = selector.getClientRects()[0].y;
				window.console.log(x);
				window.console.log(y);
				this.x = x;
				this.y = y + 44;
				this.isArrayTypeSelectShow = true;
			},

			_hideArrayTypeSelector: function () {
				this.isArrayTypeSelectShow = false;
			},

			_addArrayType: function (item, index) {
				let newSelected = `${this.currentSelected}(${item.value})`;
				let selection = store.findNormalType(newSelected);
				if (selection == undefined) {
					store.addArrayType(newSelected);
					localStorage.setItem('inOutputSelections', JSON.stringify(store.getSelections()));
				}
				this.$refs[`${this.listType}${index}`][0].selected = newSelected; // manually change the select option
				this.list.find(item => item.index == index).id = newSelected; // add the type 'id' to list
				window.console.log(this.list);
				this.isArrayTypeSelectShow = false;
			},

			_showObjectCreatePanel: function (index) {
				this.currentIndex = index;
				this.isObjectCreatePanelShow = true;
			},

			_addNormalType: function (index, selected) {
				this.list.find(item => item.index == index).id = selected;
			},

			_hideObjectCreatePanel: function () {
				this.isObjectCreatePanelShow = false;
			},

			_addNewObject: function (index, customObjectName, resTypeList) {
				let selection = store.findNormalType(customObjectName);
				if (selection == undefined) {
					store.addObjectType(customObjectName, resTypeList);
					localStorage.setItem('inOutputSelections', JSON.stringify(store.getSelections()));
				}
				this.$refs[`${this.listType}${index}`][0].selected = customObjectName;
				this.list.find(item => item.index == index).id = customObjectName;
				this.isObjectCreatePanelShow = false;
			},

		},

		mounted() {
			// if (this.list.length > 1) {
			// 	window.console.log("test in the check");
			// 	this.list.forEach((item,index) => {
			// 		this.$refs[`${this.listType}${index}`][0].selected = this.list.id;
			// 	})
			// }
		}

	}
</script>

<style lang="less" scoped>
	.info-input-list-container {
		position: relative;
	}
	.defi-input-section {
		position: relative;
		width: 367px;
		display: flex;
		flex-direction: column;
	}

	.defi-title-info-and-add {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.defi-title-info {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.defi-title {
		font-size: 14px;
	}

	.defi-info {
		position: relative;
		display: inline-block;
		height: 10px;
		width: 10px;
		margin-left: 5px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url("../assets/info.png");
	}

	.defi-info:hover .info {
		visibility: visible;
	}

	.info {
		visibility: hidden;
		font-size: 10px;
		color: #4a4a4a;
	}

	.defi-input-ul {
		height: 150px;
		overflow-y: scroll;
		margin-top: 0;
		margin-bottom: 10px;
	}

	.input-desc {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.add-btn {
		height: 10px;
		width: 11px;
		background-size: 100%;
		background-image: url("../assets/add_2.png");
		color: #ffffff;
		cursor: pointer;
	}

	.add-btn:hover {
		background-image: url("../assets/add_hover.png");
	}

	.minus-btn {
		width: 10px;
		height: 3px;
		background-image: url("../assets/delete_btn_2.png");
		background-repeat: no-repeat;
		background-size: 100%;
		cursor: pointer;
	}

	.minus-btn:hover {
		background-image: url("../assets/delete_hover.png");
	}

	.blank-block {
		margin-top: 5px;
		width: 367px;
		height: 156px;
		border: 2px #e9e9e9 solid;
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #9e9e9e;
	}

	.inputs-field {
		height: 30px;
		width: 146px;
		border-radius: 4px;
		border: 2px solid #e1e1e1;
		padding: 0 10px;
		margin: 5px 5px 5px 0;
		font-size: 11px;
		color: #333333;
		font-weight: bold;
	}

	.delete {
		height: 3px;
		width: 12px;
		background: #C94F4F;
		cursor: pointer;
	}

	.delete:hover {
		background: #a03e3e;
	}

	.add {
		width: 12px;
		height: 12px;
		transition: color .25s;
		position: relative;
		border: none;
		cursor: pointer;
	}

	.add::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 12px;
		margin-left: -6px;
		margin-top: -1.5px;
		border-top: 3px solid #000000;
	}

	.add::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		height: 12px;
		margin-top: -6px;
		margin-left: -1.5px;
		border-left: 3px solid #000000;
	}

	.add:hover::before, .add:hover::after {
		border-color: #ec9b3b;
	}

	.type-selector {
		position: relative;
		background: #1C86EE;
	}
	.array-selection-layer {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 998;
		background: transparent;
	}
	.panel-layer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

</style>