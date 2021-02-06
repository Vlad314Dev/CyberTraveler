const path = require('path');
const LiveReloadPlugin = require('@kooneko/livereload-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/sw/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'sw.js'
    },
    target: 'web',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '*']
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    watch: false,
    plugins: [
        new LiveReloadPlugin(),
        new ESLintPlugin({
            exclude: [
                'node_modules',
                'build'
            ],
            fix: false,
            emitError: true
        })
    ]
};
