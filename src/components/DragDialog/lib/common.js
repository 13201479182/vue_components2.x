
    import $ from "jquery";

    // 拖拽弹框依赖的函数库

    /**
     * 处理缩放顶点左上位置的事件处理程序 顶点:1
     * @param { 顶点 } $el 
     * @param { 弹框 } $dialog 
     * @param { 刷新拖拽指令的方法 } refreshDirective 
     */
    function initDotTopLeftEvent($el, $dialog, refreshDirective) {
        var $document = $(document);
        // 获取弹框缩放最小高度,最小宽度
        var minWidth = $dialog.css("min-width").slice(0, -2) - 0,
            minHeight = $dialog.css("min-height").slice(0, -2) - 0;
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            var w = $dialog.width(),
                h = $dialog.height(),
                offset = $dialog.offset(); 
            // 获取弹框右下顶点位置
            var right = offset.left + w,
                bottom = offset.top + h;
            // 固定右下顶点    
            $dialog.css({
                right: right,
                bottom: bottom
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 鼠标位置不能越过视窗左上角
                if (e.clientX<0 || e.clientY<0) {
                    // 当缩放至左上角改变子组件,间接触发更新拖拽指令
                    refreshDirective();
                    return;
                };
                // 获取可以移动的最大top与最大left
                var maxTop = e.clientY+minHeight > bottom ? bottom-minHeight : e.clientY,
                    maxLeft = e.clientX+minWidth > right ? right-minWidth : e.clientX;
                // 更新容器大小
                $dialog.width(right - e.clientX);
                $dialog.height(bottom - e.clientY);
                // 更新容器位置
                $dialog.css({
                    top: maxTop + "px",
                    left: maxLeft  + "px"
                });
            });
        });
    };

    /**
     * 处理缩放顶点正上位置的事件处理程序 顶点:2
     * @param { 顶点 } $el 
     * @param { 弹框 } $dialog 
     * @param { 刷新拖拽指令的方法 } refreshDirective 
     */
    function initDotTopCenterEvent($el, $dialog, refreshDirective) {
        var $document = $(document);
        // 获取缩放最小高度
        var minHeight = $dialog.css("min-height").slice(0, -2) - 0;
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            // 获取弹框距离视窗底下的偏移量
            var bottom = $dialog.offset().top + $dialog.height();
            // 固定下边距
            $dialog.css({
                bottom: bottom
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 鼠标位置不能越过视窗最上边
                if (e.clientY<0) {
                    // 当缩放至正上方改变子组件,间接触发更新拖拽指令
                    refreshDirective();
                    return;
                };
                // 获取可以移动的最大top
                var maxTop = e.clientY+minHeight > bottom ? bottom-minHeight : e.clientY;
                // 更新容器大小
                $dialog.height(bottom - e.clientY);
                // 更新容器位置
                $dialog.css({
                    top: maxTop + "px"
                });
            });
        });
    };

    /**
     * 处理缩放顶点右上位置的事件处理程序 顶点:3
     * @param { 顶点 } $el 
     * @param { 弹框 } $dialog 
     * @param { 刷新拖拽指令的方法 } refreshDirective 
     */
    function initDotTopRightEvent($el, $dialog, refreshDirective) {
        var $document = $(document),
            maxWidth = $document.width();
        // 获取缩放最小高度
        var minHeight = $dialog.css("min-height").slice(0, -2) - 0;
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            var offset = $dialog.offset();    
            // 获取按下弹框时其左下顶点的位置
            var left = offset.left,
                bottom = offset.top + $dialog.height();
            // 固定弹框左下顶点
            $dialog.css({
                left: left,
                bottom: bottom
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 鼠标位置不能越过视窗左上角
                if (e.clientX>maxWidth || e.clientY<0) {
                    // 当缩放至右上角改变子组件,间接触发更新拖拽指令
                    refreshDirective();
                    return;
                };
                // 获取可以移动的最大top
                var maxTop = e.clientY+minHeight > bottom ? bottom-minHeight : e.clientY;
                // 更新容器大小
                $dialog.width(e.clientX - left);
                $dialog.height(bottom - e.clientY);
                // 更新容器位置
                $dialog.css({
                    top: maxTop + "px",
                    right: e.clientX  + "px"
                });
            });
        });
    };

    /**
     * 处理缩放顶点右中位置的事件处理程序 顶点:4
     * @param { 顶点 } $el 
     * @param { 弹框 } $dialog 
     * @param { 刷新拖拽指令的方法 } refreshDirective 
     */
    function initDotLeftCenterEvent($el, $dialog, refreshDirective) {
        var $document = $(document);
        // 获取缩放最小高度
        var minWidth = $dialog.css("min-width").slice(0, -2) - 0;
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation(); 
            // 获取按下弹框时其距离视窗右边的偏移量
            var right = $dialog.offset().left + $dialog.width();
            // 固定右边距
            $dialog.css({
                right: right
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 鼠标位置不能越过视窗最左边
                if (e.clientX<0) {
                    // 当缩放至右上角改变子组件,间接触发更新拖拽指令
                    refreshDirective();
                    return;
                };
                // 获取可以移动的最大left
                var maxLeft = e.clientX+minWidth > right ? right-minWidth : e.clientX;
                // 更新容器宽度
                $dialog.width(right - e.clientX);
                // 更新容器位置
                $dialog.css({
                    left: maxLeft  + "px"
                });
            });
        });
    };

    /**
     * 处理缩放顶点右中位置的事件处理程序 顶点:5
     * @param { 顶点 } $el 
     * @param { 弹框 } $dialog 
     * @param { 刷新拖拽指令的方法 } refreshDirective 
     */
    function initDotRightCenterEvent($el, $dialog, refreshDirective) {
        var $document = $(document),
            maxWidth = $document.width();
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            // 获取按下弹框时其距离视窗左边的偏移量
            var left = $dialog.offset().left;
            // 固定左边距
            $dialog.css({
                left: left
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 鼠标位置不能越过视窗最右边
                if (e.clientX>maxWidth) {
                    // 当缩放至右上角改变子组件,间接触发更新拖拽指令
                    refreshDirective();
                    return;
                };
                // 更新容器宽度
                $dialog.width(e.clientX - left);
                // 更新容器位置
                $dialog.css({
                    right: e.clientX  + "px"
                });
            });
        });
    };

    /**
     * 处理缩放顶点左下位置的事件处理程序 顶点:6
     * @param { 顶点 } $el 
     * @param { 弹框 } $dialog 
     * @param { 刷新拖拽指令的方法 } refreshDirective 
     */
    function initDotLeftBottomEvent($el, $dialog, refreshDirective) {
        var $document = $(document),
            maxHeight = $document.height();
        // 获取最小高度
        var minWidth = $dialog.css("min-width").slice(0, -2) - 0;
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            var offset = $dialog.offset(); 
            // 获取按下弹框时其距离视窗上边和右边的偏移量
            var top = offset.top,
                right = offset.left + $dialog.width();
            // 固定右上顶点
            $dialog.css({
                top: top,
                right: right
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 鼠标位置不能越过视窗左下角位置
                if (e.clientX<0 || e.clientY>maxHeight) {
                    // 当缩放至左下上角改变子组件,间接触发更新指令
                    refreshDirective();
                    return;
                };
                // 获取可以移动的最大左边距
                var maxLeft = e.clientX+minWidth > right ? right-minWidth : e.clientX;
                // 更新容器大小
                $dialog.width(right - e.clientX);
                $dialog.height(e.clientY - top);
                // 更新容器位置
                $dialog.css({
                    bottom: e.clientY,
                    left: maxLeft  + "px"
                });
            });
        });
    };

    /**
     * 处理缩放顶点下中位置的事件处理程序 顶点:7
     * @param { 顶点 } $el 
     * @param { 弹框 } $dialog 
     * @param { 刷新拖拽指令的方法 } refreshDirective 
     */
    function initDotCenterBottomEvent($el, $dialog, refreshDirective) {
        var $document = $(document),
            maxHeight = $document.height();
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            // 获取按下弹框时其距离视窗上边偏移量
            var top = $dialog.offset().top;
            // 固定上边距
            $dialog.css({
                top: top
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 鼠标位置不能越过视窗最下边
                if (e.clientY>maxHeight) {
                    // 当缩放至右上角改变子组件,间接触发更新指令
                    refreshDirective();
                    return;
                };
                // 更新容器高度
                $dialog.height(e.clientY - top);
                // 更新容器位置
                $dialog.css({
                    bottom: e.clientY + "px",
                });
            });
        });
    };

    /**
     * 处理缩放顶点右下角位置的事件处理程序 顶点:8
     * @param { 顶点 } $el 
     * @param { 弹框 } $dialog 
     * @param { 刷新拖拽指令的方法 } refreshDirective 
     */
    function initDotBottomLeftEvent($el, $dialog, refreshDirective) {
        var $document = $(document),
            maxWidth = $document.width(),
            maxHeight = $document.height();
        // 绑定鼠标按下事件
        $el.on("mousedown", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            // 获取按下弹框时其距离视窗左边偏移量
            var left = $dialog.offset().left,
                top = $dialog.offset().top;
            // 固定左上顶点
            $dialog.css({
                left: left,
                top: top
            });
            // 鼠标移动时改变弹框尺寸
            $document.on("mousemove", e => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 鼠标位置不能越过视窗右下角
                if (e.clientX>maxWidth || e.clientY>maxHeight) {
                    // 当缩放至右上角改变子组件,间接触发更新指令
                    refreshDirective();
                    return;
                };
                // 更新容器宽高
                $dialog.width(e.clientX - left);
                $dialog.height(e.clientY - top);
                // 更新容器位置
                $dialog.css({
                    right: e.clientX + "px",
                    bottom: e.clientY  + "px"
                });
            });
        });
    };

    // 这个函数用于绑定取消jq->document->mousemove事件
    function bindCancelMouseMove() {
        var $document = $(document);
        // 绑定鼠标抬起事件
        $document.on("mouseup", e => {
            // 阻止事件冒泡
            e.stopPropagation();
            // 消除鼠标移动事件
            $document.off("mousemove");
        });
    };

    /**
     * 这个函数用于销毁缩放弹框上存在的jq事件
     * dom0级事件会随着dom节点移除被gc回收
     * @param { 组件实例 } vm 
     */
    function destroyOwnEvents(eles) {
        for (let i=1,l=9; i<l; i++) {
            // 消除当前组件8个顶点具有的全部事件
            $( eles[`dot${i}`] ).off();
        };
    };

    export {
        // 这些函数用于顶点缩放弹框大小的工具函数
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

        // next functions
    };