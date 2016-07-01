
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // the entry point to the app
      './frontend/js/core.js',

      // Grab all files in the frontend/js folder that contain .spec.
      // This configuration creates a single bundle with all testcases.
      // https://github.com/webpack/karma-webpack
      './frontend/js/tests.webpack.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // Reference: https://github.com/webpack/karma-webpack
      './frontend/js/core.js': ['webpack'],

      // Convert files with webpack and load sourcemaps
      './frontend/js/tests.webpack.js': ['webpack', 'sourcemap']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // CLI --reporters progress
    reporters: [
      'progress',
      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],


    // web server port
    // CLI --port 9876
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'//,
      //'Chrome'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    // CLI --single-run --no-single-run
    singleRun: true,

    // Optionally, configure the reporter
    // https://www.npmjs.com/package/karma-coverage
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },

    webpack: require('./webpack.config.js'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    },

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};