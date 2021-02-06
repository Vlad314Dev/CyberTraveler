const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('@kooneko/livereload-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

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
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '*'],
        alias: {
            GameAssets: path.resolve(__dirname, 'src/app/game/assets'),
            GameScene: path.resolve(__dirname, 'src/app/game/scene'),
            UIComponent: path.resolve(__dirname, 'src/app/ui/component'),
            UIStore: path.resolve(__dirname, 'src/app/ui/store'),
            UIQuery: path.resolve(__dirname, 'src/app/ui/query'),
            UIAssets: path.resolve(__dirname, 'src/app/ui/assets'),
            GUIBridgeComponent: path.resolve(__dirname, 'src/app/gui-bridge/component'),
            GUIBridgeEmitter: path.resolve(__dirname, 'src/app/gui-bridge/emitter')
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
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-')
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new ESLintPlugin({
            exclude: [
                'node_modules',
                'build'
            ],
            fix: false,
            emitError: true
        }),
        new StylelintPlugin(),
        new LiveReloadPlugin()
    ]
};
