module.exports = {
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  productionSourceMap: false,
  devServer: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
      },
    },
  },
};
