import path from "node:path";
import url from "node:url";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
	entry  : glob.sync( "./src/**/*.js" ),
	// Entry    : "/src/main/script.js",
	mode   : "development",
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin( {
			title          : "To Do app",
			templateContent: `
	<!DOCTYPE html>
    <html>
			<head>
		    <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
				<meta name="viewport" content="width=device-width, initial-scale=1">
			</head>
      <body>
				<div id="content">
					<main></main>
				</div>
      </body>
    </html>
  `,
		} ),
	],
	output: {
		filename: "main.js",
		path    : path.resolve( path.dirname( url.fileURLToPath( import.meta.url ) ), "dist" ),
		clean   : true,
	},
	// Optimization: { runtimeChunk: "single" },
	module: {
		rules: [
			{
				test: /\.css$/i,
				use : ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|jfif)$/i,
				type: "asset/resource",
			},
		],
	},
	devServer: {
		static  : { directory: "./dist" },
		compress: true,
		port    : 9000,
		host    : "localhost",
	},
};