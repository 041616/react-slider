module.exports = {
    entry: {
        'index': './src/react-slider.js'
    },
    output: {
        path: './dist/',
        filename: "[name].js",
        libraryTarget: 'umd',
        library: 'reactSlider',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ],
    }
};
