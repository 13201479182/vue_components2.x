<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: "App"
};
</script>

<style lang="scss">
    #app {
        position: absolute; 
        top: 0;
        left: 0;    
        width: 100%;
        height: 100%;
    }
    .clear::after {
        content: "";
        display: block;
        clear: both;
    }
    // 三角形
    .triangle {
        border: 10px solid;
        border-color: red transparent transparent transparent;
    }
</style>

<style lang="scss">
    /*定义滚动条高宽*/  
    ::-webkit-scrollbar {  
        width: 5px;
        height: 5px;
    }  
    /*定义滚动条轨道 内阴影+背景色*/  
    ::-webkit-scrollbar-track {  
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .2);  
        background-color: #fff;  
    }    
    /*定义滑块 内阴影+圆角+背景色*/  
    ::-webkit-scrollbar-thumb {  
        border-radius: 10px;  
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);    
    }  
    /*滑块效果*/
    ::-webkit-scrollbar-thumb:hover {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.4);
    }
</style>
