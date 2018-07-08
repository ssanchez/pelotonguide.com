import React from 'react'
import { object } from 'prop-types'
import {
	graphql,
	Link,
} from 'gatsby'
import Layout from 'components/Layout'

const IndexPage = ({ data }) => {
	const posts = data.allContentfulPost.edges
	return (
		<>
			<Layout>
				<Link to='theme-ride-guide'>Theme ride guide</Link>
				{posts.map(({ node }) => (
					<div>
						<Link to={node.slug}>
							{node.slug}
						</Link>
					</div>
				))}
			</Layout>
		</>
	)
}

IndexPage.propTypes = {
	data: object,
}

export const indexPageQuery = graphql`
	query IndexPageQuery {
		allContentfulPost(limit: 1000) {
			edges {
				node {
					slug
				}
			}
		}
	}
`

export default IndexPage
