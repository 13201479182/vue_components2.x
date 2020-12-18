
    import Vue from "vue";
    /***
     * 多拖拽弹框维护函数
     */
    // 待维护的弹框队列
    const dragDialogs = [];

    class Defend {

        constructor() {
            // 每个弹框依赖的index,决定弹框层级大小
            this.index = 999;   
        }

        getDragDialogs() {
            // 提供只读数组,防止被篡改
            return dragDialogs.concat([]);
        }

        addDragDialog(newDialog) {
            if (typeof newDialog==="object" && newDialog instanceof Vue) {
                dragDialogs.push(newDialog);
            };
        }

        removeDragDialog(newDialog) {
            if (typeof newDialog==="object" && newDialog instanceof Vue) {
                var index = dragDialogs.indexOf(newDialog);
                index>-1 ? dragDialogs.splice(index, 1) : false;
            };
        }
    }

    const defend = new Defend;

    export default defend;