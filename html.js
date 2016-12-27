import {prefixLink} from 'gatsby-helpers'
import React from 'react'
import Helmet from 'react-helmet'


const BUILD_TIME = new Date().getTime();

module.exports = React.createClass({
	propTypes () {
		return {
			body: React.PropTypes.string,
		}
	},

	render () {
		const head = Helmet.rewind();

		const publicStyles = process.env.NODE_ENV === 'production' &&
			<style dangerouslySetInnerHTML={{ __html: require('!raw!./docs/styles.css') }} />;

		return <html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<meta name="theme-color" content="#00557f" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0091ea" />
				<meta name="apple-mobile-web-app-title" content="Crypto Xmas" />
				<meta name="application-name" content="Crypto Xmas" />
				{head.title.toComponent()}
				{head.meta.toComponent()}
				{publicStyles}
			</head>
			<body>
				<style id="fela" />
				<div id='react-mount' dangerouslySetInnerHTML={{ __html: this.props.body }} />
				<script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
				{process.env.NODE_ENV === 'production' && <script src='/snowstorm-min.js' />}
				{process.env.NODE_ENV === 'production' && <script>snowStorm.zIndex = 2;</script>}
			</body>
		</html>;
	},
});
