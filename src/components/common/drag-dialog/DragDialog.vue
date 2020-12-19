<template>
    <transition name="drag-dialog">
        <div class="global-drag-dialog" 
             :style="{zIndex: index}"
             v-show="visible" 
             ref="dialog"
             @click="active"
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
        </div>
    </transition>
</template>

<script>
    import directive from './directive';

    export default {
        name: "DragDialog",

        mixins: [directive],

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
            scale: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                index: null           
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

            // 当前组件点击时处于激活状态
            active() {
                // 层级置上
                this.index = this.$dragDialogs.index++;
                // 下一次dispatch时自动聚焦
                this.$nextTick(() => {
                    this.$refs.input.focus();
                });
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
        z-index: 9999;
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
