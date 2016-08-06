'use strict';

var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var PORT = 3000;

module.exports = {
    entry: "./js/main.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            'jquery': __dirname + '/bower_components/jquery/dist/jquery.js'
        }
    },
    devServer: {
        port: PORT
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader"
            })
        }, {
            test: /\.png$/,
            loader: "file-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: 'favicon.ico',
            template: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: "style.css",
            allChunks: true
        }),
        new LiveReloadPlugin({ appendScriptTag: true }),
        new OpenBrowserPlugin({ url: 'http://localhost:' + PORT })
    ]
};
