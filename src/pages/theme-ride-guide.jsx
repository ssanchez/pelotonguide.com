import React, { Component } from 'react'
import { object } from 'prop-types'
import { graphql } from 'gatsby'
import {
	AutoSizer,
	Column,
	Table,
} from 'react-virtualized'
import Layout from 'components/Layout'
import './theme-ride-guide.css'

class RidesPage extends Component {
	noRowsRenderer = () => {
		return <div className='noRows'>No rows</div>
	}

	rowClassName = ({ index }) => {
		if (index < 0) {
			return 'headerRow'
		}
		return index % 2 === 0 ? 'evenRow' : 'oddRow'
	}

	render() {
		const {
			data: {
				allContentfulRide: {
					edges: rides,
				},
			},
		} = this.props

		return (
			<Layout>
				<AutoSizer>
					{({ height, width }) => (
						<Table
							headerHeight={30}
							height={height}
							noRowsRenderer={this.noRowsRenderer}
							rowClassName={this.rowClassName}
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
							<Column
								dataKey='minutes'
								label='Min'
								width={300}
							/>
						</Table>
					)}
				</AutoSizer>
			</Layout>
		)
	}
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
						profilePhoto {
							file {
								url
							}
						}
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
