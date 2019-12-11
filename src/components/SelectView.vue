<template>
	<div class="select-view">
		<span class="title"><b>Choose</b></span>
		<div class="select-btn" @click="this._chooseLocal"><b>import from xml</b></div>
		<div class="select-btn" @click="_chooseDatabase"><b>import from database</b></div>
		<span class="note"><b>NOTE: all the existing models will be cleared after import, make sure save before the action!</b></span>
		<button class="close-btn" @click="_closeView"></button>
	</div>
</template>

<script>
	export default {
		name: "SelectView",
		data() {
			return {
				type: -1,
			}
		},
		methods: {
			_chooseLocal: function () {
				this.type = 0;
				this.$emit("sendChooseToEditor", this.type);
			},

			_chooseDatabase: function () {
				this.type = 1;
				this.$emit("sendChooseToEditor", this.type);
			},

			_closeView: function () {
				this.$emit("closeSelectView");
			}
		}
	}
</script>

<style lang="less" scoped>
	.select-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		height: 280px;
		width: 400px;
		border-radius: 4px;
		background: #ffffff;
	}
	.title {
		margin-top: 30px;
		margin-bottom: 20px;
		font-size: 20px;
	}
	.select-btn {
		height: 50px;
		width: 250px;
		margin-top: 10px;
		line-height: 50px;
		border-radius: 4px;
		box-shadow: 0px 1px 2px 1.5px #e3e3e3;
		cursor: pointer;
	}
	.select-btn:hover {
		color: #ffffff;
		background-color: #1c86ee;
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
	.note {
		margin-top: 30px;
		width: 70%;
		font-size: 10px;
		color: #C94F4F;
	}
</style>