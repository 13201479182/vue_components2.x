
    import $ from "jquery";

    // 拖拽弹框依赖的函数库

    // 定义缩放边界最大值,不能实时设置的原因,移动过程中实时获取元素宽高会导致dom性能开销过大,页面严重卡顿
    var $document = $(document),
        maxLeft = $document.width(),
        maxTop = $document.height(),
        dots = [];
    
    /**
     * 处理缩放顶点左上位置的事件处理程序
     * @param { 组件实例 } vm 
     */
    function initDotTopLeftEvent(vm) {
        // var $el = $( vm.$refs["dot1"] ),
        //     $dialog = $( vm.$refs["dialog"] ),
        //     $document = $(document);
        // // 绑定鼠标按下事件
        // $el.on("mousedown", e => {
        //     // 阻止事件冒泡
        //     e.stopPropagation();
        //     var dx = e.clientX,
        //         dy = e.clientY,
        //         w = $dialog.width(),
        //         h = $dialog.height();
        //     // 鼠标移动时改变弹框尺寸
        //     $document.on("mousemove", e => {
        //         // 阻止事件冒泡
        //         e.stopPropagation();
        //         var oy = dy - e.clientY,
        //             ox = dx - e.clientX;
        //         // 鼠标位置不能越过最小界限
        //         if (e.clientX<0 || e.clientY<0) {
        //             return;
        //         };
        //         // 鼠标位置不能越过最大界限
        //         if (e.clientX>maxLeft || e.clientY>maxTop) {
        //             return;
        //         };
        //         // 更新容器位置
        //         $dialog.css({
        //             top: e.clientY + "px",
        //             left: e.clientX + "px"
        //         })
        //         // 更新容器大小
        //         $dialog.width(w + ox);
        //         $dialog.height(h + oy);
        //     });
        // });
        // // 绑定鼠标抬起事件
        // $document.on("mouseup", e => {
        //     // 阻止事件冒泡
        //     e.stopPropagation();
        //     // 消除鼠标移动事件
        //     $document.off("mousemove");
        // });
    };

    /**
     * 处理缩放顶点正上位置的事件处理程序
     * @param { 组件实例 } vm 
     */
    function initDotTopCenterEvent(vm) {
        // var $el = $( vm.$refs["dot2"] ),
        //     $dialog = $( vm.$refs["dialog"] ),
        //     $document = $(document);
        // // 绑定鼠标按下事件
        // $el.on("mousedown", e => {
        //     // 阻止事件冒泡
        //     e.stopPropagation();
        //     var dy = e.clientY,
        //         h = $dialog.height();
        //     // 鼠标移动时改变弹框尺寸
        //     $document.on("mousemove", e => {
        //         // 阻止事件冒泡
        //         e.stopPropagation();
        //         var oy = dy - e.clientY;
        //         // 鼠标位置不能越过最小界限
        //         if (e.clientY<0) {
        //             return;
        //         };
        //         // 鼠标位置不能越过最大界限
        //         if (e.clientY>maxTop) {
        //             return;
        //         };
        //         // 更新容器位置
        //         $dialog.css({
        //             top: e.clientY + "px"
        //         })
        //         // 更新容器高度
        //         $dialog.height(h + oy);
        //     });
        // });
        // // 绑定鼠标抬起事件
        // $document.on("mouseup", e => {
        //     // 阻止事件冒泡
        //     e.stopPropagation();
        //     // 消除鼠标移动事件
        //     $document.off("mousemove");
        // });
    };

    /**
     * 处理缩放顶点右上位置的事件处理程序
     * @param { 组件实例 } vm 
     */
    function initDotTopRightEvent(vm) {
        // 获取缩放节点 拖拽弹框 最小高度
        var $el = $( vm.$refs["dot3"] ),
            $dialog = $( vm.$refs["dialog"] ),
            minHeight = $dialog.css("min-height").slice(0, -2) - 0;
            // 存储当前顶点,便于在后续销毁其身上绑定的jq事件
            dots.push($el);
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            var dx = e.clientX,
                w = $dialog.width(),
                h = $dialog.height(),
                offset = $dialog.offset();    
            // 定位左下顶点
            var left = offset.left,
                bottom = h+offset.top;
            $dialog.css({
                left: left,
                bottom: bottom
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                var ox = dx - e.clientX;
                // 鼠标位置不能越过最小界限
                if (e.clientX>=maxLeft || e.clientY<=0) {
                    // 当缩放至右上角改变子组件,间接触发
                    vm.active();
                    return;
                };
                // 获取可以移动的最大top
                var maxTop = e.clientY+minHeight > bottom ? bottom-minHeight : e.clientY;
                // 更新容器大小
                $dialog.width(w - ox);
                $dialog.height(bottom - e.clientY);
                // 更新容器位置
                $dialog.css({
                    top: maxTop + "px",
                    right: e.clientX  + "px"
                });
            });
        });
    };

    // 这个函数用于绑定取消jq->document->mousemove事件
    function bindCancelMouseMove() {
        // 绑定鼠标抬起事件
        $document.on("mouseup", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            // 消除鼠标移动事件
            $document.off("mousemove");
        });
    };

    // 这个函数用于销毁jq在缩放功能上事件
    function destroyDotsEvents() {

    };

    export {
        // 这些函数用于顶点缩放弹框大小的工具函数
        initDotTopLeftEvent,
        initDotTopCenterEvent,
        initDotTopRightEvent,
        bindCancelMouseMove,
        destroyDotsEvents,

        // next functions
    };