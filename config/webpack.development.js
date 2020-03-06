const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        port: 1027,
        quiet: true,
        historyApiFallback: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:1027'],
              },
              clearConsole: true,
        })
    ]
}