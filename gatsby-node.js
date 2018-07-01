const path = require(`path`)

// from https://next.gatsbyjs.org/docs/add-custom-webpack-config/
exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		},
	})
}
