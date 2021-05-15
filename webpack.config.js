const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: ['vue-loader'],
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // {
                    //     loader: 'postcss-loader',
                    // },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(
                                __dirname,
                                'src/assets/variable.scss'
                            ),
                        },
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name][contenthash:8].[ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|webm|mp4|svg|webp)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    esModule: false,
                },
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader',
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
    ],
}
