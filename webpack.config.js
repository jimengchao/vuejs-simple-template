const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development'
const _isDev = _mode === 'development'
const webpackConfig = require(`./config/webpack.${_mode}.js`);
const { resolve } = require('path');
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const setTitle = require('node-bash-title');
setTitle('Vue');

const baseWebpackConfig = {
    entry: './src/index.js',
    resolve: {
        alias: {
            "@": resolve("src"),
            "@pages": resolve("src/pages"),
            "@components": resolve("src/components"),
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    formatter: require('eslint-friendly-formatter'),
                }
            },
            {
                test:/\.js$/,
                use: 'babel-loader', 
                exclude: /node_modules/,
                include: /src/

            },
            {
                test: /\.vue$/,
                use:'vue-loader',
                exclude: /node_modules/,
                include: /src/
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                exclude: /node_modules/,
                include: /src/,
                use: [
                    _isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: 'assets/[name].[hash:5].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins:[
        new VueLoaderPlugin(),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('./src/index.html'),
        })
    ]
}

module.exports = smp.wrap(webpackMerge(baseWebpackConfig, webpackConfig))