<template>
	<div class="validate-container">
		<span class="validate-font">Are you sure you want to delete <br><span class="model-name">{{model.name}}</span> ?</span>
		<div class="button-container">
			<button class="validate-btn confirm-btn" @click="_sendValidateToEditor(true)">Confirm</button>
			<button class="validate-btn cancel-btn" @click="_sendValidateToEditor(false)">Cancel</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ValidatePanel",
		props: {
			model: {
				default: null,
				type: Object,
			}
		},
		methods: {
			_sendValidateToEditor: function (isDelete) {
				this.$emit('deleteModel', isDelete, this.model);
			}
		}
	}
</script>

<style lang="less" scoped>
	.validate-container {
		width: 400px;
		height: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		background: #ffffff;
		border-radius: 8px;
	}
	.validate-font {
		font-weight: bold;
	}
	.confirm-btn {
		background: #42b983;
	}
	.cancel-btn {
		background: #1C86EE;
	}
	.confirm-btn:hover {
		background: #3daa78;
	}
	.cancel-btn:hover {
		background: #1a7dde;
	}
	.validate-btn {
		width: 100px;
		height: 30px;
		color: #ffffff;
		font-size: 12px;
		font-weight: bold;
		border-radius: 4px;
		cursor: pointer;
	}
	.button-container {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
	}
	.model-name {
		color: #d64e4c;
	}

</style>