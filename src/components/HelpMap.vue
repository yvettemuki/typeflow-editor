<template>
	<div class="help-container">
		<div v-if="pageNumber == 1">
			<div class="step-btn step-btn-next" @click="_toNextHelpPage">
				<img class="step-img" src="../assets/arrow_next.png"/>
				<span class="step-font">NEXT STEP</span>
			</div>
			<div class="drag-item">
				<Rectangle color="#1C86EE" radius="4" height="700" width="250" border-width="2"/>
				<img src="../assets/arrow.png" class="arrow-img"/>
				<div class="font-area"><span class="help-type">Draggable Area</span><br>Elements is composed with 5 types: <br>Definiton, InputEndpoint, OutputEndpoint, Other Resources and Custom Components.</div>
			</div>
			<div class="size-item">
				<Rectangle color="#1C86EE" radius="4" height="60" width="250" border-width="2"/>
				<img src="../assets/arrow.png" class="arrow-img"/>
				<div class="font-area"><span class="help-type">Size Area</span><br>Adjust the size by proportion or input your own custom size<br> to render page size.</div>
			</div>
			<div class="nav-item">
				<div class="font-area"><span class="help-type">Navigation Area</span><br>Some information of the model and the help about typeflow editor.</div>
				<img src="../assets/arrow_right.png" class="arrow-img"/>
				<Rectangle color="#1C86EE" radius="4" height="46" width="380" border-width="2"/>
			</div>
			<div class="file-item">
				<div class="font-area"><span class="help-type">File Area</span><br>File Import, Export(png/svg/xml), Generate and Save.</div>
				<img src="../assets/arrow_right.png" class="arrow-img"/>
				<Rectangle color="#1C86EE" radius="4" height="46" width="380" border-width="2"/>
			</div>
			<div class="tool-item">
				<div class="font-area"><span class="help-type">Tool Area</span><br>Tools to use on the canvas or elements in the page<br>Zoom/Undo/Redo/Delete</div>
				<img src="../assets/arrow_right.png" class="arrow-img"/>
				<Rectangle color="#1C86EE" radius="4" height="280" width="60" border-width="2"/>
			</div>
		</div>

		<div class="page-2-container" v-if="pageNumber == 2">
			<div class="step-btn step-btn-pre" @click="_toPreHelpPage">
				<img class="step-img" src="../assets/arrow_pre.png"/>
				<span class="step-font">PREVIOUS STEP</span>
			</div>
			<div class="step-btn step-btn-next" @click="_toNextHelpPage">
				<img class="step-img" src="../assets/arrow_next.png"/>
				<span class="step-font">NEXT STEP</span>
			</div>
			<SimpleDescription pic-width="360" font-size="18" font-weight="bold" container-width="600" :pic-url="require('../assets/connection.png')" desc="After drag the left elements into the page, only the Output of one Element can connect to another Element with the same name Input"/>
		</div>
	</div>

</template>

<script>
	import Rectangle from "./Rectangle";
	import SimpleDescription from "./SimpleDescription";
	export default {
		name: "HelpMap",
		components: {SimpleDescription, Rectangle},
		props: {
			pageNumber: {
				default: 1,
				type: Number
			}
		},
		data() {
			return {
			}
		},
		methods: {
			_toNextHelpPage: function () {
				this.$emit('nextPage', this.pageNumber); // 1 is the current page number
			},
			_toPreHelpPage: function () {
				this.$emit('prePage', this.pageNumber);
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>
	.page-2-container {
		display: flex;
		flex-direction: row;
	}
	.help-container {
		position: relative;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.rectangle {
		height: 700px;
		width: 250px;
		border: 2px solid #1a7edf;
		border-radius: 4px;
	}
	.drag-item {
		position: absolute;
		top: 100px;
		left: 10px;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	.font-area {
		margin-left: 30px;
		text-align: left;
	}
	.help-type {
		font-weight: bold;
		font-size: 18px;
	}
	.arrow-img {
		height: 32px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.size-item {
		position: absolute;
		top: 850px;
		left: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.tool-item {
		position: absolute;
		bottom: 20px;
		right: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.file-item {
		position: absolute;
		top: 60px;
		right: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.nav-item {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		right: 10px;
		top: 6px;
	}
	.step-btn-pre {
		position: absolute;
		top: 50%;
		left: 80px;
	}
	.step-btn-next {
		position: absolute;
		top: 50%;
		right: 80px;
	}
	.step-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}
	.step-btn:hover {
		filter: drop-shadow(0 0 0 #C94F4F);
	}
	.step-btn:hover .step-font {
		font-size: 19px;
	}
	.step-img {
		width: 60px;
		margin-bottom: 20px;
	}
	.step-font {
		font-size: 18px;
		font-weight: bold;
		color: #EA5E5E;
	}
</style>