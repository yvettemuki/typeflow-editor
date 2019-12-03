<template>
	<div class="form-div">
		<label class="title"><b>{{title}}</b></label>
		<input class="input-div" v-model="inputContent"/>
		<button class="close-btn" @click="_sendToEditor"></button>
		<input class="confirm-btn" type="button" value="Confirm" @click="_sendNameToEditor"/>
	</div>
</template>

<script>
	export default {
		name: "SimpleInput",
		props: {
			title: String,
			id: {
				type: String,
				default: "no-id"
			}
		},
		data() {
			return {
				inputContent: ""
			}
		},
		methods: {
			_sendNameToEditor: function () {
				if(this.inputContent.length == 0) {
					this.$message.warning("input can not be empty!");
					return;
				}
				this.$emit('getValueFromSimpleForm', this.id, this.inputContent);
			},
			_sendToEditor: function () {
				this.$emit('closeSimpleForm', this.id)
			}
		}
	}
</script>

<style lang="less" scoped>
	.title {
		color: #333333;
	}

	.form-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		height: 150px;
		width: 250px;
		border-radius: 4px;
		background: #ffffff;
		padding: 40px;
	}

	.input-div {
		margin-top: 10px;
		width: 100%;
		height: 30px;
		border-radius: 4px;
		border: 2px solid #e1e1e1;
		padding-left: 10px;
		padding-right: 10px;
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
		position: absolute;
		bottom: 40px;
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