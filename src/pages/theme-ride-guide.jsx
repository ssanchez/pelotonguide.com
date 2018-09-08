import React from 'react'
import { object } from 'prop-types'
import { graphql } from 'gatsby'
import {
	AutoSizer,
	Column,
	Table,
} from 'react-virtualized'
import Layout from 'components/Layout'

const RidesPage = ({ data }) => {
	const rides = data.allContentfulRide.edges
	return (
		<Layout>
			<AutoSizer>
				{({ height, width }) => (
					<Table
						headerHeight={30}
						height={height}
						rowCount={rides.length}
						rowGetter={({ index }) => rides[index].node}
						rowHeight={50}
						width={width}
					>
						<Column
							dataKey='name'
							label='Theme'
							width={300}
						/>
					</Table>
				)}
			</AutoSizer>
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
