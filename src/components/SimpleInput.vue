<template>
	<div class="form-div">
		<label class="title"><b>{{title}}</b></label>
		<input class="input-div" v-model="inputContent"/>
		<span v-if="tips.length > 0" class="tips">{{tips}} "{{title}}"</span>
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
			},
			type: {
				default: 0, // 0 create new vertex type ; 1 create new element type
				type: Number,
			},
			tips: {
				type: String,
				default: ""
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
					this.$message.warning({
						duration: 1000,
						iconClass: 'icon',
						message: "input can not be empty!",
						customClass: 'warning-msg'
					});
					return;
				}
				if (this.type == 1) {
					if (!this.inputContent.includes(this.title)) {
						this.$message.warning({
							duration: 2000,
							iconClass: 'icon',
							message: "input should include \"" + this.title + "\"!",
							customClass: 'warning-msg'
						});
						return;
					}
				}
				this.$emit('getValueFromSimpleForm', this.title, this.id, this.inputContent);
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

	.tips {
		margin-top: 4px;
		font-size: 10px;
		font-weight: bold;
		color: #EA5E5E;
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