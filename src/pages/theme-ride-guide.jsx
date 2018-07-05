import React from 'react'
import {
	graphql,
	// Link,
	StaticQuery,
} from 'gatsby'
import Layout from 'components/Layout'

const RidesPage = () => (
	<StaticQuery
		query={graphql`
			query RidesPageQuery {
				allContentfulRide(limit: 1000) {
					edges {
						node {
							coach {
								name
							}
							date
							isVisible
							minutes
							more
							name
							type
						}
					}
				}
			}
		`}
		render={(data) => {
			const rides = data.allContentfulRide.edges
			return (
				<>
					<Layout>
						{rides.map(({ node }) => (
							<div>{node.name} {node.coach.name}</div>
						))}
					</Layout>
				</>
			)
		}}
	/>
)

export default RidesPage
