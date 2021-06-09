module.exports = {
  devServer: {
    port: 3000,
    open: true,
  },
  publicPath: './',
  chainWebpack: config => {
    config.set('externals', {
      vue: 'Vue',
      lodash: '_',
    })
  },
  productionSourceMap: false,
}
