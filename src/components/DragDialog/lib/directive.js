
    import $ from "jquery";

    export default {
        directives: {
            // 拖拽弹框依赖的拖拽指令
            drag: {
                // 指令所在组件的VNode及其子VNode全部更新后调用 
                update: (el, args, vnode) => {
                    /**
                     * $el                  当前指令插入的对象
                     * $moveTarget          移动目标对象
                     * $document            文档对象
                     * maxWidth             移动元素可移动的最大宽度
                     * maxHeight            移动元素可移动的最大高度
                     * ox                   为鼠标相对弹框的x偏移量
                     * oy                   为鼠标相对弹框的y偏移量
                     * reallyTop            拖拽元素实际该处于的的top   
                     * reallyLeft           拖拽元素实际该处于的的left 
                     * 
                     * 注意点: 这块采用dom0级事件处理程序
                     *  目的1: update会复用节点,不是移除节点,dom0级时重复赋值的过程
                     *  目的2: 使得拖拽与缩放之间的事件不会冲突,缩放采用jq事件
                     */
                    var $el = null,
                        $moveTarget = null,
                        $document = null,
                        maxWidth = 0,
                        maxHeight = 0,
                        ox = 0,
                        oy = 0,
                        reallyTop = 0,
                        reallyLeft = 0;
    
                    if (args.value) {
                        // 获取虚拟节点中存在的当前组件实例
                        var vm = vnode.context;
                        // 节点赋值
                        $el = $(el);
                        $document = $(document);
                        $(el)[0].className==="header" ? $moveTarget=$(el).parent() : $moveTarget=$(el);
                        // 获取边界为位置
                        maxWidth = $document.width() - $moveTarget.width();
                        maxHeight = $document.height() - $moveTarget.height();
                       
                        // 绑定拖拽事件
                        $el[0].onmousedown = e => {
                            // 阻止事件冒泡
                            e.stopPropagation();
                            // 层级置顶
                            vnode.context.index = vm.$dragDialogs.index++;
                            // 拖拽鼠标图标设置
                            $el.css({
                                cursor: "move"
                            });
                            // 计算鼠标相对弹框的实际偏移量
                            ox = e.clientX - $el.offset().left;
                            oy = e.clientY - $el.offset().top;
                            
                            // 绑定鼠标移动事件
                            $document[0].onmousemove = e => {
                                // 阻止事件冒泡
                                e.stopPropagation();
                                // 获取移动时的坐标,
                                let mx = e.clientX,
                                    my = e.clientY;
                                // 生成移动元素具体的移动位置,对其进行边界控制
                                if (vm.dragPosIsOverDoc) {
                                    reallyTop = my - oy;
                                    reallyLeft = mx - ox;
                                }else {
                                    reallyTop = my-oy<0 ? 0 : my-oy>maxHeight ? maxHeight : my-oy;
                                    reallyLeft = mx-ox<0 ? 0 : mx-ox>maxWidth ? maxWidth : mx-ox;
                                };
                                // 设置移动目标对象位置
                                $moveTarget.css({
                                    top: reallyTop,
                                    left: reallyLeft
                                });
                            };

                            // 移除鼠标移动事件
                            $document[0].onmouseup = e => {
                                // 阻止事件冒泡
                                e.stopPropagation();
                                $document[0].onmousemove = null;
                                $el.css({
                                    cursor: "default"
                                });
                            };
                        };
                    }
                }
            }

            // next directive position
        }
    }