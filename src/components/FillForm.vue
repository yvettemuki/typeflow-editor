<template>
	<div class="defi-form">
		<label><strong>{{type}}</strong></label>
		<input v-model="defiName" class="defi-name" placeholder="Definition Name"/>
		<div class="defi-main-content">
			<div class="defi-input-section">
			<ul class="defi-input-ul">
				<li
					v-for="(input, idx) in inputs"
					:key="idx"
					class="input-desc">
					<label class="input-label"><strong>Int{{input.index+1}}</strong></label>
					<input v-model="input.id" class="inputs-field"/>
					<button class="minus-btn" @click="_deleteInput(idx)"></button>
				</li>
			</ul>
			<button class="add-btn" @click="_addOneInput"><b>add common input</b></button>
			</div>
			<div class="defi-input-section">
			<ul class="defi-input-ul">
				<li
					v-for="(output, idx) in outputs"
					:key="idx"
					class="input-desc">
					<label class="input-label"><strong>Out{{output.index+1}}</strong></label>
					<input v-model="output.id" class="inputs-field"/>
					<button class="minus-btn" @click="_deleteOutput(idx)"></button>
				</li>
			</ul>
			<button class="add-btn" @click="_addOneOutput"><b>add common output</b></button>
			</div>
		</div>
		<div class="defi-main-content">
			<div class="defi-input-section">
			<ul class="defi-input-ul">
				<li
					v-for="(output, idx) in alternativeOutputs"
					:key="idx"
					class="input-desc">
					<label class="input-label"><strong>Out{{output.index+1}}</strong></label>
					<input v-model="output.id" class="inputs-field"/>
					<button class="minus-btn" @click="_deleteAlterOutput(idx)"></button>
				</li>
			</ul>
				<button class="add-btn" @click="_addOneAlterOutput"><b>add alternative output</b></button>
			</div>
			<div class="defi-input-section">
			<ul class="defi-input-ul">
				<li
					v-for="(output, idx) in exceptionOutputs"
					:key="idx"
					class="input-desc">
					<label class="input-label"><strong>Out{{output.index+1}}</strong></label>
					<input v-model="output.id" class="inputs-field"/>
					<button class="minus-btn" @click="_deleteExceptOutput(idx)"></button>
				</li>
			</ul>
				<button class="add-btn" @click="_addOneExceptOutput"><b>add exception output</b></button>
			</div>
		</div>
		<button class="close-btn" @click="_sendToEditorWhenCancel"></button>
		<input class="confirm-btn" type="button" value="Confirm" @click="_sendToEditor"/>

	</div>
</template>

<script>
	export default {
		name: "FillForm",

		props: {
			id: String,
			type: String,
		},

		data() {
			return {
				defiName: "",
				inputs: [
					{
						index: 0,
						id: ""
					},
					{
						index: 1,
						id: ""
					},
				],
				outputs: [
					{
						index: 0,
						id: ""
					},
					{
						index: 1,
						id: ""
					},
				],
				alternativeOutputs: [
					{
						index: 0,
						id: ""
					},
				],
				exceptionOutputs: [
					{
						index: 0,
						id: ""
					},
				]
			};
		},

		methods: {
			_sendToEditor() {
				window.console.log("in the fill form" + typeof this.inputs);
				this.$emit('getValueFromForm', this.id, this.type, this.defiName, this.inputs, this.outputs, this.alternativeOutputs, this.exceptionOutputs);
			},

			_sendToEditorWhenCancel() {
				this.$emit('closeForm', this.id, false);
			},

			_addOneInput() {
				this.inputs.push({
					index: this.inputs.length,
					id: ""
				})
			},

			_deleteInput(index) {
				this.inputs.splice(index, 1)
				this.inputs.map( ele => {
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
				this.outputs.map( ele => {
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
				this.alternativeOutputs.map( ele => {
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
				this.exceptionOutputs.map( ele => {
					ele.index = this.exceptionOutputs.indexOf(ele)
				})
			},
		}
	};
</script>

<style lang="less" scoped>
	.defi-form {
		position: relative;
		height: 550px;
		width: 40%;
		min-width: 640px;
		z-index: 1000;
		background: #ffffff;
		border-radius: 10px;
		padding: 40px 40px 20px 40px;
		display: flex;
		flex-direction: column;
	}
	.defi-name {
		height: 30px;
		border-radius: 4px;
		border: 1px solid #d5d5d5;
		margin-top: 20px;
		padding: 0 5px 0 5px;
	}
	.defi-input-ul {
		height: 120px;
		overflow-y: scroll;
	}
	.defi-main-content {
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
		height: 25px;
		min-width: 55%;
		border-radius: 4px;
		background: dodgerblue;
		color: #ffffff;
		float: left;
		cursor: pointer;
	}
	.add-btn:hover {
		background: #1c86ee;
	}
	.minus-btn {
		height: 20px;
		width: 20px;
		background-image: url("../assets/delete_btn.png");
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		height: 25px;
		width: 25px;
		background-image: url("../assets/close_btn.png");
		background-repeat: no-repeat;
		background-size: 100%;
		cursor: pointer;
	}
	.inputs-field {
		height: 24px;
		width: 200px;
		border-radius: 4px;
		border: 1px solid #d5d5d5;
		padding: 0 10px;
		margin: 2.5px 5px 2.5px 5px;
	}
	ul {
		padding-left: 0px;
	}
	.confirm-btn {
		position: absolute;
		right: 40px;
		bottom: 30px;
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
		background: #2c3e50;
	}
	.input-label {
		color: #a5a5a5;
	}

</style>