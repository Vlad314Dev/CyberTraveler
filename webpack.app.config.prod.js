/**
 * @todo add minimization configurations
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/public/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'app.js'
    },
    target: 'web',
    devtool: 'source-map',
    resolve: {
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-')
            }
        }),
        new HtmlWebpackPlugin({
            title: 'CyberTraveler PWA Game',
            template: './src/public/index.html',
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
        new StylelintPlugin()
    ]
};
