const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "/dist"),
		filename: "app.bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					//resolve-url-loader may be chained before sass-loader if necessary
					use: ["css-loader", "sass-loader"]
				})
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		open: true
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "css/app.css",
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			title: "Webpack template",
			hash: true,
			template: "./src/index.ejs"
		})
	]
};
