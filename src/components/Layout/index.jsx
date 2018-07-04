// @todo replace Helmet with SeoHeader
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'
import Body from './Body'
import './layout.css'

const Layout = ({ children }) => (
	<StaticQuery
		query={graphql`
			query SiteTitleQuery {
				site {
					siteMetadata {
						title
					}
				}
			}
		`}
		render={(data) => {
			const { title } = data.site.siteMetadata
			return (
				<>
					<Helmet
						meta={[
							{ name:  'description', content: `The unofficial home rider's guide to all things Peloton. Updated Peloton information such as theme ride listings and coach social media links.`},
							{ name: 'keywords', content: 'sample, something' },
						]}
						title={title}
					/>
					<Header siteTitle={title} />
					<Body>
						{children}
					</Body>
				</>
			)
		}}
	/>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
