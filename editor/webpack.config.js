var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        // remove duplicated plugins
        new webpack.optimize.DedupePlugin()
    ]
};
