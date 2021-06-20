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

    config.output.filename('js/[name].[contenthash:8].js').end()
    config.output.chunkFilename('js/[name].[contenthash:8].js').end()
  },
  productionSourceMap: false,
}
