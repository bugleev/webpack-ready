const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const bootstrapEntryPoints = require("./webpack.bootstrap.config");
const isProd = process.env.NODE_ENV === "production";
const cssDev = ["style-loader", "css-loader", "sass-loader"];
const cssProd = ExtractTextPlugin.extract({
	publicPath: "./../",
	fallback: "style-loader",
	use: ["css-loader", "sass-loader"]
});
const cssConfig = isProd ? cssProd : cssDev;

const bootstrapConfig = isProd
	? bootstrapEntryPoints.prod
	: bootstrapEntryPoints.dev;

module.exports = {
	devtool: "source-map",
	entry: {
		app: "./src/app.js",
		vendor: [bootstrapConfig, "./src/vendor.js"]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					babelrc: false,
					presets: [["env", { modules: false }]]
				}
			},
			{
				test: /\.scss$/,
				use: cssConfig
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					"file-loader?name=[name].[ext]&outputPath=images/",
					"image-webpack-loader"
				]
			},
			{
				test: /\.(woff2?|svg)$/,
				loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
			},
			{ test: /\.(ttf|eot)$/, loader: "file-loader?name=fonts/[name].[ext]" },
			{
				test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
				loader: "imports-loader?jQuery=jquery"
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		hot: true,
		compress: true,
		noInfo: true,
		open: true
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new ExtractTextPlugin({
			filename: "css/[name].css",
			disable: !isProd,
			allChunks: true
		}),
		new webpack.ProvidePlugin({
			"window.Tether": "tether"
		}),
		new HtmlWebpackPlugin({
			title: "Webpack template",
			hash: true,
			template: "./src/bootstrap.html"
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			Tether: "tether",
			Popper: "popper.js/dist/umd/popper.js",
			"window.Tether": "tether",
			Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
			Button: "exports-loader?Button!bootstrap/js/dist/button",
			Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
			Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
			Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
			Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
			Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
			Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
			Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			Util: "exports-loader?Util!bootstrap/js/dist/util"
		})
	]
};
