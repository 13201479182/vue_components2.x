<template>
    <div id="drag-dialog-contextmenu"
         :style="styleList">
        <ul>
            <li v-if="scaleable" @click="tabIsShowDots">
                {{ isShowDots ? "隐藏缩放顶点" : "显示缩放顶点" }}
            </li>
            
            <li>
                待添加功能
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
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
            }
        },

        data() {
            return {

            };
        },

        computed: {
            styleList() {
                return {
                    left: this.position[0] + "px",
                    top: this.position[1] + "px"
                }
            }
        },

        methods: {
            // 切换缩放顶点的显隐
            tabIsShowDots() {
                this.$emit("update:isShowDots", !this.isShowDots);
            }
        }
    };
</script>

<style lang="scss" scoped>
    #drag-dialog-contextmenu {
        position: absolute;
        background: skyblue;
        ul {
            padding: 15px 10px;
            li {
                padding: 10px;
                list-style: none;
                border-bottom: 1px solid red;
            }
            li:last-child {
                border: none;
            }
            li:not(:last-child):hover {
                background: lightcoral;
                cursor: pointer;
            }
        }
    }
</style>
