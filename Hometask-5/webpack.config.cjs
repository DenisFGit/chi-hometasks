const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        mode: isDev ? 'development' : 'production',
        devtool: isDev ? 'eval-source-map' : 'source-map',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDev
                ? 'bundle.js'
                : 'bundle.[contenthash].js',
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },

                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },

                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                },

                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },

        plugins: [

            new HtmlWebpackPlugin({
                template: './src/index.html',
                minify: !isDev,
            }),

            !isDev &&
            new MiniCssExtractPlugin({
                filename: 'styles.[contenthash].css',
            }),

        ].filter(Boolean),

        optimization: {
            minimize: !isDev,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
        },

        devServer: {
            static: path.resolve(__dirname, 'dist'),
            open: true,
            hot: true,
            port: 3000,
        },
    }
};