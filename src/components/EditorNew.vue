<template>
	<div class="main-container">
		<div class="navigator">
			<div class="title-logo"><b>TypeFlow Editor</b></div>
			<div class="nav-content">
				<span class="nav-item"><b>Model:</b> no name</span>
				<span class="nav-item"><b>Status:</b> unsave</span>
				<img class="nav-item nav-info" src="../assets/wenhao.png"/>
			</div>
		</div>
		<div class="tool-bar">
			<div class="tool-item general-item">Import</div>
			<div class="tool-item general-item">Export</div>
			<div class="tool-item generate-item">Generate</div>
			<div class="tool-item save-item">Save</div>
		</div>
		<div class="core-container">
			<div class="element-container">
				<div class="element-item">
					<span class="element-type">Definition</span>
					<BasicLine color="#EDEDED"/>
					<ul class="element-ul">
						<li class="element-li purefunction-item">PureFunction</li>
					</ul>
				</div>
				<div class="element-item">
					<BasicLine color="#EDEDED"/>
					<span class="element-type">InputEndpoint</span>
					<BasicLine color="#EDEDED"/>
					<ul class="element-ul">
						<li class="element-li">InputEndpoint</li>
						<li class="element-li">InputEndpoint</li>
						<li class="element-li">InputEndpoint</li>
						<li class="element-li">InputEndpoint</li>
					</ul>
				</div>
				<div class="element-item">
					<BasicLine color="#EDEDED"/>
					<span class="element-type">OutputEndpoint</span>
					<BasicLine color="#EDEDED"/>
					<ul class="element-ul">
						<li class="element-li">OutputEndpoint</li>
						<li class="element-li">OutputEndpoint</li>
					</ul>
				</div>
				<div class="element-item">
					<BasicLine color="#EDEDED"/>
					<span class="element-type">Others</span>
					<BasicLine color="#EDEDED"/>
					<ul class="element-ul">
						<li class="element-li">Resource</li>
					</ul>
				</div>
				<div class="element-item">
					<BasicLine color="#EDEDED"/>
					<span class="element-type">My Components</span>
					<BasicLine color="#EDEDED"/>
					<ul class="element-ul">
						<li class="element-li">NumInput</li>
					</ul>
				</div>
				<div class="element-tool-bar">
					<BasicLine color="#EDEDED"/>
					<div class="ele-tool-top">
						<span class="ele-tool-top-item">Undo</span>
						<span class="ele-tool-top-item">Redo</span>
						<span class="ele-tool-top-item delete-item">Delete</span>
					</div>
					<span class="zoom-title">Zoom</span>
					<div class="zoom">
						<Add weight="4" size="16" radius="100" color="#000000" @click.native="_zoomIn"></Add>
						<Delete height="4" width="16" radius="999" color="#000000" @click.native="_zoomOut"></Delete>
					</div>
				</div>
			</div>
			<div class="graph-container"></div>
		</div>
	</div>
</template>

<script>
	import BasicLine from "./BasicLine";
	import Add from './Add';
	import Delete from './Delete';
	export default {
		name: "EditorNew",
		components: {BasicLine,Add, Delete}
	}
</script>

<style lang="less" scoped>
	.main-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.navigator {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20px;
		justify-content: space-between;
		height: 60px;
		background: #ffffff;
		box-shadow: 0px 1px 8px 0px #ebebeb;
	}
	.nav-info {
		height: 28px;
		width: 28px;
	}
	.nav-content {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.nav-item {
		margin-left: 10px;
	}
	.title-logo {
		font-size: 22px
	}
	.tool-bar {
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 0 20px;
	}
	.tool-item {
		line-height: 28px;
		height: 28px;
		width: 80px;
		border-radius: 999px;
		color: #ffffff;
		font-size: 12px;
		font-weight: bolder;
		cursor: pointer;
		margin-left: 15px;
	}
	.general-item {
		background: #315B96;
	}
	.general-item:hover {
		background: #2b5084;
	}
	.generate-item {
		background: #1c86ee;
	}
	.generate-item:hover {
		background: #1874ce;
	}
	.save-item {
		background: #EC9B3B;
	}
	.save-item:hover {
		background: #dd9237;
	}
	.core-container {
		display: flex;
		flex-direction: row;
		height: calc(86vh);
	}
	.element-container {
		height: 100%;
		width: 270px;
		box-shadow: 0px 1px 8px 0px #ebebeb;
	}
	.graph-container {
		height: 100%;
		flex: 1;
		box-shadow: 0px 1px 4px 0px #dcdcdc;
		background: #f7f7f7;
		margin: 0 20px 0px 14px;
	}
	.element-item {
		display: flex;
		flex-direction: column;
	}
	.element-type {
		height: 40px;
		line-height: 40px;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		font-size: 14px;
		justify-content: flex-start;
		padding: 0 20px 0px 20px;
	}
	.element-ul {
		padding: 20px 20px 8px 20px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0px;
		justify-content: space-between;
		max-height: 96px;
		overflow-y: scroll;
	}
	.element-li {
		background: #34495D;
		height: 36px;
		width: 109px;
		line-height: 36px;
		border-radius: 4px;
		color: #ffffff;
		font-size: 14px;
		font-weight: bold;
		cursor: cell;
		margin-bottom: 12px;
	}
	.purefunction-item {
		background: #42B982;
	}
	.element-tool-bar {
		height: 170px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.ele-tool-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 20px;
	}
	.ele-tool-top-item {
		font-size: 12px;
		width: 70px;
		height: 30px;
		line-height: 30px;
		background: #1C86EE;
		border-radius: 4px;
		color: #ffffff;
		font-weight: bold;
	}
	.delete-item {
		background: #E35351;
	}
	.zoom {
		height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		background: #ffffff;
		padding: 0px 10px 0px 10px;
		margin: 10px 20px 10px 20px;
		border-radius: 999px;
		box-shadow: 0px 1px 2px 1.5px #e3e3e3;
	}
	.zoom-title {
		font-size: 14px;
		font-weight: bold;
	}
</style>