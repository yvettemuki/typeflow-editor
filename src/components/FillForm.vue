<template>
	<div>
		<input type="button" value="点击触发" @click="sendToEditor"/>
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
					childValue: String
			};
		},

		methods: {
			sendToEditor() {
				this.childValue = this.title + "then in child";
				this.$emit('getValueFromForm', this.childValue);
			}
		}
	};
</script>

<style lang="less" scoped>

</style>