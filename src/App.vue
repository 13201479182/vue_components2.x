<template>
    <div id="app">
        <!-- 拖拽组件使用案例 -->
        <DragDialog/>
        
        <!-- next component -->
    </div>
</template>

<script>
import DragDialog from "./example/1_dragdialog";

export default {
    name: "App",
    components: {
        DragDialog
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
