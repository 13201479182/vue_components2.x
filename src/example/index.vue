<template>
    <div>
        <!-- 组件列表用于切换二级路由 -->
        <ul class="example-list">
            <li v-for="nav in navs"
                :key="nav.id"
                :class="nav.active ? 'active' : 'deactive'"
                @click="nav.click(nav)">
                {{ nav.name }}
            </li>
        </ul>

        <!-- 组件示例对应的二级路由 -->
        <div class="example-view-box">
            <div class="example-view">
                <router-view class="example-view-content"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navs: [
                    {   
                        id: 1,
                        name: "拖拽弹框组件",
                        path: "/drag-dialog-example",
                        active: false,
                        click: this.navClick
                    },
                    // demo
                    // {   
                    //     id: 2,
                    //     name: "",
                    //     path: "",
                    //     active: false,
                    //     click: this.navClick
                    // }
                ]
            };
        },

        methods: {
            navClick(nav) {
                // 重置所有组件激活状态
                this.navs.forEach(nav => {
                    nav.active = false;
                });
                // 切换激活
                nav.active = true;
                // 路由切换
                if (this.$route.path !== nav.path) {
                    this.$router.push(nav.path);
                };
            },

            initNav(index) {
                this.navClick(
                    this.navs[index]
                );
            }
        },

        created() {
            // 初始化导航菜单依据索引
            this.initNav(0);
        }
    };
</script>

<style lang="scss" scoped>
    .example-list {
        padding: 0 70px;
        width: 100%;
        height: 80px;
        line-height: 80px;
        box-sizing: border-box;
        font-size: 24px;
        font-family: cursive;
        font-weight: bold;
        background: rgb(149, 248, 248);
        >li {
            width: 12.5%;
            display: inline-block;
        }
        >li:hover {
            color: red;
            cursor: pointer;
        }
        .active {
            color: red;
        }
        .deactive {
            color: #06f8f8;
        }
    }
    .example-view-box {
        position: absolute;
        width: 100%;
        height: calc(100% - 80px);
        background: rgb(205, 250, 250);
        .example-view {
            position: absolute;
            top: 70px;
            left: 70px;
            padding: 30px;
            box-sizing: border-box;
            width: calc(100% - 140px);
            height: calc(100% - 140px);
            background: #fff;
            .example-view-content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }
</style>
