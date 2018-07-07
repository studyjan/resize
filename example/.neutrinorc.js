const path = require('path');

module.exports = {
	use: [
		[
			'@neutrinojs/react',
			{
				html: {
					title: 'Resize',
					baseHref: '/',
				},
			},
		],
		[
			'@neutrinojs/style-loader',
			{
				loaders: [
					{
						loader: 'sass-loader',
						useId: 'sass',
					},
				],
				test: /\.(css|sass|scss)$/,
			},
		],
		neutrino => {
			neutrino.config.module
				.rule('compile')
				.use('babel');

			neutrino.config.resolve.alias.set('utils', path.resolve(__dirname, 'src/utils'));
			neutrino.config.resolve.alias.set('screens', path.resolve(__dirname, 'src/screens'));
			neutrino.config.resolve.alias.set('decorators', path.resolve(__dirname, 'src/decorators'));
			neutrino.config.resolve.alias.set('components', path.resolve(__dirname, 'src/components'));
			neutrino.config.resolve.alias.set('stylesheets', path.resolve(__dirname, 'src/stylesheets'));
		},
	],
}
