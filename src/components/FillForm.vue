<template>
	<div class="defi-form">
		<label class="defi-type"><b>{{this.defiType}}</b></label>
		<input v-model="defiName" class="defi-name" placeholder="type the definition name"/>
		<div class="defi-main-content">
			<InfoInputList list-type="input" :list="this.inputs"></InfoInputList>
			<InfoInputList list-type="output" :list="this.outputs"></InfoInputList>
		</div>
		<div class="defi-main-content">
			<InfoInputList list-type="alternative output" :list="this.alternativeOutputs"></InfoInputList>
			<InfoInputList list-type="exception output" :list="this.exceptionOutputs"></InfoInputList>
		</div>
		<button class="close-btn" @click="_sendToEditorWhenCancel"></button>
		<input class="confirm-btn" type="button" value="Confirm" @click="_sendToEditor"/>

	</div>
</template>

<script>
	import InfoInputList from "./InfoInputList";

	const ADD_FORM_TYPE = "ADD_FORM_TYPE";
	const CHECK_OR_CHANGE_FORM_TYPE = "CHECK_OR_CHANGE_FORM_TYPE";

	export default {
		name: "FillForm",
		components: {InfoInputList},
		props: {
			id: String,
			type: String,
			definition: Object,
			formType: String
		},

		data() {
			return {
				defiName: "",
				defiType: "",
				inputs: [
					{
						index: 0,
						id: ""
					},
				],
				outputs: [
					{
						index: 0,
						id: ""
					},
				],
				alternativeOutputs: [],
				exceptionOutputs: [],
				isValidate: true,
				testList: [
					{
						index: 0,
						id: ""
					}
				]
			};
		},

		methods: {
			_validateFillForm() {
				this.isValidate = true;
				if (this.defiName.replace(/\s*/g, "").length <= 0) {
					this.isValidate = false;
				}
				this._validate(this.inputs);
				this._validate(this.outputs);
				this._validate(this.alternativeOutputs);
				this._validate(this.exceptionOutputs);
			},

			_validate(elements) {
				if (elements.length <= 0) {
					return;
				} else {
					elements.forEach(ele => {
						if (ele.id.replace(/\s*/g, "").length <= 0) {
							this.isValidate = false;
						}
					})
				}
			},

			_sendToEditor() {
				this._validateFillForm();
				if (this.isValidate != true) {
					this.$message.warning({
						duration: 1000,
						iconClass: 'icon',
						message: "you have some blanks not filled!",
						customClass: 'warning-msg'
					});
					return;
				}
				if (this.formType === ADD_FORM_TYPE) {
					this.$emit('getValueFromForm', this.id, this.type, this.defiName, this.inputs, this.outputs, this.alternativeOutputs, this.exceptionOutputs);
				} else if (this.formType === CHECK_OR_CHANGE_FORM_TYPE) {
					let newDefinition = {
						name: this.definition.name, //can not change
						type: this.definition.type, //can not change
						inputs: this.inputs,
						outputs: this.outputs,
						alternativeOutputs: this.alternativeOutputs,
						exceptionOutputs: this.exceptionOutputs
					}
					if (this._isDataChange(newDefinition, this.definition)) {
						this.$emit('changeValueFromForm', this.id, newDefinition);
					} else {
						return this.$emit('closeFormDoneNothing');
					}

				}
			},

			_sendToEditorWhenCancel() {
				if (this.formType === ADD_FORM_TYPE) {
					this.$emit('closeForm', this.id, false);
				} else if (this.formType === CHECK_OR_CHANGE_FORM_TYPE) {
					this.$emit('closeFormDoneNothing');
				}

			},

			_isDataChange(newDefinition, oldDefinition) {
				//use lodash to deep compare
				return !this._.isEqual(newDefinition, oldDefinition);
			}

		},

		mounted() {
			//finish data init but not start ele created
			if (this.formType === CHECK_OR_CHANGE_FORM_TYPE) {
				window.console.log("test in the ******* check and change type")
				if (this.definition) {
					this.defiType = this.definition.type;
					this.defiName = this.definition.name;
					this.inputs = this.cloneDeep(this.definition.inputs);
					this.outputs = this.cloneDeep(this.definition.outputs);
					this.alternativeOutputs = this.cloneDeep(this.definition.alternativeOutputs);
					this.exceptionOutputs = this.cloneDeep(this.definition.exceptionOutputs);
				}
			}
			if (this.formType === ADD_FORM_TYPE) {
				this.defiType = this.type;
			}
		}
	};
</script>

<style lang="less" scoped>
	.defi-form {
		position: relative;
		height: 640px;
		width: 866px;
		min-width: 580px;
		z-index: 1000;
		background: #ffffff;
		border-radius: 10px;
		padding: 30px 70px 30px 70px;
		display: flex;
		flex-direction: column;
	}

	.defi-type {
		font-size: 16px;
	}

	.defi-name {
		height: 40px;
		border-radius: 4px;
		border: 2px solid #e1e1e1;
		margin-top: 30px;
		padding: 0 10px 0 10px;
		font-size: 12px;
	}

	.defi-main-content {
		position: relative;
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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

	.confirm-btn {
		position: relative;
		bottom: -30px;
		margin: 0 auto;
		height: 30px;
		width: 100px;
		font-weight: bold;
		background: #42b983;
		border-radius: 4px;
		border: none;
		color: #ffffff;
		cursor: pointer;
	}

	.confirm-btn:hover {
		background: #3eae7b;
	}

</style>
<style>
	.warning-msg {
		background-color: #ffffff !important;
		font-weight: bold;
		font-family: Arial;
	}

	.el-message__content {
		color: #C94F4F !important;
	}

	.icon {
		background-image: url("../assets/warning.png");
		height: 15px;
		width: 15px;
		margin-top: 2px;
		background-repeat: no-repeat;
		background-size: 100%;
		margin-right: 10px;
	}
</style>