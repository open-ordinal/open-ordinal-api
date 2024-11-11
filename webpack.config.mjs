import path from 'path';
import { dirname } from 'path';
import TerserPlugin from "terser-webpack-plugin";
import webpack from 'webpack';
import packageJson from './package.json' with { type: "json" };
import { fileURLToPath } from 'url';

//const mode = "development";
const mode = "production";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default env => {
    let minify = env.minify;
    if (minify == undefined) minify = false;

    let entry = minify ? {
        "open-ordinal-api.min": "./lib/OOAPI.js"
    } : {
        "open-ordinal-api": "./lib/OOAPI.js"
    }

    return {
        mode: mode,
        entry: entry,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: '[name].js',
            libraryTarget: 'module',
            //library: 'ooAPI',
            clean: false,
        },
        experiments: {
            // asyncWebAssembly: true,
            // buildHttp: true,
            // layers: true,
            // lazyCompilation: true,
            outputModule: true,
            // syncWebAssembly: true,
            // topLevelAwait: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        // infrastructureLogging: {
        //     debug: [name => name.includes('webpack-dev-server')],
        // },
        devServer: {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*"
            },
            static: [
                {
                    directory: path.join(__dirname, 'test'),
                    watch: true,
                },
                {
                    directory: path.join(__dirname, 'dist'),
                    watch: true,
                },
            ],
            allowedHosts: "all",
            compress: true,
            port: 9999,
            proxy: [
                {
                    context: ['/preview', '/inscription', '/content', '/r'],
                    //target: 'http://localhost:9001/', // Local Ord Server
                    target: 'https://ordinals.com/', // Remote Ord Server
                    pathRewrite: {
                        '^/preview': '/preview',
                        '^/inscription': '/inscription',
                        '^/content': '/content',
                        '^/r': '/r'
                    },
                    secure: false,
                    changeOrigin: true
                }
            ],
            historyApiFallback: {
                index: 'index.html'
            },
            client: {
                logging: 'none', // 'none', 'error', 'warn', 'info', 'log', 'verbose'
                reconnect: true,
                overlay: {
                    errors: true,
                    warnings: true,
                    runtimeErrors: true,
                },
            },
        },
        // devtool: 'source-map',
        optimization: {
            minimize: minify,
            usedExports: false,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            unused: true,
                            dead_code: true,
                        },
                    },
                    extractComments: false,
                })
            ],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: `/*! 
* Open Ordinal API ${packageJson.version}
*/`,
                raw: true
            })
        ],
        performance: {
            hints: mode === 'production' ? 'warning' : false, // Disable performance hints in development
            maxAssetSize: 1512000,
            maxEntrypointSize: 1512000,
        },
    }
};