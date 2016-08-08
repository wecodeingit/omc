'use strict';


var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var autoprefixer = require('autoprefixer');

var PORT = 9000;

module.exports = {
    entry: __dirname + "/app/",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            'jquery': __dirname + '/bower_components/jquery/dist/jquery.js',
            'handlebars': __dirname + '/bower_components/handlebars/handlebars.js',
            'bootstrap': __dirname + '/bower_components/bootstrap/dist',
            'THREE': __dirname + '/bower_components/three.js/build/three.js'
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
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
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
                loader: "css-loader?sourceMap!postcss-loader"
            })
        }, {
            test: /\.(png|jpg)$/,
            loader: "file-loader"
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.html$/,
            loader: "html"
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
            onBuildEnd: ['node launch_app ' + PORT]
        })
    ]
};
