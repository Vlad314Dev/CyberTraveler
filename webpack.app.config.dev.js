const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('@kooneko/livereload-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { 
                        minimize: false
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    'css-loader' 
                ]
              },
              {
               test: /\.(png|svg|jpg|gif)$/,
               use: [
                   'file-loader'
                ]
              }
        ]
    },
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: './index.html'
        }),
        new LiveReloadPlugin()
    ]
};
