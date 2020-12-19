
    import Vue from "vue";
    // 引入组件依赖的样式表
    import "../assets/scss/style.scss";

    // 拖拽弹框组件的引入
    import "./DragDialog/lib/extend.js";
    import DragDialog from "./DragDialog/index.vue";

    // 将引入的组件放入组件数组中
    const components = [
        DragDialog
    ];

    // 全局注册组件
    components.forEach(component => {
        Vue.component(component.name, component);
    });


    