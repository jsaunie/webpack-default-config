const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packages = require('./package.json');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        vendor: Object.keys(packages.dependencies),
        app: './src/js/app.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    resolve: {extensions: [".js", ".ts"]},
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 9000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                })
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: 'app.bundle.css'}),
        new HtmlWebpackPlugin({
            title: "Skill Mill",
            hash: true,
            filename: 'index.html', //relative to root of the application
            chunks: ['vendor', 'shared', 'app'],
            path: path.resolve(__dirname, 'dist'),
            template: './src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {from: 'src/icons', to: 'icons'}
        ]),
    ]
};
