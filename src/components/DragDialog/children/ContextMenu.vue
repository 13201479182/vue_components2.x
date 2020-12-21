<template>
    <div id="drag-dialog-contextmenu"
         :style="styleList">
        <!-- 菜单列表对应的视图 -->
        <ul>
            <li v-for="menu in menusList"
                :key="menu.id"
                :class="menu.disabled ? 'disabled' : ''"
                @click.stop="menu.click(menu)">
                <div v-if="menu.isShow">
                    <!-- 菜单名称 -->
                    <span>{{ menu.label }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            // 是否显示当前菜单组件
            isShowContextMenu: {
                type: Boolean
            },
            // 菜单坐标
            position: {
                type: Array,
                required: true
            },
            // 是否显示顶点缩放
            isShowDots: {
                type: Boolean,
                required: true
            },
            // 弹框是否支持顶点缩放
            scaleable: {
                type: Boolean,
                default: false
            },
            // 是否显示弹出框的默认菜单
            isShowContextMenu: {
                type: Boolean,
                required: true
            }
        },

        data() {
            return {
                // 配置菜单列表,放到created中初始化,因为其依赖父组件参数
                menusList: []
            };
        },

        computed: {
            // 当前组件的动态样式列表
            styleList() {
                return {
                    left: this.position[0] + "px",
                    top: this.position[1] + "px"
                }
            }
        },

        methods: {
            // 关闭弹出框的默认菜单
            closeContextMenu() {
                this.$emit("update:isShowContextMenu", false);
            },

            // 显示缩放顶点
            showDots() {
                this.$emit("update:isShowDots", true);
            },

            // 隐藏缩放顶点
            hideDots() {
                this.$emit("update:isShowDots", false);
            },

            // 初始化菜单列表
            initMenuList() {
                // 配置菜单列表
                var menusList = [
                    {
                        id: 1,
                        label: "显示缩放顶点",
                        // 显示前提: 配置缩放大小
                        isShow: this.scaleable ? true : false,
                        // 在缩放顶点显示情况下,禁用此菜单
                        disabled: this.isShowDots ? true : false,
                        click: menu => {
                            // 在缩放顶点不显示情况下,触发此事件
                            if (!this.isShowDots) {
                                // 显示缩放顶点
                                this.showDots();
                                // 关闭弹出框
                                this.closeContextMenu();
                            };
                        }
                    },
                    {
                        id: 2,
                        label: "隐藏缩放顶点",
                        // 显示前提: 配置缩放大小
                        isShow: this.scaleable ? true : false,
                        // 在缩放顶点不显示情况下,禁用此菜单
                        disabled: this.isShowDots ? false : true,
                        click: menu => {
                            // 在缩放顶点显示情况下,触发此事件
                            if (this.isShowDots) {
                                // 隐藏缩放顶点
                                this.hideDots();
                                // 关闭弹出框
                                this.closeContextMenu();
                            };
                        }
                    },
                    // 菜单配置案例 
                    // {
                    //     id: 3,
                    //     label: "菜单样例",
                    //     isShow: true,
                    //     disabled: true,
                    //     click: menu => {}
                    // }
                ];
                // 初始化
                this.menusList = menusList;
            }
        },

        created() {
            // 初始化当前组件对应的菜单列表
            this.initMenuList();
        }
    };
</script>

<style lang="scss" scoped>
    #drag-dialog-contextmenu {
        position: absolute;
        font-size: 12px;
        color: #333;
        background: #FAFAFA;
        z-index: 100000;
        ul {
            li {
                list-style: none;
                cursor: pointer;
                >div {
                    padding: 10px 0;
                    width: 120px;
                    border: 1px;
                    border-bottom: 0;
                    border-style: solid;
                    border-color: lightgray;
                }
            }
            li:last-child {
                >div {
                    border-bottom: 1px solid lightgray;
                }
            }
            .disabled {
                color: gray;
                cursor: no-drop;
            }
        }
    }
</style>
