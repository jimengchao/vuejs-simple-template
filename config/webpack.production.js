
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const os = require('os');

module.exports = {
    mode: 'production',
    output: {
        filename:"srcipts/[name].bunlde.[hash:5].js",
        chunkFilename: 'srcipts/[name].[contenthash:5].js'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
            })
        ],
        splitChunks:{
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            cacheGroups: {
                commos: {
                    chunks: 'initial',
                    name: 'common',
                }
            }
        },
        runtimeChunk:{
            name: 'runtime'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ManifestPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style/[name][hash:5].css',
            chunkFilename: 'style/[name].[contenthash:5].css',
            ignoreOrder: false
        }),
        new WebpackBuildNotifierPlugin({
            title: "Project Build",
            suppressSuccess: true
        }),
        new WebpackParallelUglifyPlugin({
            workerCount: os.cpus().length,
            exclude: /node_modules/,
            uglifyJS: {
                output: {
                    beautify: false,
                    comments: false
                },
                compress: {
                    drop_console: true,
                    collapse_vars: false,
                }
            },
        })
    ]
}