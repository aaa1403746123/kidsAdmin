const path = require('path')
module.exports = {
// publicPath:process.env.NODE_ENV === 'production' ? '/vue_workspac/aihuhuproject/' : '/',

//基本路径
publicPath: './',//默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
// 输出文件目录
outputDir: 'dist',
assetsDir:'static',
indexPath:'index.html',
// eslint-loader 是否在保存的时候检查
lintOnSave: true,
// 生产环境是否生成 sourceMap 文件
productionSourceMap: false,
// css相关配置
css: {
// 是否使用css分离插件 ExtractTextPlugin
extract: true,
// 开启 CSS source maps?
sourceMap: false,
},
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/devapi': {
                target: 'http://127.0.0.1:3000/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/devapi': ''
                }
            }
        },
        before: app => { }
    }
}
