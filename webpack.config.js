'use strict';

var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

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
    debug: true,
    devtool: 'source-map',
    jshint: {
        emitErrors: true,
        failOnHint: true
    },
    module: {
        preLoaders: [{
            test: /\.js$/, // include .js files
            exclude: [/node_modules/, /bower_components/], // exclude any and all files in the node_modules folder
            loader: "jshint-loader"
        }],
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
        function() {
            this.plugin("done", function(stats) {
                if (stats.compilation.errors && stats.compilation.errors.length) {
                    console.log("---------------------------------------------------");
                    console.log("ERRORS");
                    console.log("---------------------------------------------------");
                    stats.compilation.errors.map(function(item) {
                        console.log(item.message);
                    });
                    console.log("---------------------------------------------------");
                    process.exit(1);
                }
            });
        },
        new HtmlWebpackPlugin({
            favicon: 'favicon.ico',
            template: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: "style.css",
            allChunks: true
        }),
        new WebpackShellPlugin({
            onBuildStart: ['echo "Bundling Started"'],
            onBuildEnd: ['node launch_app']
        }),
        new LiveReloadPlugin({ appendScriptTag: true })
    ]
};
