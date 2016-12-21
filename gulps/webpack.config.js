var webpack = require("webpack");

function buildConfiguration(isTest) {
//
//  Set chunk "lib" as a common chunk
//
var config = {
    //
    //  Each key creates a new chunk
    //
    entry: {
        lib: [
            "angular",
            "angular-route",
            "angular-animate",
            "angular-bootstrap",
            "angular-moment",
            "angular-resource",
            "angular-toastr",
            "angular-touch",
            "angular-ui-router",
            "jquery",
            "jquery-ui",
            "moment",
            "toastr"
        ],
        app: "./app/app"
    },

    output: {
        path: "./dist",
        filename: "[name].bundle.js"
    },

    resolve: {
        //
        //  default extensions in case of require("./file")
        //
        extensions: ['', '.ts', '.js', 'css']
    },

    //
    //  Create source maps
    //
    devtool: 'source-map',

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                    query: {
                        compilerOptions: {
                            //
                            //  the root tsconfig is configured to not emit JS files
                            //  Webpack by default uses this file
                            //  Below is an overwrite to allow JS emiting
                            //
                            "noEmit": false
                        }
                    }
                },
            {
                test: /\.scss$/,
                loaders: [
                    //
                    //  inject style tag into HTML
                    //
                    'style',

                    //
                    //  Handles resources (like images) and add support for CSS modules
                    //
                    //'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',
                    'css?modules&localIdentName=[local]',
                    //
                    //  Compiles SASS
                    //
                    'sass?sourceMap'
                ]
            },
            { test: /\.json$/, loader: "json" },
            { test: /\.woff(\?.*)?$/, loader: 'url?limit=10000&name=./fonts/[name]-[hash].[ext]&mimetype=application/font-woff' },
            { test: /\.woff2(\?.*)?$/, loader: 'url?limit=10000&name=./fonts/[name]-[hash].[ext]&mimetype=application/font-woff2' },
            { test: /\.otf(\?.*)?$/, loader: 'file?limit=10000&name=./fonts/[name]-[hash].[ext]&mimetype=font/opentype' },
            { test: /\.ttf(\?.*)?$/, loader: 'url?limit=10000&name=./fonts/[name]-[hash].[ext]&mimetype=application/octet-stream' },
            { test: /\.eot(\?.*)?$/, loader: 'file?name=./fonts/[name]-[hash].[ext]' },
            { test: /\.svg(\?.*)?$/, loader: 'url?limit=10000&name=./fonts/[name]-[hash].[ext]&mimetype=image/svg+xml' },
            { test: /\.(png|jpe?g|gif)$/, loader: 'url?limit=8192' }
        ],
    },
};

if(!isTest) {
    var commonChunks = new webpack.optimize.CommonsChunkPlugin({
        names: ["lib"],
    });

    config.plugins.push(commonChunks);
}
return config;
}

module.exports = buildConfiguration;