module.exports = {
    "devServer": {
        //自动打开浏览器
        "port": 3000,
        "open": true
    },
    // 项目中的所有资源指定一个基础路径
    publicPath: './',
    chainWebpack: config => {
        config.set('externals', {
            //key是自己import时来自的名字，value是官方库导出的名字
            vue: 'Vue',
            lodash: '_',
            // 'element-ui': 'ELEMENT'
        })
    },
    productionSourceMap: false
}