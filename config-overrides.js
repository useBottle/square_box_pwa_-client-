const {
	override,
	addWebpackModuleRule,
	addWebpackPlugin,
} = require("customize-cra");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = override(
	addWebpackModuleRule({
		test: /\.scss$/,
		use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
	}),
	addWebpackPlugin(
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
			chunkFilename: "[id].[contenthash].css",
		})
	)
);
