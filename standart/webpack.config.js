const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const cssDev = ["style-loader", "css-loader", "sass-loader"];
const cssProd = ExtractTextPlugin.extract({
	publicPath: "./../",
	fallback: "style-loader",
	use: [
		{
			loader: "css-loader",
			options: {
				minimize: true,
				sourceMap: true
			}
		},
		{
			loader: "sass-loader",
			options: {
				sourceMap: true
			}
		}
	]
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: {
		app: "./src/app.js"
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
					"file-loader?name=[name].[ext]&outputPath=./images/",
					"image-webpack-loader"
				]
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

		new HtmlWebpackPlugin({
			title: "Webpack template",
			hash: true,
			template: "./src/index.ejs"
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};
