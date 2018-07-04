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
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
			},
		},
	],
}
