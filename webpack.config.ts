import path from "path";
import webpack from "webpack";
import {BuildMode, BuildPaths, BuildPlatform, buildWebpack} from "./src/app/build-config";

interface EnvVariables {
    mode: BuildMode,
    port?: number,
    platform?: BuildPlatform,
    SHOP_REMOTE_URL?: string,
    ADMIN_REMOTE_URL?: string,
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'main.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        srcAlias: path.resolve(__dirname, 'src'),
        env: path.resolve(__dirname, '.env'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
    });

    return config;
};
