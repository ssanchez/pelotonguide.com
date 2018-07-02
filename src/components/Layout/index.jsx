import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'react-emotion'

import Header from './Header'
import './layout.css'

const LayoutWrapper = styled.div`
	margin: 0 auto;
	max-width: 960;
	padding: 0 1.0875rem 1.45rem;
	padding-top: 0;
`

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
		render={(data) => (
			<>
				<Helmet
					meta={[
						{ name: 'description', content: `The unofficial home rider's guide to all things Peloton. Updated Peloton information such as theme ride listings and coach social media links.` },
						{ name: 'keywords', content: 'sample, something' },
					]}
					title={data.site.siteMetadata.title}
				/>
				<Header siteTitle={data.site.siteMetadata.title} />
				<LayoutWrapper>
					{children}
				</LayoutWrapper>
			</>
		)}
	/>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
