<template>
	<div class="drag-dialog-use-example">
		<!-- 
			可配置属性:
			1> visible           -> 			Boolean 		是否显示弹出框,默认隐藏
			2> title             -> 			String			弹框标题,默认弹出框
			3> ecs               -> 			Boolean			默认true表示可以通过esc按键关闭选中的弹框
			4  draggable          ->			Boolean			默认true表示当前实例的弹框可以拖拽
			5> dragNodeIsParent	 ->             Boolean			默认是false,代表头部可以拖拽
			6> dragPosIsOverDoc	 ->  		    Boolean			默认是false,代表弹框是否可以可以拖拽出文档边界

			预定义事件:	
			1>beforeOpen					弹框打开前的回调(第二次打开至往后生效)
			2>beforeClose					弹框关闭前的回调(整个过程生效)
			说明: 这两个事件的存在意义在于
				一方面内容区域和底部操作区域都是将父组件的节点及逻辑直接插入子组件,本质并不由子组件控制
				另一方面为了维持组件本身状态的存在,采用了v-show机制
				故,当我们需要在弹框显隐前,对插入节点本身依赖的数据初始化时,其作为必需存在

			注意点: 想更改弹框样式,直接赋予组件类名,修改类名对应样式即可
		 -->

		<!-- 案例1 不支持拖拽的弹框 -->
		<DragDialog class="example1"
					:visible.sync="example1.isShow"
					title="example1"
					:draggable="false"
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
					:visible.sync="example2.isShow"
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
					:visible.sync="example3.isShow"
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
	</div>	
</template>

<script>
	export default {
		name: "HelloWorld",

		data() {
			return {
				// 案例1
				example1: {
					isShow: true
				},
				// 案例2
				example2: {
					isShow: true
				},
				// 案例3
				example3: {
					isShow: true
				}
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
			top: 50px;
			left: 100px;
		}
		.example2 {
			top: 250px;
			left: 700px;
		}
		.example3 {
			top: 450px;
			left: 1300px;
		}
		// 插槽内容样式在父组件配置
		.content {
			line-height: 200px;
			background: lightgoldenrodyellow;
		}
		.operations {
			line-height: 50px;
			background: lightgreen;
		}
	}
</style>
