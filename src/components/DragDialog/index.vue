<template>
    <transition name="drag-dialog">
        <div class="global-drag-dialog" 
             v-show="visible" 
             :style="{zIndex: index}"
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

                <!-- 关闭图标区域 -->
                <span class="close" title="关闭" @click="closeDialog"></span>
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
                 :style="isShowDots ? {opacity: 1} : {opacity: 0}">
                <div class="dot1" ref="dot1"></div>
                <div class="dot2" ref="dot2"></div>
                <div class="dot3" ref="dot3"></div>
                <div class="dot4" ref="dot4"></div>
                <div class="dot5" ref="dot5"></div>
                <div class="dot6" ref="dot6"></div>
                <div class="dot7" ref="dot7"></div>
                <div class="dot8" ref="dot8"></div>   
            </div>

            <!-- 默认菜单-->
            <ContextMenu v-if="isHasOwnMenu && isShowContextMenu"
                         :position="contextMenuPosition"
                         :scaleable="scaleable"
                         :isShowDots.sync="isShowDots"
                         :isShowContextMenu.sync="isShowContextMenu">
            </ContextMenu>
        </div>
    </transition>
</template>

<script>
    import $ from "jquery";
    import directive from "./lib/directive.js";
    import ContextMenu from "./children/ContextMenu.vue";
    // 获取顶点缩放对应的功能函数
    import {
        initDotTopLeftEvent,
        initDotTopCenterEvent,
        initDotTopRightEvent,
        initDotLeftCenterEvent,
        initDotRightCenterEvent,
        initDotLeftBottomEvent,
        initDotCenterBottomEvent,
        initDotBottomLeftEvent,
        bindCancelMouseMove,
        destroyOwnEvents,
    } from "./lib/common.js";

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
            // 是否启用组件自带的右键菜单
            isHasOwnMenu: {
                type: Boolean,
                default: true
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

                // 所有弹框都配有右键菜单,只是显示与隐藏,存在和不存在的关系
                isShowContextMenu: false,
                contextMenuPosition: []      
            };
        },

        methods: {
            // 对外提供打开当前弹框的方法
            openDialog() {
                // 打开弹框
                if (this.visible) {
                    // 弹框若以打开则只需激活即可
                    this.active();
                }else {
                    this.$emit("update:visible", true);
                };
            },

            // 对外提供关闭当前弹框的方法
            closeDialog() {
                // 关闭当前弹框
                this.$emit("update:visible", false);
            },

            // 对外关闭当前弹框对应菜单的方法
            closeContextMenu() {
                this.isShowContextMenu = false;
            },

            // 对外提供永久关闭(销毁)当前弹框的方法
            destroyDialog() {
                // 关闭当前窗口
                this.closeDialog();
                // 下一次dom更新后再销毁此组件
                this.$nextTick(() => {
                    // 销毁组件
                    this.$destroy();
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

            // 为每一个顶点添加具体的事件功能
            initDotsEvevnt() {
                // 1>绑定左上顶点对应的事件
                initDotTopLeftEvent(
                    $( this.$refs["dot1"] ),
                    $( this.$refs["dialog"] ),
                    this.active
                );
                // 2>绑定左正上顶点对应的事件
                initDotTopCenterEvent(
                    $( this.$refs["dot2"] ),
                    $( this.$refs["dialog"] ),
                    this.active
                );
                // 3>绑定右上顶点对应的事件
                initDotTopRightEvent(
                    $( this.$refs["dot3"] ),
                    $( this.$refs["dialog"] ),
                    this.active
                );
                // 4>绑定左中顶点对应的事件
                initDotLeftCenterEvent(
                    $( this.$refs["dot4"] ),
                    $( this.$refs["dialog"] ),
                    this.active
                );
                // 5>绑定右中顶点对应的事件
                initDotRightCenterEvent(
                    $( this.$refs["dot5"] ),
                    $( this.$refs["dialog"] ),
                    this.active
                );
                // 6>绑定右下顶点对应的事件
                initDotLeftBottomEvent(
                    $( this.$refs["dot6"] ),
                    $( this.$refs["dialog"] ),
                    this.active
                );
                // 7>绑定下中顶点对应的事件
                initDotCenterBottomEvent(
                    $( this.$refs["dot7"] ),
                    $( this.$refs["dialog"] ),
                    this.active
                );
                // 8>绑定右下顶点对应的事件
                initDotBottomLeftEvent(
                    $( this.$refs["dot8"] ),
                    $( this.$refs["dialog"] ),
                    this.active
                );
                // 绑定撤销鼠标移动事件,全弹框通用
                bindCancelMouseMove();
            },

            // 初始化事件
            initEvents() {
                /***
                 * 使用dom0级事件处理程序确保节点移除,事件自动注销
                 * 未确定问题: dom2级事件是否会随节点移除而自动移除(内存泄露)
                 */
                // 绑定键盘事件
                this.$refs["input"]
                    .onkeydown = e => {
                        // 处理esc键码,关闭弹框
                        switch(e.keyCode) {
                            case 27: this.esc ? this.closeDialog() : false;
                            break;
                            default: break;
                        };
                    };

                // 在开发人员配置了默认菜单的前提下,绑定此事件
                if (this.isHasOwnMenu) {  
                    this.$refs["dialog"]
                        .oncontextmenu = e => {
                            // 组件右键默认行为
                            e.preventDefault();
                            // 重载默认菜单组件,且计算默认菜单应该的偏移量
                            var ol = this.$refs["dialog"].offsetLeft,
                                ot = this.$refs["dialog"].offsetTop;
                            // 显示默认菜单
                            this.contextMenuPosition = [e.clientX-ol, e.clientY-ot];
                            this.isShowContextMenu = true;
                        };
                };

                // 在开发人员配置弹框支持大小缩放的前提下,绑定此事件
                if (this.scaleable) {
                    // dotsEle八个顶点 初始化缩放顶点的鼠标经过事件
                    for (let i=1,l=9; i<l; i++) {
                        // 鼠标经过显示顶点
                        this.$refs[`dot${i}`]  
                            .onmouseover = e => {
                                this.isShowDots = true;
                                // 关闭默认菜单
                                this.isShowContextMenu = false;
                            };
                    };

                    // 初始化缩放顶点对应的具体事件
                    this.initDotsEvevnt();
                };
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

        beforeDestroy() {
            // 销毁当前组件绑定的缩放相关jq事件
            if (this.scaleable) {
                destroyOwnEvents(this.$refs);
            };
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
        /*
            弹框缩放的最小尺寸在此处更改
        */
        min-width: 400px;
        min-height: 300px;
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
                background-image: url(../imgs/drag_dialog_close.png);
            }
            .close:hover {
                cursor: pointer;
                margin-top: 4px;
                margin-right: 0;
                width: 24px;
                height: 24px;
                background-image: url(../imgs/drag_dialog_close_hover.png);
            }
        }
        .content {
            width: 100%;
            height: calc(100% - 130px);
            overflow-y: auto;
            background: lightgoldenrodyellow;
            position: relative;
            
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
