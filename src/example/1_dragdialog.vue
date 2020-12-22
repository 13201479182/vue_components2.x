<template>
	<div class="drag-dialog-use-example">
		<!-- 
			可配置属性:
			1> visible            -> 			Boolean 		是否显示弹出框,默认隐藏
			2> title              -> 			String			弹框标题,默认弹出框
			3> ecs                -> 			Boolean			默认true表示可以通过esc按键关闭选中的弹框
			4  draggable          ->			Boolean			默认true表示当前实例的弹框可以拖拽
			5> dragNodeIsParent	  ->            Boolean			默认是false,代表头部可以拖拽
			6> dragPosIsOverDoc	  ->  		    Boolean			默认是false,代表弹框是不可以可以拖拽出文档边界
			7> isHasOwnMenu		  ->            Boolean			默认为true,代表弹框初始化自带右键自定义菜单 
			9> scaleable	  	  ->  		    Boolean			默认是false,代表弹框是不可以缩放尺寸

			预定义事件:	
			1> beforeOpen		  弹框打开前的回调(第二次打开至往后生效)
			2> beforeClose		  弹框关闭前的回调(整个过程生效)

			注意点: 想更改弹框样式,直接赋予组件类名,修改类名对应样式即可,在修改位置时请使用top和left去层叠默认样式

			建议: 
				1> 使用缩放配置scaleable时,请将dragPosIsOverDoc设置为true,体验更佳
		 -->
		<ul>
			<li v-for="item in examples"
			    :key="item.name"
				@click="item.isShow=true">
				{{ "打开： " + item.name }}
			</li>
		</ul>

		<!-- 案例1 不支持拖拽的弹框 -->
		<DragDialog class="example1"
				    title="example1"
					:visible.sync="examples[0].isShow"
					:draggable="false"
					:isHasOwnMenu="false"
					@beforeOpen="beforeOpen"
					@beforeClose="beforeClose">
			<!-- 默认内容插槽 -->
			<div class="content">当前弹框不支持拖拽</div>

			<!-- 底部操作按钮插槽 -->
			<template v-slot:footer>
				<div class="operations">
					操作区域
				</div>
			</template>
		</DragDialog>

		<!-- 案例2 支持拖拽头部,且可以越界的弹框 -->
		<DragDialog class="example2"
					:visible.sync="examples[1].isShow"
					title="example2"
					:dragPosIsOverDoc="true"
					@beforeOpen="beforeOpen"
					@beforeClose="beforeClose">
			<div class="content">当前弹框仅支持头部区域拖拽,且可以拖拽出视窗</div>

			<template v-slot:footer>
				<div class="operations">
					操作区域
				</div>
			</template>
		</DragDialog>

		<!-- 案例3 支持整体拖拽,且不可以越界的弹框 -->
		<DragDialog class="example3"
					:visible.sync="examples[2].isShow"
					title="example3"
					:dragNodeIsParent="true"
					@beforeOpen="beforeOpen"
					@beforeClose="beforeClose">
			<div class="content">当前弹框仅全身区域拖拽,且不可以拖拽出视窗</div>

			<template v-slot:footer>
				<div class="operations">
					操作区域
				</div>
			</template>
		</DragDialog>

		<!-- 案例4 支持缩放的弹框 -->
		<DragDialog class="example4"
					:visible.sync="examples[3].isShow"
					title="example4"
					:scaleable="true"
					:isHasOwnMenu="true"
					@beforeOpen="beforeOpen"
					@beforeClose="beforeClose">
			<div class="content">支持头部拖拽,同时支持弹框边界9个顶点控制弹框大小</div>
		
			<template v-slot:footer>
				<div class="operations">
					操作区域
				</div>
			</template>
		</DragDialog>
	</div>	
</template>

<script>
	export default {
		name: "HelloWorld",

		data() {
			return {
				examples: [
					{
						name: "example1",
						isShow: true
					},
					{
						name: "example2",
						isShow: true
					},
					{
						name: "example3",
						isShow: true
					},
					{
						name: "example4",
						isShow: true
					}
				]
			}
		},

		methods: {
			beforeOpen() {
				console.log("打开前");
			},

			beforeClose() {
				console.log("关闭前");
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	// 样式修改示例
	.drag-dialog-use-example {
		// 注意点: 在修改位置时,请使用top和left去层叠默认的
		.example1 {
			top: 180px;
			left: 10px;
		}
		.example2 {
			top: 210px;
			left: 410px;
		}
		.example3 {
			top: 240px;
			left: 810px;
		}
		.example4 {
			top: 100px;
			left: 400px;
			width: 70vw;
			height: 60vh;
		}
		// 插槽内容样式在父组件配置
		.content {
			line-height: 300px;
		}
		>ul {
			li {
				list-style: none;
				display: inline-block;
				margin: 0 30px; 
			}
		}
	}
</style>
