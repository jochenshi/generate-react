const path = require('path')
const webpack = require('webpack')

const config = {
    entry: '../src/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        rule: [
            {
                test: ''
            }
        ]
    }
}

module.exports = config