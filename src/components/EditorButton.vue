<template>
	<input class="confirm-btn" type="button" value="Confirm"/>
</template>

<script>
	export default {
		name: "EditorButton"
	}
</script>

<style lang="less" scoped>
	.confirm-btn {
		position: absolute;
		bottom: 50px;
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