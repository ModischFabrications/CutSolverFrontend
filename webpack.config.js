module.exports = {
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'raw-loader',
                // loader: 'raw-loader'
            }
        ]
    }
};
