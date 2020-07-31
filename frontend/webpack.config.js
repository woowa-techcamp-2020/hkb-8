const path = require('path',);
const HtmlWebpackPlugin = require('html-webpack-plugin',);
const { CleanWebpackPlugin, } = require('clean-webpack-plugin',);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    // entry: ['./src/app.js', './src/app.scss'],
    entry: {
        "app": './src/app/app.js',
        "chartApp": './src/chartApp/chartApp.js',
        "calenderApp": './src/calender/calenderApp.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name]/[name].js',
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
                    MiniCssExtractPlugin.loader,
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
            chunks: ['app'],
            template: './src/app/index.html',
            filename: './app/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['chartApp'],
            template: './src/chartApp/index.html',
            filename: './chartApp/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['calenderApp'],
            template: './src/calender/index.html',
            filename: './calender/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css',
        })
    ],
};