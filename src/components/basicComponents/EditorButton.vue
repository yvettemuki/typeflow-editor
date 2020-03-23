<template>
	<input class="confirm-btn" type="button" :value="text" :style="buttonStyle"/>
</template>

<script>
	export default {
		name: "EditorButton",

		props: {
			text: {
				default: "none_value",
				type: String
			},
			bgColor: {
				default: "#42b983",
				type: String
			},
			bgColorHover: {
				default: "#3eae7b",
				type: String
			},
			posiBottom: {
				default: "50",
				type: String,
			},
			btnPosition: {
				default: "absolute",
				type: String
			}
		},

		data() {
			return {

			}
		},

		computed: {
			buttonStyle: function () {
				return {
					'--button-background-color': this.bgColor,
					'--button-background-color-hover': this.bgColorHover,
					'--button-bottom': this.posiBottom + "px",
					'--button-position': this.btnPosition,
				};
			}
		}

	}
</script>

<style lang="less" scoped>
	.confirm-btn {
		position: var(--button-position);
		bottom: var(--button-bottom);
		margin: 0 auto;
		height: 30px;
		width: 100px;
		font-weight: bold;
		background-color: var(--button-background-color);
		border-radius: 4px;
		border: none;
		color: #ffffff;
		cursor: pointer;
	}

	.confirm-btn:hover {
		background-color: var(--button-background-color-hover);
	}

</style>