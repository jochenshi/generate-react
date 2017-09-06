 const path = require('path')
//const webpack = require('webpack')

var APP_DIR = path.resolve(__dirname, '../src')

const config = {
    entry: APP_DIR+ '/index.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre",
                exclude: /node_modules/,
                include: [APP_DIR]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            }
        ]
    }
}

module.exports = config