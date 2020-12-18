<template>
	<div class="drag-dialog-use-example">
		<!-- 
			可配置属性:
			1> visible -> 			Boolean 		是否显示弹出框,默认隐藏
			2> title   -> 			String			弹框标题,默认弹出框
			3> ecs     -> 			Boolean			用于配置层是否需要通过esc键关闭,默认true
			4> dragNodeIsParent	    Boolean			默认是false,代表头部可以拖拽
			4> dragPosIsOverDoc	    Boolean			默认是false,代表弹框是否可以可以拖拽出文档边界

			预定义事件:	
			1>beforeOpen					弹框打开前的回调(第二次打开至往后生效)
			2>beforeClose					弹框关闭前的回调(整个过程生效)
			说明: 这两个事件的存在意义在于
				一方面内容区域和底部操作区域都是将父组件的节点及逻辑直接插入子组件,本质并不由子组件控制
				另一方面为了维持组件本身状态的存在,采用了v-show机制
				故,当我们需要在弹框显隐前,对插入节点本身依赖的数据初始化时,其作为必需存在

			注意点: 想更改弹框样式,直接赋予组件类名,修改类名对应样式即可
		 -->
		<a @click="isShowDialog = true">打开弹框</a>

		<!-- 使用全局拖拽组件 -->
		<DragDialog class="layers"
					:visible.sync="isShowDialog"
					:title="title"
					:dragNodeIsParent="dragNodeIsParent"
					:dragPosIsOverDoc="dragPosIsOverDoc"
					@beforeOpen="beforeOpen"
					@beforeClose="beforeClose">
			<!-- 默认内容插槽 -->
			<div class="content">支持头部拖拽</div>

			<!-- 底部操作按钮插槽 -->
			<template v-slot:footer>
				<div class="operations">
					tip: 不支持越界
				</div>
			</template>
		</DragDialog>

		<DragDialog class="layers_test"
					:visible.sync="testShow"
					title="layers_test"
					:dragNodeIsParent="true"
					:dragPosIsOverDoc="true"
					@beforeOpen="beforeOpen"
					@beforeClose="beforeClose">
			<div class="content">支持整体拖拽</div>

			<template v-slot:footer>
				<div class="operations">
					tip: 支持越界
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
				isShowDialog: true,
				title: "图层管理",
				dragNodeIsParent: false,
				dragPosIsOverDoc: false,

				testShow: true
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
		.layers {
			// 注意点: 在修改位置时,请使用top和left去层叠默认的
			top: 150px;
		}
		.layers_test {
			left: 100px;
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
