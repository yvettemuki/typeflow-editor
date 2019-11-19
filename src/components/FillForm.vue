<template>
	<div class="defi-form">
		<label class="defi-type"><b>{{type}}</b></label>
		<input v-model="defiName" class="defi-name" placeholder="type the definition name"/>
		<div class="defi-main-content">
			<div class="defi-input-section">
				<div class="defi-title-info-and-add">
					<div class="defi-title-info">
						<label class="defi-title"><b>input list</b></label>
						<div class="defi-info"></div>
					</div>
					<button class="add-btn" @click="_addOneInput"></button>
				</div>
				<div class="blank-block" v-if="inputs.length <= 0">
					add one if you need
				</div>
				<ul v-else class="defi-input-ul">
					<li
						v-for="(input, idx) in inputs"
						:key="idx"
						class="input-desc">
	<!--					<label class="input-label"><strong>Int{{input.index+1}}</strong></label>-->
						<input v-model="input.id" class="inputs-field"/>
						<button class="minus-btn" @click="_deleteInput(idx)"></button>
					</li>
				</ul>
			</div>
			<div class="defi-input-section">
				<div class="defi-title-info-and-add">
					<div class="defi-title-info">
						<label class="defi-title"><b>output list</b></label>
						<div class="defi-info"></div>
					</div>
					<button class="add-btn" @click="_addOneOutput"></button>
				</div>
				<div class="blank-block" v-if="outputs.length <= 0">
					add one if you need
				</div>
				<ul v-else class="defi-input-ul">
					<li
						v-for="(output, idx) in outputs"
						:key="idx"
						class="input-desc">
	<!--					<label class="input-label"><strong>Out{{output.index+1}}</strong></label>-->
						<input v-model="output.id" class="inputs-field"/>
						<button class="minus-btn" @click="_deleteOutput(idx)"></button>
					</li>
				</ul>
			</div>
		</div>
		<div class="defi-main-content">
			<div class="defi-input-section">
				<div class="defi-title-info-and-add">
					<div class="defi-title-info">
						<label class="defi-title"><b>alternative output list</b></label>
						<div class="defi-info"></div>
					</div>
					<button class="add-btn" @click="_addOneAlterOutput"></button>
				</div>
				<div class="blank-block" v-if="alternativeOutputs.length <= 0">
					add one if you need
				</div>
				<ul v-else class="defi-input-ul">
					<li
						v-for="(output, idx) in alternativeOutputs"
						:key="idx"
						class="input-desc">
	<!--					<label class="input-label"><strong>Out{{output.index+1}}</strong></label>-->
						<input v-model="output.id" class="inputs-field"/>
						<button class="minus-btn" @click="_deleteAlterOutput(idx)"></button>
					</li>
				</ul>
			</div>
			<div class="defi-input-section">
				<div class="defi-title-info-and-add">
					<div class="defi-title-info">
						<label class="defi-title"><b>exception output list</b></label>
						<div class="defi-info"></div>
					</div>
					<button class="add-btn" @click="_addOneExceptOutput"></button>
				</div>
				<div class="blank-block" v-if="exceptionOutputs.length <= 0">
					add one if you need
				</div>
				<ul v-else class="defi-input-ul">
					<li
						v-for="(output, idx) in exceptionOutputs"
						:key="idx"
						class="input-desc">
	<!--					<label class="input-label"><strong>Out{{output.index+1}}</strong></label>-->
						<input v-model="output.id" class="inputs-field"/>
						<button class="minus-btn" @click="_deleteExceptOutput(idx)"></button>
					</li>
				</ul>
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
				],
				outputs: [
					{
						index: 0,
						id: ""
					},
				],
				alternativeOutputs: [
					// {
					// 	index: 0,
					// 	id: ""
					// },
				],
				exceptionOutputs: [
					// {
					// 	index: 0,
					// 	id: ""
					// },
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
		border: 1px solid #e1e1e1;
		margin-top: 30px;
		padding: 0 10px 0 10px;
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
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.defi-title {
		font-size: 14px;
	}
	.defi-info {
		height: 10px;
		width: 9px;
		margin-left: 5px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url("../assets/info.png");
	}
	.defi-input-ul {
		height: 150px;
		overflow-y: scroll;
		margin-top: 0;
		margin-bottom: 10px;
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
		border: 1px solid #e1e1e1;
		padding: 0 10px;
		margin: 5px 5px 5px 0;
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
		border: 1px #e9e9e9 solid;
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #9e9e9e;
	}

</style>