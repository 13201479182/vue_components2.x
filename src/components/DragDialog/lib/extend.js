
    import Vue from "vue";
    /***
     * 拖拽弹框维护类
     * 绑定此类的实例至vue原型上,便于后续扩展
     */
    class DragDialogs {

        constructor() {
            // 存储由DragDialog组件实例的拖拽弹框
            this.dialogs = [];
            // 每个弹框依赖的index,决定弹框层级大小
            this.index = 999;   
        }

        addDialog(newDialog) {
            if (typeof newDialog==="object" && newDialog instanceof Vue) {
                this.dialogs.push(newDialog);
            };
        }

        removeDialog(newDialog) {
            if (typeof newDialog==="object" && newDialog instanceof Vue) {
                var index = this.dialogs.indexOf(newDialog);
                index>-1 ? this.dialogs.splice(index, 1) : false;
            };
        }
    }

    Vue.prototype.$dragDialogs = new DragDialogs;