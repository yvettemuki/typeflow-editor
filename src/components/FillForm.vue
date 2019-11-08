<template>
	<div class="defi-form">
		<ul class="defi-inputs">
			<li
				v-for="(input, idx) in inputs"
				:key="idx"
				class="input-desc">
				<label>input{{input.index+1}}</label>
				<input v-model="input.msg" id="input-1"/>
				<button id="minus-btn" @click="deleteInput(idx)">减</button>
			</li>
		</ul>
		<button id="add-btn" @click="addOneInput">ADD</button>
		<input type="button" value="确认" @click="sendToEditor"/>

	</div>
</template>

<script>
	export default {
		name: "FillForm",

		props: {
			title: String,
		},

		data() {
			return {
					childValue: String,
					desc: "",
					inputs: [
						{
							index: 0,
							msg: "UserInput"
						}

					]
			};
		},

		methods: {
			sendToEditor() {
				this.$emit('getValueFromForm', this.desc);
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
			}
		}
	};
</script>

<style lang="less" scoped>
	.defi-form {
		height: 50%;
		width: 40%;
		z-index: 1000;
		background: #ffffff;
		border-radius: 10px;
		padding: 40px;
		display: flex;
		flex-direction: column;
	}
	.input-desc {

	}
	#add-btn {
		height: 25px;
		width: 80px;
		border-radius: 4px;
		background: dodgerblue;
		color: #ffffff;
	}
	#minus-btn {
		height: 30px;
		width: 30px;
		border-radius: 999px;
		background: #ff4c3d;
		color: #ffffff;
	}

</style>