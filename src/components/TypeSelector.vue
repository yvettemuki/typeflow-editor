<template>
	<el-select v-model="selected" placeholder="">
		<el-option-group
			v-for="group in selections"
			:key="group.label"
			>
			<el-option
				v-for="option in group.options"
				:key="option.value"
				:label="option.value"
				:value="option.value">
				<span class="option-item-name">{{option.value}}</span>
				<span v-if="option.value == 'Array'" class="option-item-icon">
<!--					<Add color="#000000" size="10"></Add>-->
					<i class="el-icon-arrow-right"></i>
				</span>
				<span v-if="option.value == 'Object'" class="option-item-icon">
					<i class="el-icon-plus"></i>
				</span>
			</el-option>
		</el-option-group>
	</el-select>
</template>

<script>
	import inOutputSelections from "../configs/inOutputSelections";


	export default {
		name: "TypeSelector",
		props: {

		},

		data() {
			return {
				selections: inOutputSelections,
				selected: '',
			}
		},

		methods: {
			_selectOne: function () {
				window.console.log(this.selected);
			}
		}
	}
</script>

<style lang="less" scoped>
	.option-item-name {
		float: left;
	}
	.option-item-icon {
		float: right;
		height: 100%;
		display: flex;
		align-items: center;
	}

</style>

<style>
	.el-select {
		margin-right: 10px;
	}
	.el-input__inner {
		width: 170px !important;
		height: 34px !important;
		line-height: 34px !important;
		border: 2px solid #e1e1e1 !important;
	}
	.el-input__icon {
		line-height: 30px !important;
	}
	.el-select-dropdown__item {
		font-family: Arial !important;
		font-size: 12px !important;
		font-weight: bold;
	}
	.el-select-group__wrap:not(:last-of-type)::after {
		left: 0px !important;
		right: 0px !important;
		background: #eeeeee !important;
	}
	.el-select-dropdown {
		border: none !important;
		box-shadow: 0 0 8px 0 #eeeeee !important;
	}
	.el-input__icon {
		font-weight: bolder !important;
	}
	.el-input__icon {
		width: auto !important;
	}
	.el-select-dropdown__item.selected {
		color: #1C86EE !important;
	}
	.el-select-group:first-of-type {
		max-height: 150px !important;
		overflow-y: scroll !important;
	}
	.el-select-group__wrap:not(:last-of-type) {
		padding-bottom: 18px !important;
	}
	.el-select-group__wrap:not(:last-of-type)::after {
		bottom: 9px !important;
	}
</style>