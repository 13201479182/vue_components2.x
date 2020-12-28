<template>
    <div id="drag-dialog-example" class="clear">
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

        <!-- 弹框菜单 -->
        <ul class="dialog-menus">
            <li v-for="(dialog, i) in dialogs"
                :key="i">
                <!-- 标题区域 -->
                <h3>{{ dialog.label }}</h3>

                <!-- 弹框开关区域 -->
                <el-switch style="display: block"
                           v-model="dialog.isShow"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           active-text="显示"
                           inactive-text="隐藏">
                </el-switch>

                <!-- 折叠面板区域 -->
                <el-collapse v-model="dialog.activeName">
                    <el-collapse-item name="1" title="显示代码">
                        <div style="text-align: right;">
                            <el-button style="margin-top: 10px;"
                                   type="primary" 
                                   size="mini"
                                   @click.stop="copyCode(i)">
                                复制代码
                            </el-button>
                        </div>

                        <pre>
                            {{ dialog.code }}
                        </pre>
                    </el-collapse-item>

                    <el-collapse-item name="2" title="代码描述">
                        {{ dialog.description }}
                    </el-collapse-item>
                </el-collapse>
            </li>
        </ul>

        <!-- 弹框视图 -->
        <ul class="dialog-views">
            <!-- 类型1: 不支持拖拽的弹框 -->
            <DragDialog class="example example1"
                        :title="dialogs[0].title"
                        :visible.sync="dialogs[0].isShow"
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
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogs: [
                    {
                        id: 1,
                        label: "1>不支持拖拽的弹框",
                        isShow: true,
                        activeName: 0,
                        code: `
                            <DragDialog class="example example1"
                                    :title="dialogs[0].title"
                                    :visible.sync="dialogs[0].isShow"
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
                        `,
                        description: `
                            1> 例如: xxx
                        `
                    }
                ]
            };
        },

        methods: {
            beforeOpen() {
				console.log("打开前");
			},

			beforeClose() {
				console.log("关闭前");
            },
            
            copyCode(i) {
                // 获取且清空选中对象
                var selection = window.getSelection(),
                    range = document.createRange();
                if(selection.rangeCount > 0) { 
                    selection.removeAllRanges();
                };

                // 执行复制
                range.selectNode( document.querySelectorAll("pre")[i] );
                selection.addRange(range);
                document.execCommand('copy');

                // 成功提醒
                this.$message({
                    type: "success",
                    message: "代码复制成功！"
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    #drag-dialog-example {
        .dialog-menus {
            padding-right: 4%;
            border-right: 3px solid #ddd; 
            width: 37%;
            float: left;
            >li {
                width: 100%;
                .el-switch {
                    margin: 30px 0;
                    padding-left: 30px;
                }
                .el-collapse {
                   margin-left: 30px;
                }
            }
        }
        .dialog-views {
            width: 55%;
            float: right;
            // 弹框组件样式
            .example {
                left: calc(94% - 40vw - 70px);
            }
            .example1 {
                top: 180px;
            }
        }
        pre {
            margin: 0;
        }
        ::v-deep .el-collapse-item__content {
            padding-bottom: 0 !important;
        }
    }
</style>
