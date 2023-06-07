const path = require('path')

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/bamboo-website/'
  //   : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({ extract: false }).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({ ...options, plugins: [{ removeAttrs: { attrs: 'fill' } }] })).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{ plainSprite: true }])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  },
  configureWebpack: {},
  devServer: {
    public: 'http://192.168.0.108:8080',
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#767676',
            'link-color': '#333',
            'border-radius-base': '4px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
}