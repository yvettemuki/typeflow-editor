<template>
	<div class="close-icon" :style="[iconStyle, crossStyle]"></div>
</template>

<script>
	export default {
		name: "CloseIcon",

		props: {
			top: {
				default: "20",
				type: String
			},
			right: {
				default: "20",
				type: String
			},
			size: {
				default: "20",
				type: String
			},
			weight: {
				default: "2",
				type: String
			},
			color: {
				default: "#333333",
				type: String,
			},
		},

		data() {
			return {
				iconStyle: {
					top: this.top + 'px',
					right: this.right + 'px',
					width: this.size + 'px',
					height: this.size + 'px',
				},
			}
		},

		computed: {
			crossStyle: function () {
				let left = (Number(this.size) - Number(this.weight)) / 2;
				let height = Number(this.size) + Number(this.weight) / 2;
				return {
					'--close-icon-left': left + 'px',
					'--close-icon-width': this.weight + 'px',
					'--close-icon-height': height + 'px',
					'--close-icon-background-color': this.color
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.close-icon {
		position: absolute;
		opacity: 0.5;
		cursor: pointer;
	}
	.close-icon:hover {
		opacity: 1;
	}
	.close-icon::before, .close-icon::after {
		position: absolute;
		left: var(--close-icon-left);
		content: ' ';
		height: var(--close-icon-height);
		width: var(--close-icon-width);
		background-color: var(--close-icon-background-color);
	}
	.close-icon::before {
		transform: rotate(45deg);
	}
	.close-icon::after {
		transform: rotate(-45deg);
	}

</style>