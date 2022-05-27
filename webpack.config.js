const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const isDevelopment = process.env.NODE_ENV !== "production"

const plugins = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),
    isDevelopment && new ReactRefreshWebpackPlugin()
].filter(Boolean)

module.exports = {
    mode: isDevelopment ? "development" : "production",
    entry: "./src/index.js",
    output: {
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true,
        path: path.resolve(__dirname, "docs")
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: "asset"
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins,
    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot: true
    }
}
