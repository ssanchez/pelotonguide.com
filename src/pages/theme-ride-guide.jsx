import React from 'react'
import { object } from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'

const RidesPage = ({ data }) => {
	const rides = data.allContentfulRide.edges
	return (
		<Layout>
			{rides.map(({ node }) => (
				<div>{node.name} {node.coach.name}</div>
			))}
		</Layout>
	)
}

RidesPage.propTypes = {
	data: object,
}

export const ridesPageQuery = graphql`
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
`

export default RidesPage
