let path = require('path')
function resolve(str) {
    return path.resolve(__dirname, 'src', str)
}
module.exports = {
    devServer: {
        port: 99,
        proxy: {
            //   /api/user/test  => http://192.168.1.222:8888/user/test
            '/api': {
                target: 'http://192.168.1.222:8888/',
                pathRewrite: {
                    '^/api': '', // rewrite path
                },
                // target: 'http://www.example.org', // target host
                // changeOrigin: true, // needed for virtual hosted sites
                // ws: true, // proxy websockets
                // pathRewrite: {
                //     '^/api/old-path': '/api/new-path', // rewrite path
                //     '^/api/remove/path': '/path', // remove base path
                // },
                // router: {
                //     // when request.headers.host == 'dev.localhost:3000',
                //     // override target 'http://www.example.org' to 'http://localhost:8000'
                //     'dev.localhost:3000': 'http://localhost:8000',
                // },
            },
            '/foo': {
                target: 'http://1.3.4.6:8899'
            }
        }

    },
    lintOnSave: false,//关闭lint验证
    productionSourceMap: false, //不产生map文件
    publicPath: "/", //当项目放在网站子目录时，需配置成子目录名称
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.bmp$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 4,
                            name: "img/[name].[ext]"
                        }
                    }
                },
            ]
        },
        // resolve: {
        //     alias: {
        //         '~c': __dirname + '/src/components',
        //         '~v': __dirname + '/src/views',
        //     }
        // }
    },
    chainWebpack: config => {
        //告诉webpack处理bmp文件时采用url-loader加载
        // config.module
        //     .rule('image')
        //     .test(/\.bmp$/)
        //     .use('url-loader')
        //     .loader('url-loader')
        //     .tap(options => {
        //         return options
        //     }).end()
        //限制图片大小
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 1024 * 10 }))
        // .tap(options => {
        //     options.limit = 1024 * 10
        //     return options
        // })
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Simba APP'
                return args
            })
        //配置路径别名
        config.resolve.alias
            .set('~c', resolve('components'))
            .set('~v', resolve('views'))
            .set('~u', resolve('utils'))
            .set('@a', resolve('assets'))
    }
}