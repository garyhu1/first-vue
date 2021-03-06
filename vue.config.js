const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);//检测构建环境
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: 'dist',
  // pages:{ type:Object,Default:undfind }
  assetsDir: "./",
  indexPath: "index.html",
  devServer: {
    port: 8888, // 端口号
    host: "localhost",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // proxy: {
    //   "/api": {
    //     target: "<url>",
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   "/foo": {
    //     target: "<other_url>"
    //   }
    // }
    // 配置多个代理
    proxy: {
      '/proxyApi': {
        target: 'https://www.easy-mock.com/mock/5cf62d26d415ad690a53734a',
        changeOrigin: true,
        pathRewrite: {
          '/proxyApi': ''
        }
      }
    }
  },
  configureWebpack: config => {
    if(IS_PROD){
      config.externals = { // 用于CDN加速
        // 'vue': 'Vue',
        // 'vue-router': 'VueRouter',
        // 'vuex': 'Vuex',
        // 'element-ui': 'ELEMENT',
        // 'axios': 'axios',
        // 'echarts': 'echarts',
        // 'lottie-web': 'lottie',
        // 'jsencrypt': 'JSEncrypt',
        // 'iview': 'iview'
      };
      const plugins = [];
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ];
    }
  }
};
