'use strict';
// This file is an entry point for angular tests
// https://github.com/webpack/karma-webpack

require ('angular-mocks/angular-mocks');

// Require all modules ending in ".spec" from the
// current directory and all subdirectories
// Every test file is required using the require.context
// and compiled with webpack into one test bundle.

var testsContext = require.context(".", true, /.spec$/);
testsContext.keys().forEach(testsContext);
