const store = {
	state: {
		inOutputSelections: [
			{
				label: 'normal',
				options: [{
					value: "Number",
					status: 0 // 0-onShow 1-onHide
				}, {
					value: "String",
					status: 0
				}, {
					value: "Boolean",
					status: 0
				}],
			}, {
				label: 'array',
				options: [{
					value: "Array",
					status: 0
				}]
			}, {
				label: 'object',
				options: [{
					value: 'Object',
					status: 0
				}]
			}
		]
	},

	getSelections() {
		return this.state.inOutputSelections;
	},

	setSelections(newSelections) {
		this.state.inOutputSelections = newSelections
	},

	addArrayType(newType) {
		this.state.inOutputSelections[0].options.push({
			value: newType,
			status: 0
		})
	},

	addObjectType(newType, attributes) {
		this.state.inOutputSelections[0].options.push({
			value: newType,
			status: 0,
			attributes: attributes
		})
	},

	findNormalType(type) {
		return this.state.inOutputSelections[0].options.find(item => item.value === type);
	}
}

export default store