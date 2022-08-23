const path = require('path')

const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'Monitor.js',
        library: 'Monitor',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '...']
    },
    devServer: {
        port: 4000,
        static: {
            directory: path.join(__dirname, '../')
        },
        hot: true,
        open: true,
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
