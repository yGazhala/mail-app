'use strict';

let ExtractTextPlugin = require("extract-text-webpack-plugin");
//let path = require('path');

module.exports = {
    context: __dirname + '/frontend', // здесь прикол

    entry: {
        bundle: './js/core.js',
        styles: './styles/core.scss'
    },

    output: {
        path: __dirname + '/',
        //path: path.resolve(__dirname, "/"),
        filename: '[name].js',
        //publicPath: '/assets/',
        library: '[name]'
    },

    watch: true,

    // The project rebuilds through 100 ms after changes have been made
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'source-map',

    // Resolve setting describes how Webpack resolves modules.
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
                include: /frontend/,
                loader: 'babel',
                query: {presets: ['es2015']}
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html'
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                exclude: /node_modules/,
                loader: 'file?name=[path][name].[ext]'
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('css!resolve-url!sass?sourceMap')
            }
        ],

        // Loaders must not parse next libraries and frameworks
        noParse: wrapRegexp(/\/node_modules\/(angular\/angular|angular-messages\/angular-messages|angular-ui-router\/release\/angular-ui-router|angularfire\/dist\/angularfire|firebase\/lib\/firebase-node)/, 'noParse')
    },

    plugins: [
        new ExtractTextPlugin('styles.css', {allChunks: true})
    ]
};

// This helper function writes into console, which files have not been parsing
function wrapRegexp(regexp, label) {
    regexp.test = function(path) {
        console.log(label, path);
        return RegExp.prototype.test.call(this, path);
    };
    return regexp;
}
