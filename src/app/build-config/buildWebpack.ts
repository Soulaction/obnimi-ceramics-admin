import webpack from "webpack";
import path from "path";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";
import {buildDevServer} from "./buildDevServer";

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
    const {mode, paths: {entry, output}} = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
        entry,
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
        output: {
            path: output,
            filename: "[name].[contenthash].js",
            clean: true
        },
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
    }
}