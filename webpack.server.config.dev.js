const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './server/express.dev.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.bundle.js',
        publicPath: '/'
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        // if you don't put this is, __dirname and __filename return blank or /
        __dirname: false,   
        __filename: false
    },
    externals: [
        // Need this when working with express, otherwise the build fails
        nodeExternals()
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            excludeChunks: ['app']
        }),
        new NodemonPlugin({
            ignore: [
                '**/node_modules/',
                '*.js.map'
            ]
        })
    ],
    watch: true
};