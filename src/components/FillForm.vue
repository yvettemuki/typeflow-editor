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
					<label><strong>input{{input.index+1}}</strong></label>
					<input v-model="input.msg" class="inputs-field"/>
					<button class="minus-btn" @click="deleteInput(idx)"></button>
				</li>
			</ul>
			<button class="add-btn" @click="addOneInput">add input</button>
			</div>
			<div class="defi-input-section">
			<ul class="defi-input-ul">
				<li
					v-for="(output, idx) in outputs"
					:key="idx"
					class="input-desc">
					<label><strong>output{{output.index+1}}</strong></label>
					<input v-model="output.msg" class="inputs-field"/>
					<button class="minus-btn" @click="deleteOutput(idx)"></button>
				</li>
			</ul>
			<button class="add-btn" @click="addOneOutput">add output</button>
			</div>
		</div>

		<input class="confirm-btn" type="button" value="确认" @click="sendToEditor"/>

	</div>
</template>

<script>
	export default {
		name: "FillForm",

		props: {
			type: String,
		},

		data() {
			return {
				childValue: String,
				defiName: "",
				inputs: [
					{
						index: 0,
						msg: "UserInput"
					}
				],
				outputs: [
					{
						index: 0,
						msg: "ErrorOutput"
					}
				]
			};
		},

		methods: {
			sendToEditor() {
				this.$emit('getValueFromForm', this.defiName, this.inputs, this.outputs);
			},

			addOneInput() {
				this.inputs.push({
					index: this.inputs.length,
					msg: ""
				})
			},

			deleteInput(index) {
				this.inputs.splice(index, 1)
				this.inputs.map( ele => {
					ele.index = this.inputs.indexOf(ele)
				})
			},

			addOneOutput() {
					this.outputs.push({
							index: this.outputs.length,
							msg: ""
					})
			},

			deleteOutput(index) {
					this.outputs.splice(index, 1)
					this.outputs.map( ele => {
							ele.index = this.outputs.indexOf(ele)
					})
			}
		}
	};
</script>

<style lang="less" scoped>
	.defi-form {
		position: relative;
		height: 400px;
		width: 40%;
		z-index: 1000;
		background: #ffffff;
		border-radius: 10px;
		padding: 40px 40px 20px 40px;
		display: flex;
		flex-direction: column;
	}
	.defi-name {
		height: 30px;
		width: 100%;
		border-radius: 4px;
		border: 1px solid #d5d5d5;
		margin-top: 10px;
		padding: 0 5px 0 5px;
	}
	.defi-main-content {
		display: flex;
		flex-direction: row;
	}
	.input-desc {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.add-btn {
		height: 25px;
		width: 80px;
		border-radius: 4px;
		background: dodgerblue;
		color: #ffffff;
		float: left;
	}
	.minus-btn {
		height: 20px;
		width: 20px;
		background-image: url("../assets/delete_btn.png");
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.inputs-field {
		height: 24px;
		width: 150px;
		border-radius: 4px;
		border: 1px solid #d5d5d5;
		padding: 0 10px;
		margin: 2.5px 5px 2.5px 5px;
	}
	ul {
		padding-left: 0px;
		margin-right: 50px;
	}
	.confirm-btn {
		position: absolute;
		right: 40px;
		bottom: 40px;
		height: 30px;
		width: 100px;
		background: #42b983;
		border-radius: 4px;
		border: none;
		color: #ffffff;
	}
	.confirm-btn:hover {
		background: #2c3e50;
	}

</style>