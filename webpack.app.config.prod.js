const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '*'],
        alias: {
            GameAssets: path.resolve(__dirname, 'src/app/game/assets'),
            GameScene: path.resolve(__dirname, 'src/app/game/scene'),
            GameObject: path.resolve(__dirname, 'src/app/game/object'),
            UIComponent: path.resolve(__dirname, 'src/app/ui/component'),
            UIStore: path.resolve(__dirname, 'src/app/ui/store'),
            UIQuery: path.resolve(__dirname, 'src/app/ui/query'),
            UIAssets: path.resolve(__dirname, 'src/app/ui/assets'),
            GUIBridgeComponent: path.resolve(__dirname, 'src/app/gui-bridge/component'),
            GUIBridgeEmitter: path.resolve(__dirname, 'src/app/gui-bridge/emitter'),
            IOWrapper: path.resolve(__dirname, 'src/app/io/IOWrapper')
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        splitChunks: {
            minSize: 50000
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            })
        ]
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
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
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
        new StylelintPlugin(),
        new WebpackPwaManifest({
            name: 'CyberTraveler PWA',
            short_name: 'CyberTraveler',
            description: 'CyberTraveler Progressive Web Game',
            background_color: '#ffffff',
            crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            start_url: '/',
            icons: [
              {
                src: path.resolve(__dirname, 'src/public/assets/icon.png'),
                sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
              },
              {
                src: path.resolve(__dirname, 'src/public/assets/icon.png'),
                size: '1024x1024' // you can also use the specifications pattern
              },
              {
                src: path.resolve(__dirname, 'src/public/assets/icon.png'),
                size: '1024x1024',
                purpose: 'maskable'
              }
            ],
            orientation: 'landscape'
        }),
        new ProgressBarPlugin(),
        new CopyWebpackPlugin(
            {
                patterns: [
                    { from: 'src/app/game/assets', to: 'game/assets' }
                ]
            }
        )
    ]
};
