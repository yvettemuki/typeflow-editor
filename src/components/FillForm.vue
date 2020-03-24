<template>
	<div class="defi-form">
		<label class="defi-type"><b>{{this.defiType}}</b></label>
		<input v-model="defiName" class="defi-name" placeholder="type the definition name"/>
		<div class="defi-main-content">
			<InfoInputList :list-type="inOutputTypes[0]" :list="this.inputs"></InfoInputList>
			<InfoInputList :list-type="inOutputTypes[1]" :list="this.outputs"></InfoInputList>
		</div>
		<div class="defi-main-content">
			<InfoInputList :list-type="inOutputTypes[2]" :list="this.alternativeOutputs"></InfoInputList>
			<InfoInputList :list-type="inOutputTypes[3]" :list="this.exceptionOutputs"></InfoInputList>
		</div>
		<CloseIcon @click.native="_sendToEditorWhenCancel" top="10" right="10" size="24"></CloseIcon>
		<EditorButton @click.native="_sendToEditor" text="Confirm" posi-bottom="-60" btn-position="relative"></EditorButton>
	</div>
</template>

<script>
	import InfoInputList from "./InfoInputList";
	import inOutputTypes from "../configs/inOutputTypes";
	import EditorButton from "./basicComponents/EditorButton";
	import CloseIcon from "./basicComponents/CloseIcon";

	const ADD_FORM_TYPE = "ADD_FORM_TYPE";
	const CHECK_OR_CHANGE_FORM_TYPE = "CHECK_OR_CHANGE_FORM_TYPE";

	export default {
		name: "FillForm",
		components: {CloseIcon, EditorButton, InfoInputList},
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
						id: "",
						value: ""
					},
				],
				outputs: [
					{
						index: 0,
						id: "",
						value: ""
					},
				],
				alternativeOutputs: [],
				exceptionOutputs: [],
				isValidate: true,
				inOutputTypes: inOutputTypes
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
						if (ele.value.replace(/\s*/g, "").length <= 0) {
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
				if (this.definition) {
					window.console.log(this.definition);
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
		width: 820px;
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
		font-weight: bold;
	}

	.defi-main-content {
		position: relative;
		margin-top: 36px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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