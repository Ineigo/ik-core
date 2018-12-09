const path = require('path');

module.exports = {
	entry: {
		game: './example/game.js'
	},
	mode: 'development',
	output: {
		publicPath: '/',
		path: path.join(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: path.join(__dirname, ''),
				loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									node: '8.10'
								}
							}
						]
					],
					plugins: [ '@babel/plugin-proposal-class-properties' ]
				}
			}
		]
	},

	devServer: {
		contentBase: path.join(__dirname, './dist'),
		watchContentBase: true,
		port: 9000
	},
};
