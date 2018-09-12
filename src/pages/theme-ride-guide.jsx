import React, { Component } from 'react'
import { object } from 'prop-types'
import { graphql } from 'gatsby'
import {
	AutoSizer,
	Column,
	Table,
} from 'react-virtualized'
import { get } from 'lodash'
import format from 'date-fns/format'
import styled from 'react-emotion'
import Layout from 'components/Layout'
import './theme-ride-guide.css'

const COACH_PIC_DIMENSION = 40

const CoachPic = styled.img`
	display: block;
	height: ${COACH_PIC_DIMENSION}px;
	margin-bottom: 0;
	width: ${COACH_PIC_DIMENSION}px;
`
const SearchBox = styled.input`
	border: 1px solid #000;
`
class RidesPage extends Component {
	state = { currentFilter: '' }

	dateRenderer = ({ cellData }) => format(new Date(cellData), 'MM/DD/YY')

	handleSearch = (e) => {
		this.setState({ currentFilter: e.target.value.toLowerCase() })
	}

	imageCellRenderer = ({ cellData }) => (
		cellData
			? (
				<CoachPic
					alt=''
					height={COACH_PIC_DIMENSION}
					src={`https://${cellData}`}
					width={COACH_PIC_DIMENSION}
				/>
			)
			: '')

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
					edges,
				},
			},
		} = this.props
		const { currentFilter } = this.state

		const rides = edges
			.filter((ride) => {
				const { isVisible, more, name } = ride.node
				return isVisible && (
					currentFilter === ''
					|| name.toLowerCase().includes(currentFilter)
					|| more.toLowerCase().includes(currentFilter)
				)
			})
			.map((ride) => ({
				...ride.node,
				coachName: get(ride, 'node.coach.name', ''),
				coachImg: get(ride, 'node.coach.profilePhoto.file.url', ''),
			}))

		return (
			<Layout>
				<SearchBox onChange={this.handleSearch} type='text' />
				<AutoSizer>
					{({ height, width }) => (
						<Table
							headerHeight={30}
							height={height}
							noRowsRenderer={this.noRowsRenderer}
							rowClassName={this.rowClassName}
							rowCount={rides.length}
							rowGetter={({ index }) => rides[index]}
							rowHeight={50}
							width={width}
						>
							<Column
								cellRenderer={this.imageCellRenderer}
								dataKey='coachImg'
								flexShrink={0}
								label=''
								width={40}
							/>
							<Column
								dataKey='coachName'
								flexGrow={1}
								label='Coach'
								width={100}
							/>
							<Column
								dataKey='name'
								flexGrow={2}
								label='Theme'
								width={100}
							/>
							<Column
								dataKey='minutes'
								flexShrink={0}
								label='Min'
								width={30}
							/>
							<Column
								cellRenderer={this.dateRenderer}
								dataKey='date'
								flexShrink={0}
								label='Date'
								width={60}
							/>
							<Column
								dataKey='more'
								flexGrow={2}
								label='More'
								width={100}
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
