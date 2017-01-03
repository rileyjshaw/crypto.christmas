import {config} from 'config'
import {prefixLink} from 'gatsby-helpers'
import React from 'react'
import BalanceText from 'react-balance-text'
import Helmet from 'react-helmet'
import {Link} from 'react-router'

import sharedStyles from 'utils/sharedStyles'


const styles = {
	container: props => ({
		textAlign: 'center',
	}),

	blockLink: props => ({
		border: '1px solid rgba(255, 255, 255, 0.2)',
		borderRadius: 7,
		boxSizing: 'border-box',
		color: 'inherit',
		display: 'block',
		height: '100%',
		overflow: 'hidden',
		textDecoration: 'none',
		width: '100%',
	}),

	day: props => ({
		background: 'rgba(255, 255, 255, 0.2)',
		fontFamily: 'sans-serif',
		fontSize: 30,
		fontWeight: 'bold',
		height: 48,
		lineHeight: '48px',
		margin: 0,
		paddingLeft: '0.5em',
		paddingRight: '0.5em',
		textAlign: 'right',
		textTransform: 'uppercase',
		verticalAlign: 'top',
	}),

	articleList: props => ({
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginLeft: -36,
		marginRight: -36,
		marginTop: -36,

		'@media (max-width: 920px)': {
			justifyContent: 'space-around',
		},
	}),

	article: props => ({
		height: 180,
		margin: 36,
		position: 'relative',
		textAlign: 'left',
		width: 180,
	}),

	articleTitle: props => ({
		margin: 0,
		padding: '8px 12px',
	}),

	cta: props => ({
		fontSize: 36,
		marginBottom: 60,
		marginTop: '1.5em',
	}),

	ready: props => ({
		color: '#fff !important',
		display: 'inline-block',
		marginBottom: 108,
	}),
};

export default class Index extends React.Component {
	render () {
		const {renderRule} = this.context.renderer;

		const articles = this.props.route.pages
			.filter(page => page.file.dir === '2016')
			.sort((a, b) => a.file.name - b.file.name)
			.map((article, i) => <li key={i} className={renderRule(styles.article)}>
				<Link
					className={`${renderRule(styles.blockLink)} ${renderRule(sharedStyles.mixins.linkReset)}`}
					to={article.path}
				>
					<p className={renderRule(styles.day)}>{i + 1}</p>
					{/* HACK(riley): `BalanceText` doesn't handle child tags well. */}
					<div className={renderRule(styles.articleTitle)}>
						<BalanceText resize={false}>{article.data.title}</BalanceText>
					</div>
				</Link>
			</li>)
			;

		return <div className={renderRule(styles.container)}>
			<Helmet
				title={config.siteTitle}
				meta={[
					{'name': 'Crypto Christmas', 'content': 'Spend five minutes per day for 12 days to improve your online privacy and security.'},
					{'name': 'keywords', 'content': 'cryptography, security, privacy, internet, email, hacking, safety'},
				]}
			/>
			<div className={renderRule(styles.cta)}><BalanceText>
				Spend five minutes per day for 12 days to improve your online privacy and security.
			</BalanceText></div>
			<Link
				className={renderRule(styles.ready)}
				to='/2016/1/'
			>
				Ready?
			</Link>
			<ol className={`${renderRule(styles.articleList)} ${renderRule(sharedStyles.mixins.listReset)}`}>
				{articles}
			</ol>
		</div>;
	}
}

Index.contextTypes = {
	renderer: React.PropTypes.object.isRequired,
};
