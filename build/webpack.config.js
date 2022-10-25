const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'Monitor.js',
        library: 'Monitor',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist']
        }),
        new HTMLWebpackPlugin({
            title: '测试模板',
            template: './test/index.html',
            // 去掉默认值defer
            scriptLoading: 'blocking'
        })
    ],
    devServer: {
        host: 'localhost',
        port: 4000,
        static: {
            directory: path.join(__dirname, '../dist')
        },
        client: {
            logging: 'info',
            overlay: true,
            progress: true
        },
        proxy: {
            '/app': {
                target: 'http://localhost:6006',
                changeOrigin: true
            }
        }
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
}

module.exports = config
