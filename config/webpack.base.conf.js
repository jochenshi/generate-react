const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
    return path.resolve()
}

const APP_DIR = path.resolve(__dirname, '../src')

const config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                exclude: /node_modules/,
                include: [APP_DIR]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: [APP_DIR],
                options: {
                    presets: ['react']
                }
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                include: [APP_DIR],
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?-autoprefixer', 'stylus-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
}

module.exports = config