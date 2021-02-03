/**
 * @todo add minimization configurations
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: 'production',
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
    resolve: {
        alias: {
            Assets: path.resolve(__dirname, 'src/app/assets'),
            Emitter: path.resolve(__dirname, 'src/app/emitter'),
            Scene: path.resolve(__dirname, 'src/app/scene'),
            Component: path.resolve(__dirname, 'src/app/ui/component'),
            Store: path.resolve(__dirname, 'src/app/ui/store'),
            Query: path.resolve(__dirname, 'src/app/ui/query')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader'
                ]
              },
              {
               test: /\.(png|svg|jpg|gif)$/,
               use: ['file-loader']
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            excludeChunks: ['server.bundle']
        })
    ]
};
