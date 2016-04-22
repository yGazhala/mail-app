'use strict';

// determine
//const NODE_ENV = process.env.NODE_ENV || 'development';
// Determine local version of webpack for getting plugins
//const webpack = require('webpack');

module.exports = {

    entry: __dirname + '/frontend/core',

    output: {
        path: __dirname + '/',
        filename: 'bundle.js',
        library: 'mailApp'
    },

    watch: true,

    // The project rebuilds through 100 ms after changes have been made
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'source-map',

    // Resolve setting describes how webpack searches modules.
    // We can simplify the default settings in purpose of making Webpack work more quickly
    // You can also find default settings here:
    // https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    // The same thing we are doing for loaders
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {presets: ['es2015']}
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html'
            }/*, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                exclude: /node_modules/,
                loader: 'file?name=[path][name].[ext]'
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css!autoprefixer?browsers=last 2 versions'
            }*/
        ],

        noParse: wrapRegexp(/\/node_modules\/(angular\/angular|angular-messages\/angular-messages|angular-ui-router\/release\/angular-ui-router|angularfire\/dist\/angularfire|firebase\/lib\/firebase-node)/, 'noParse')

    }
};

function wrapRegexp(regexp, label) {
    regexp.test = function(path) {
        console.log(label, path);
        return RegExp.prototype.test.call(this, path);
    };
    return regexp;
}
