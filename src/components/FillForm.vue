<template>
	<div class="defi-form">
		<label class="defi-type"><b>{{type}}</b></label>
		<input v-model="defiName" class="defi-name" placeholder="type the definition name"/>
		<div class="defi-main-content">
			<div class="defi-input-section">
				<div class="defi-title-info-and-add">
					<div class="defi-title-info">
						<label class="defi-title"><b>input list</b></label>
						<div class="defi-info">
							<Info class="info" msg="Enter input variable types" height="40" width="100" x="20"></Info>
						</div>
					</div>
					<div class="add" @click="_addOneInput"></div>
				</div>
				<div class="blank-block" v-if="inputs.length <= 0">
					add one if you need
				</div>
				<ul v-else class="defi-input-ul">
					<li
						v-for="(input, idx) in inputs"
						:key="idx"
						class="input-desc">
						<input v-model="input.id" class="inputs-field"/>
						<div class="delete" @click="_deleteInput(idx)"></div>
					</li>
				</ul>
			</div>
			<div class="defi-input-section">
				<div class="defi-title-info-and-add">
					<div class="defi-title-info">
						<label class="defi-title"><b>output list</b></label>
						<div class="defi-info">
							<Info class="info" msg="Enter normal output variable types" height="40" width="100" x="20"></Info>
						</div>
					</div>
					<div class="add" @click="_addOneOutput"></div>
				</div>
				<div class="blank-block" v-if="outputs.length <= 0">
					add one if you need
				</div>
				<ul v-else class="defi-input-ul">
					<li
						v-for="(output, idx) in outputs"
						:key="idx"
						class="input-desc">
						<input v-model="output.id" class="inputs-field"/>
						<div class="delete" @click="_deleteOutput(idx)"></div>
					</li>
				</ul>
			</div>
		</div>
		<div class="defi-main-content">
			<div class="defi-input-section">
				<div class="defi-title-info-and-add">
					<div class="defi-title-info">
						<label class="defi-title"><b>alternative output list</b></label>
						<div class="defi-info">
							<Info class="info" msg="Enter alternative output variable types" height="40" width="100" x="20"></Info>
						</div>
					</div>
					<div class="add" @click="_addOneAlterOutput"></div>
				</div>
				<div class="blank-block" v-if="alternativeOutputs.length <= 0">
					add one if you need
				</div>
				<ul v-else class="defi-input-ul">
					<li
						v-for="(output, idx) in alternativeOutputs"
						:key="idx"
						class="input-desc">
						<input v-model="output.id" class="inputs-field"/>
						<div class="delete" @click="_deleteAlterOutput(idx)"></div>
					</li>
				</ul>
			</div>
			<div class="defi-input-section">
				<div class="defi-title-info-and-add">
					<div class="defi-title-info">
						<label class="defi-title"><b>exception output list</b></label>
						<div class="defi-info">
							<Info class="info" msg="Enter exception output variable types" height="40" width="100" x="20"></Info>
						</div>
					</div>
					<div class="add" @click="_addOneExceptOutput"></div>
				</div>
				<div class="blank-block" v-if="exceptionOutputs.length <= 0">
					add one if you need
				</div>
				<ul v-else class="defi-input-ul">
					<li
						v-for="(output, idx) in exceptionOutputs"
						:key="idx"
						class="input-desc">
						<input v-model="output.id" class="inputs-field"/>
						<div class="delete" @click="_deleteExceptOutput(idx)"></div>
					</li>
				</ul>
			</div>
		</div>
		<button class="close-btn" @click="_sendToEditorWhenCancel"></button>
		<input class="confirm-btn" type="button" value="Confirm" @click="_sendToEditor"/>

	</div>
</template>

<script>
		import Info from "./Info";

    const ADD_FORM_TYPE = "ADD_FORM_TYPE";
    const CHECK_OR_CHANGE_FORM_TYPE = "CHECK_OR_CHANGE_FORM_TYPE";

    export default {
        name: "FillForm",
        components: {Info},
        props: {
            id: String,
            type: String,
            definition: Object,
            formType: String
        },

        data() {
            return {
                defiName: "",
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
                window.console.log("in the fill form");
                if (this.formType === ADD_FORM_TYPE) {
                    this.$emit('getValueFromForm', this.id, this.type, this.defiName, this.inputs, this.outputs, this.alternativeOutputs, this.exceptionOutputs);
                } else if (this.formType === CHECK_OR_CHANGE_FORM_TYPE) {
                    this.$emit('changeValueFromForm');
                }
            },

            _sendToEditorWhenCancel() {
                if (this.formType === ADD_FORM_TYPE) {
                    this.$emit('closeForm', this.id, false);
                } else if (this.formType === CHECK_OR_CHANGE_FORM_TYPE) {
                    this.$emit('closeFormDoneNothing');
                }

            },

            _addOneInput() {
                this.inputs.push({
                    index: this.inputs.length,
                    id: ""
                })
            },

            _deleteInput(index) {
                this.inputs.splice(index, 1)
                this.inputs.map(ele => {
                    ele.index = this.inputs.indexOf(ele)
                })
            },

            _addOneOutput() {
                this.outputs.push({
                    index: this.outputs.length,
                    id: ""
                })
            },

            _deleteOutput(index) {
                this.outputs.splice(index, 1)
                this.outputs.map(ele => {
                    ele.index = this.outputs.indexOf(ele)
                })
            },

            _addOneAlterOutput() {
                this.alternativeOutputs.push({
                    index: this.alternativeOutputs.length,
                    id: ""
                })
            },

            _deleteAlterOutput(index) {
                this.alternativeOutputs.splice(index, 1)
                this.alternativeOutputs.map(ele => {
                    ele.index = this.alternativeOutputs.indexOf(ele)
                })
            },

            _addOneExceptOutput() {
                this.exceptionOutputs.push({
                    index: this.exceptionOutputs.length,
                    id: ""
                })
            },

            _deleteExceptOutput(index) {
                this.exceptionOutputs.splice(index, 1)
                this.exceptionOutputs.map(ele => {
                    ele.index = this.exceptionOutputs.indexOf(ele)
                })
            },

        },

        mounted() {
            //finish data init but not start ele created
            if (this.formType === CHECK_OR_CHANGE_FORM_TYPE) {
                if (this.definition) {
										this.defiName = this.definition.name;
                    this.inputs = this.definition.inputs;
                    this.outputs = this.definition.outputs;
                    this.alternativeOutputs = this.definition.alternativeOutputs;
                    this.exceptionOutputs = this.definition.exceptionOutputs;
                }
            }
        }
    };
</script>

<style lang="less" scoped>
	.defi-form {
		position: relative;
		height: 520px;
		width: 580px;
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
		height: 30px;
		border-radius: 4px;
		border: 2px solid #e1e1e1;
		margin-top: 30px;
		padding: 0 10px 0 10px;
		font-size: 12px;
	}

	.defi-input-section {
		height: 165px;
		width: 260px;
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
		font-size: 12px;
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

	.defi-main-content {
		position: relative;
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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

	.inputs-field {
		height: 30px;
		width: 240px;
		border-radius: 4px;
		border: 2px solid #e1e1e1;
		padding: 0 10px;
		margin: 5px 5px 5px 0;
		font-size: 12px;
	}

	ul {
		padding-left: 0px;
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

	.input-label {
		color: #a5a5a5;
	}

	.blank-block {
		margin-top: 5px;
		width: 260px;
		height: 140px;
		border: 2px #e9e9e9 solid;
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #9e9e9e;
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

	.delete {
		height: 3px;
		width: 12px;
		background: #C94F4F;
		cursor: pointer;
	}

	.delete:hover {
		background: #a03e3e;
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