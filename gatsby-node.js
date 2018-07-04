const path = require(`path`)
const Promise = require(`bluebird`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions

	return new Promise((resolve, reject) => {
		graphql(`
			{
				allContentfulPost(limit: 1000) {
					edges {
						node {
							id
							slug
						}
					}
				},
				allContentfulCoach(limit: 1000) {
					edges {
						node {
							id
							name
						}
					}
				}
			}
		`)
			.then((result) => {
				if (result.errors) {
					// eslint-disable-next-line no-console
					result.errors.forEach((e) => console.error(e.toString()))
					reject(result.errors)
				}

				// Create Post pages
				const postTemplate = path.resolve(`./src/templates/post.jsx`)
				const posts = result.data.allContentfulPost.edges
				posts.forEach(({ node }) => {
					createPage({
						path: `/${node.slug}/`,
						component: postTemplate,
						context: {
							id: node.id,
						},
					})
				})
				resolve()
			})
	})
}

// from https://next.gatsbyjs.org/docs/add-custom-webpack-config/
exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		},
	})
}
