'use strict';

let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        bundle: './js/core.js',
        styles: './styles/core.scss'
    },

    output: {
        path: __dirname + '/',
        filename: '[name].js',
        library: 'mailApp'
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
                include: /frontend/,
                loader: 'html'
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                include: /frontend/,
                loader: 'file?name=[path][name].[ext]'
            }, {
                test: /\.scss$/,
                include: /frontend/,
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
