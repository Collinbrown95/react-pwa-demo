// Webpack 5
module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    'path': require.resolve('path-browserify'),
                    'fs': false
                },
                extensions: ['.jsx', '.js', '.tsx', '.ts'],
            },
            // See https://github.com/webpack/webpack/issues/6725
            module: {
                rules: [
                    {
                        test: /\.wasm$/,
                        type: 'javascript/auto',
                        use: [
                            { loader: 'file-loader' }
                        ]
                    },
                ]
            },

        }
    },
};