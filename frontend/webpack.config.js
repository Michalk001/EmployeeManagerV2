const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.module\.(sa|sc|c)ss$/,
                loader: [
                    "style-loader",
                    'css-modules-typescript-loader',
                    {
                        loader:"css-loader?url=false" ,
                        options: {
                            modules: {
                                localIdentName: '[local]___[hash:base64:5]'
                            },

                        }
                    },
                    {
                        loader:"sass-loader" ,
                    }

                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module.(sa|sc|c)ss$/,

                loader: [
                    'style-loader',
                    'css-loader?url=false',
                    'css-modules-typescript-loader',
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js','.scss','.css' ],
        modules: [
            'node_modules',
            path.resolve(__dirname + '/src')
        ],
        alias: {
           [ '~']: path.resolve(__dirname + '/src')
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[local]_[name]_[hash].css',
            chunkFilename: '[local]_[id]_[hash].css',

        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, "./public/index.html")
        })
    ],
    devServer: {
        contentBase: "./public",
        hot: true,
        historyApiFallback: true,
        publicPath: '/',
        port: 8000
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    node: {
        fs: "empty"
    }
};