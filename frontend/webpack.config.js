const path = require('path',);
const HtmlWebpackPlugin = require('html-webpack-plugin',);
const { CleanWebpackPlugin, } = require('clean-webpack-plugin',);


module.exports = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: {
        main: './src/app.js',
    }, output: {
        path: path.resolve('./dist',),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                    limit: 20000,
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        },),
        new CleanWebpackPlugin(),
    ],
};