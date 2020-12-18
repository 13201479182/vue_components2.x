
    module.exports = {
        // 调整打包后静态资源路径问题
        publicPath: '',

        chainWebpack: config => {
            // 配置标题
            config.plugin('html').tap(args => {
                args[0].title = "vue2.x通用组件";
                return args;
            });
        }
    };