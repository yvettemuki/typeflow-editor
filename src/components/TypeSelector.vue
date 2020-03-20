<template>
	<el-select v-model="selected" placeholder="select the type" @change="_selectOne">
		<el-option-group
			v-for="group in selections"
			:key="group.label"
			>
			<el-option
				v-for="option in group.options"
				:key="option.value"
				:label="option.value"
				:value="option.value">
				<div v-if="option.value != 'Array' && option.value != 'Object'" class="option-item">
					<span class="option-item-name">{{option.value}}</span>
				</div>
				<div v-if="option.value == 'Array'" class="option-item">
					<span class="option-item-name">{{option.value}}</span>
					<span class="option-item-icon">
						<i class="el-icon-arrow-right"></i>
					</span>
				</div>
				<div v-if="option.value == 'Object'" class="option-item">
					<span class="option-item-name">{{option.value}}</span>
					<span class="option-item-icon">
						<i class="el-icon-plus"></i>
					</span>
				</div>
			</el-option>
		</el-option-group>
	</el-select>
</template>

<script>

	export default {
		name: "TypeSelector",

		props: {
			selections: {
				default: null,
				type: Array
			},
			index: {
				default: -1,
				type: Number
			},
			listType: {
				default: "",
				type: String
			},

		},

		data() {
			return {
				selected: ''
			}
		},


		methods: {
			_selectOne: function () {
				if (this.selected === 'Array') {
					this.$emit('showArrayTypeSelect', this.index, this.listType, this.selected)
				} else if (this.selected === 'Object') {
					this.$emit('showObjectCreatePanel', this.index)
				} else {
					this.$emit('addNormalType', this.index, this.selected)
				}
			},
		},

		mounted() {

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
	.option-item {
		height: 100%;
	}
	second-selector-show {
		display: block;
	}
	second-selector-hide {
		display: none;
	}

</style>

<style>
	.el-select {
		margin-right: 10px;
	}
	.el-input {
		font-size: 12px !important;
	}
	.el-input__inner {
		width: 170px !important;
		height: 34px !important;
		line-height: 34px !important;
		border: 2px solid #e1e1e1 !important;
		color: #333333 !important;
		font-size: 11px !important;
		font-weight: bold;
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