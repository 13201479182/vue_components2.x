
    import Vue from "vue";
    // 引入组件依赖的样式表
    import "../../assets/css/style.scss";

    // 引入组件且塞入components数组中
    import "./drag-dialog/global.js";
    import DragDialog from "./drag-dialog/DragDialog.vue";

    const components = [
        DragDialog
    ];

    // 全局注册组件
    components.forEach(component => {
        Vue.component(component.name, component);
    });


    