import React from 'react'
import { string } from 'prop-types'
import { Link } from 'gatsby'
import styled from 'react-emotion'

const Header = ({ siteTitle }) => (
	<div
		style={{
			margin: '0 auto',
			maxWidth: 960,
			padding: '1.45rem 1.0875rem',
		}}
	>
		<h1 style={{ margin: 0 }}>
			<Link
				style={{
					textDecoration: 'none',
				}}
				to='/'
			>
				{siteTitle}
			</Link>
		</h1>
		<small>the unofficial home rider&apos;s guide to all things peloton</small>
	</div>
)

Header.propTypes = {
	siteTitle: string.isRequired,
}

export default Header
