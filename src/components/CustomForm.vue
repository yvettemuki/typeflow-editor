<template>
	<div class="form-container">
		<span class="title">Custom Page Size</span>
		<div class="input-div">
			<div class="input-item">
				<span class="input-font">Width:(mm) </span>
				<input class="size-input" v-model="width"/>
			</div>
			<div class="input-item">
				<span class="input-font">Height:(mm) </span>
				<input class="size-input" v-model="height"/>
			</div>
		</div>
		<button class="close-btn" @click="_closeCustomForm"></button>
		<input class="confirm-btn" type="button" value="Confirm" @click="_confirmInput"/>
	</div>
</template>

<script>
	export default {
		name: "CustomForm",

		data() {
			return {
				width: '',
				height: '',
			}
		},

		methods: {
			_confirmInput: function () {
				let numReg = /^[0-9]+$/;
				let numRe = new RegExp(numReg);
				if (!numRe.test(this.width) || !numRe.test(this.height)) {
					this.$message.warning({
						duration: 2000,
						iconClass: 'icon',
						message: "please input number!",
						customClass: 'warning-msg'
					});
				} else {
					this._sendSizeToEditor();
				}
			},

			_sendSizeToEditor: function () {
				this.$emit('updateCustomPageSize', this.width, this.height);
			},

			_closeCustomForm: function () {
				this.$emit('closeCustomForm');
			}
		}
	}
</script>

<style lang="less" scoped>
	.form-container {
		position: relative;
		height: 300px;
		width: 400px;
		background-color: #ffffff;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.input-div {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
	}
	.input-item {
		margin-top: 80px;
	}
	.size-input {
		width: 60px;
		margin-left: 5px;
		border-radius: 4px;
		height: 16px;
		outline-style: none;
		padding: 4px;
		border: 2px solid #e1e1e1;
	}
	.title {
		font-size: 16px;
		font-weight: bold;
		margin-top: 30px;
	}
	.input-font {
		font-size: 12px;
		font-weight: bold;
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
<style>
	.warning-msg {
		background-color: #ffffff !important;
		font-weight: bold;
		font-family: Arial;
	}

	.el-message__content {
		color: #C94F4F !important;
	}

	.icon-warn {
		background-image: url("../assets/warning.png");
		height: 15px;
		width: 15px;
		margin-top: 2px;
		background-repeat: no-repeat;
		background-size: 100%;
		margin-right: 10px;
	}
</style>