const path = require("path");
const {
	override,
	addWebpackAlias,
	addWebpackModuleRule,
	addWebpackPlugin,
} = require("customize-cra");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = override(
	addWebpackAlias({
		"@": path.resolve(__dirname, "src"),
	}),
	addWebpackModuleRule({
		test: /\.module\.s[ac]ss$/i,
		use: [
			MiniCssExtractPlugin.loader,
			{
				loader: "css-loader",
				options: {
					modules: true,
				},
			},
			"sass-loader",
		],
	}),
	addWebpackModuleRule({
		test: /\.s[ac]ss$/i,
		exclude: /\.module\.s[ac]ss$/,
		use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
	}),
	addWebpackPlugin(new CleanWebpackPlugin()),
	addWebpackPlugin(
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		})
	),
	addWebpackPlugin(
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			minify: true,
		})
	)
);
