
    
    import Vue from "vue";
    import VueRouter from "vue-router";
    
    Vue.use(VueRouter);

    const routes = [
        {
            name: "Root",
            path: "/",
            meta: "根路由",
            component: () => import("@/example/index.vue"),
            children: [
                {
                    name: "DragDialog",
                    path: "/drag-dialog-example",
                    meta: "拖拽弹框示例",
                    component: () => import("@/example/DragDialogExample.vue")
                }
            ]
        },
        {
            path: "*",
            redirect: "/"
        }
    ]

    var router = new VueRouter({
        routes
    });

    export default router;