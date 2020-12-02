const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const IS_DEV = ['development', 'dev'].includes(process.env.NODE_ENV)
// 设置端口号
const port = process.env.port || process.env.npm_config_port || 8080 // dev port
function resolve(dir) {
    return path.join(__dirname, dir)
}
let proxyAddr = process.env.VUE_APP_INTERFACE_URL || '/' // 代理地址
const proxyPere = [] // 需要代理的地址
// 代理配置函数
function proxyFn() {
    return proxyPere.reduce((t, v) => (t[v] = {
        target: proxyAddr,
        ws: true,
        changeOrigin: true
    // eslint-disable-next-line no-sequences
    }, t), {})
}
function devServerConfig(port) {
    const obj = {
        port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        }
    }
    if (IS_DEV && proxyPere.length) { // development环境
        obj.proxy = proxyFn()
    }
    return obj
}
console.log(devServerConfig(port))
module.exports = {
    // 文件名哈希
    filenameHashing: true,
    //  基本路径
    publicPath: '/',
    //  构建时的输出目录
    outputDir: 'dist',
    lintOnSave: IS_DEV,
    productionSourceMap: false, // 是否为生产环境构建生成 source map？
    devServer: devServerConfig(port),
    css: {
        extract: { ignoreOrder: true } // 忽略顺序检查
    },
    configureWebpack: (config) => {
        if (!IS_DEV) {
            return {
                output: {
                    // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
                    filename: `static/js/[name].js`,
                    chunkFilename: `static/js/[name].js`
                },
                optimization: {
                    minimizer: [
                        new TerserPlugin({
                            sourceMap: false,
                            terserOptions: {
                                compress: {
                                    drop_console: false
                                }
                            }
                        })
                    ]
                }
            }
        }
    },
    chainWebpack(config) {
        //  声明别名
        config.resolve.alias.set('@', resolve('src'))
        // 修复HMR
        config.resolve.symlinks(true)
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件，避免加载多余的资源
        config.plugins.delete('preload')
        config.when(IS_DEV, config => config.devtool('cheap-source-map'))
        config.when(!IS_DEV, () => { // 生产执行
            config.optimization.splitChunks({
                cacheGroups: {
                    vendors: {
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 50,
                        reuseExistingChunk: true
                    },
                    elementUI: {
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                        name: 'elementUI',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 90,
                        reuseExistingChunk: true
                    },
                    components: {
                        chunks: 'all',
                        test: /[\\/]src[\\/]components[\\/]/,
                        name: 'componentsComp',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100, // 缓存组打包的先后优先级，数值大的优先
                        reuseExistingChunk: true // 如果当前的 chunk 已被从 split 出来，那么将会直接复用这个 chunk 而不是重新创建一个
                    }
                }
            })
        })
    }
}
