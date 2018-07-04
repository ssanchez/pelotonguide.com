let contentfulConfig

try {
	contentfulConfig = require('./.contentful')
} catch (_) {
	contentfulConfig = {
		spaceId: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	}
} finally {
	const { spaceId, accessToken } = contentfulConfig

	if (!spaceId || !accessToken) {
		// eslint-disable-next-line no-unsafe-finally
		throw new Error('Contentful spaceId and the delivery token need to be provided.')
	}
}

module.exports = {
	siteMetadata: {
		title: 'Peloton Guide',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-emotion',
			options: {
				autoLabel: process.env.NODE_ENV !== `production`,
			},
		},
		{
			resolve: `gatsby-source-contentful`,
			options: contentfulConfig,
		},
	],
}
