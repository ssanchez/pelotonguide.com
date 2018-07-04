import React from 'react'
import {
	graphql,
	Link,
	StaticQuery,
} from 'gatsby'
import Layout from 'components/Layout'

const IndexPage = () => (
	<StaticQuery
		query={graphql`
			query IndexPageQuery {
				allContentfulPost(limit: 1000) {
					edges {
						node {
							slug
						}
					}
				}
			}
		`}
		render={(data) => {
			const posts = data.allContentfulPost.edges
			return (
				<>
					<Layout>
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
		}}
	/>
)

export default IndexPage
