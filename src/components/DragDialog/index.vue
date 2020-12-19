<template>
    <transition name="drag-dialog">
        <div class="global-drag-dialog" 
             :style="{zIndex: index}"
             v-show="visible" 
             ref="dialog"
             @click="click"
             v-drag="draggable && dragNodeIsParent">
            <!-- 输入框用于为当前dialog绑定键盘事件 -->
            <input type="text" ref="input" maxlength="0">

            <!-- 弹框头部区域 -->
            <div class="header" v-drag="draggable && !dragNodeIsParent">
                <!-- 头部标题区域 -->
                <span class="title">
                    {{ title }}
                </span>

                <!-- 肉步图标区域 -->
                <span class="close" title="关闭" @click="close"></span>
            </div>

            <!-- 弹框内容区域 -->
            <div class="content">
                <slot></slot>
            </div>
            
            <!-- 弹框底部区域 -->
            <div class="footer">
                <slot name="footer"></slot>
            </div>

            <!-- 弹框8个缩放顶点配置 -->
            <div class="dots" 
                 v-if="scaleable"
                 v-show="isShowDots">
                <div class="dot1"></div>
                <div class="dot2"></div>
                <div class="dot3"></div>
                <div class="dot4"></div>
                <div class="dot5"></div>
                <div class="dot6"></div>
                <div class="dot7"></div>
                <div class="dot8"></div>   
            </div>

            <!-- 默认菜单 TODO: 删除仅在缩放弹框-->
            <ContextMenu v-if="scaleable && isShowContextMenu"
                         :position="contextMenuPosition"
                         :scaleable="scaleable"
                         :isShowDots.sync="isShowDots">
            </ContextMenu>
        </div>
    </transition>
</template>

<script>
    import $ from "jquery";
    import directive from "./lib/directive.js";
    import ContextMenu from "./children/ContextMenu.vue";

    export default {
        name: "DragDialog",
        
        mixins: [directive],

        components: {
            ContextMenu
        },

        props: {
            // 是否显示弹出框
            visible: {
                type: Boolean,
                default: false
            },
            // 弹框标题
            title: {
                type: String,
                default: "弹出框"
            },
            // 是否支持esc关闭当前弹框
            esc: {
                type: Boolean,
                default: true
            },
            // 弹框是否支持拖拽
            draggable: {
                type: Boolean,
                default: true
            },
            // 拖拽容器是否是父级容器
            dragNodeIsParent: {
                type: Boolean,
                default: false
            },
            // 拖拽容器是否是拖出文档边界
            dragPosIsOverDoc: {
                type: Boolean,
                default: false
            },
            // 弹框是否支持顶点缩放
            scaleable: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                // 当前组件的层级
                index: 0,
                // 是否显示拖拽顶点
                isShowDots: true,

                // 菜单控制项数据
                isShowContextMenu: false,
                contextMenuPosition: []      
            };
        },

        methods: {
            // 对外提供打开当前弹框的方法
            open() {
                // 打开弹框
                if (this.visible) {
                    // 弹框若以打开则只需激活即可
                    this.active();
                }else {
                    this.$emit("update:visible", true);
                };
            },

            // 对外提供关闭当前弹框的方法
            close() {
                // 关闭当前弹框
                this.$emit("update:visible", false);
            },

            // 对外提供销毁当前弹框的方法
            destroy() {
                this.$destroy();
            },

            // 重载默认菜单
            oveloadContextMenu(position) {
                // 销毁默认菜单,重置坐标位置
                this.isShowContextMenu = false;
                this.contextMenuPosition = position;
                this.$nextTick(() => {
                    // 下一次dispatch开启默认菜单
                    this.isShowContextMenu = true;
                });
            },

            // 当前组件点击时处于激活状态
            active() {
                // 层级置上
                this.index = this.$dragDialogs.index++;
                // 下一次dispatch时自动聚焦
                this.$nextTick(() => {
                    this.$refs.input.focus();
                });
            },

            // 当前弹框点击时触发的事件
            click() {
                // 激活当前菜单
                this.active();
                // 在默认菜单开启的情况下关闭
                if (this.isShowContextMenu) {
                    this.isShowContextMenu = false;
                };
            },

            // 初始化事件
            initEvents() {
                // 绑定键盘事件
                this.$refs["input"]
                    .addEventListener("keydown", e => {
                        // 处理esc键码,关闭弹框
                        switch(e.keyCode) {
                            case 27: this.esc ? this.close() : false;
                            break;
                            default: break;
                        };
                    }, false);

                // 绑定鼠标右击事件   
                this.$refs["dialog"]
                    .addEventListener("contextmenu", e => {
                        // 组件右键默认行为
                        e.preventDefault();
                        // 重载默认菜单组件,且计算默认菜单应该的偏移量
                        var ol = this.$refs["dialog"].offsetLeft,
                            ot = this.$refs["dialog"].offsetTop;
                        this.oveloadContextMenu([e.clientX-ol, e.clientY-ot]);
                    }, false)
            }
        },

        created() {
            /**
             * 添加当前实例至维护对象中
             * 然后就可以通过维护对象统一控制所有该组件创建的弹框
             */
            this.$dragDialogs.addDialog(this);
        },

        mounted() {
            // 首次打开弹框自动激活
            this.active();
            // 初始化当前组件的事件
            this.initEvents();
        },

        watch: {
            visible(newVal) {
                if (newVal) {
                    // 打开前回调
                    if (this.$listeners.beforeOpen) {
                        this.$emit("beforeOpen");
                    };
                    // 当弹框显示时自动激活
                    this.active();
                }else {
                    // 关闭前回调
                    if (this.$listeners.beforeClose) {
                        this.$emit("beforeClose");
                    };
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .global-drag-dialog {
        position: fixed;
        user-select: none;
        top: 22vh;
        left: calc(50% - 20vw);
        /*弹框默认大小配置*/
        width: 40vw;
        height: 50vh;
        >input {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 0;
            padding: 0;
            border: 0;
        }
        .header {
            padding: 15px 30px;
            font-size: 20px;
            color: #b0d3ff;
            text-align: left;
            background: #374677;
            height: 30px;
            line-height: 30px;
            .close {
                margin-top: 8px;
                margin-right: 4px;
                width: 16px;
                height: 16px;
                float: right;
                background-image: url(~@/assets/img/drag_dialog_close.png);
            }
            .close:hover {
                cursor: pointer;
                margin-top: 4px;
                margin-right: 0;
                width: 24px;
                height: 24px;
                background-image: url(~@/assets/img/drag_dialog_close_hover.png);
            }
        }
        .content {
            width: 100%;
            height: calc(100% - 130px);
            overflow-y: auto;
            background: lightgoldenrodyellow;
            
        }
        .footer {
            padding: 15px 0px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: #374677;
        }
    } 
</style>
