<template>
	<div class="setting-container">
		<span class="title">{{type}} Setting</span>
		<button class="close-btn" @click="_closeSetting"></button>
		<ul>
			<li v-for="(element, index) in elementList" :key="index">{{element}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "ElementSetting",
		props: {
			type: {
				default: "",
				type: String
			},
			elementList: {
				default: null,
				type: Array
			}
		},
		data() {
			return {

			}
		},
		methods: {
			_closeSetting: function () {
				this.$emit("closeElementSetting");
			}
		}
	}
</script>

<style lang="less" scoped>
	.setting-container {
		position: relative;
		width: 550px;
		height: 350px;
		background: #ffffff;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
	}
	.title {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
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

</style>