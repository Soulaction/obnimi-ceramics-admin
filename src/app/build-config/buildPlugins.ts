import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import Dotenv from 'dotenv-webpack';

export const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
    const {mode, paths} = options;
    const isDev = mode === 'development';

    return [
        new HtmlWebpackPlugin({template: paths.html}),
        new Dotenv({
            path: paths.env
        }),
        !isDev && new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),
        !isDev && new BundleAnalyzerPlugin()
    ].filter(Boolean);
}