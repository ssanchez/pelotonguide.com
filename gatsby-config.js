module.exports = {
	siteMetadata: {
		title: 'Peloton Guide',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-emotion',
			options: {
				autoLabel: process.env.NODE_ENV === `production` ? false : true,
			},
		},
	],
}
