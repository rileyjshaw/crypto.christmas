import {createRenderer} from 'fela'
import fallbackValue from 'fela-plugin-fallback-value'
import prefixer from 'fela-plugin-prefixer'
import unit from 'fela-plugin-unit'
import {prefixLink} from 'gatsby-helpers'
import React from 'react'
// import BalanceText from 'react-balance-text'  // TODO(riley): This has some bad bugs; link in the text content wasn't
//                                                               updating properly, height was jumpy… investigate.
import {createComponent, Provider} from 'react-fela'
import {Link} from 'react-router'

import ExternalLink from 'components/ExternalLink'
import InlineIcon from 'components/InlineIcon'
import 'css/global.sass'
import 'css/markdown.sass'
import 'css/typography.sass'
import {gearIcon} from 'utils/icons'
import sharedStyles from 'utils/sharedStyles'


const renderer = createRenderer({
	plugins: [
		unit(),
		prefixer(),
		fallbackValue(),
	],
});
const mountNode = typeof document === 'undefined' ? undefined : document.querySelector('#fela');

const styles = {
	container: props => ({
		boxSizing: 'border-box',
		flex: 1,
		margin: '0 auto 120px',
		maxWidth: 900,
		paddingLeft: 24,
		paddingRight: 24,
		width: '100%',
	}),

	header: props => ({
		alignItems: 'center',
		background: '#0091ea',    // TODO(riley): colors.bg
		boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.2)',
		boxSizing: 'border-box',
		display: 'flex',
		fontFamily: sharedStyles.typography.sans,
		fontSize: 16,
		fontWeight: 'bold',
		height: 48,               // TODO(riley): layout.headerHeight
		justifyContent: 'space-between',
		left: 0,
		paddingLeft: 24,
		paddingRight: 24,
		position: 'fixed',
		textShadow: 'none',
		top: 0,
		width: '100%',
		zIndex: 1,
	}),

	equalWidthExpander: ({align = 'left'}) => ({
		flex: '1 1 0',
		textAlign: align,
	}),

	hiddenOnMobile: props => ({
		'@media (max-width: 840px)': {
			display: 'none',
		},
	}),

	inlineLi: ({margin = '0.5em'}) => ({
		display: 'inline-block',
		marginLeft: margin,
		marginRight: margin,
	}),

	inheritFont: props => ({
		fontFamily: 'inherit',
		fontSize: 'inherit',
		fontWeight: 'inherit',
	}),

	thickUnderline: props => ({
		borderBottom: '3px solid #fff',
		paddingBottom: 2,
		paddingTop: 5,
	}),

	footer: props => ({
		boxShadow: '0 -1px 0 0 rgba(255, 255, 255, 0.2)',
		padding: '24px 12px',
		textAlign: 'center',

		'@media (max-width: 840px)': {
			fontSize: 12,
			padding: 12,
		},
	}),
};

const Container = createComponent(styles.container, 'div');
const Header = createComponent(styles.header, 'header');
const EqualWidthExpander = createComponent(styles.equalWidthExpander, 'div');
const QuickArticleList = createComponent(styles.hiddenOnMobile, 'ol');
const InlineLi = createComponent(styles.inlineLi, 'li');
const CleanLink = ({className = '', ...props}, {renderer}) =>
	<Link {...props} className={`${className} ${renderer.renderRule(sharedStyles.mixins.linkReset)}`} />;
CleanLink.contextTypes = {renderer: React.PropTypes.object};
const Footer = createComponent(styles.footer, 'footer');

module.exports = React.createClass({
	propTypes () {
		return {
			children: React.PropTypes.any,
		}
	},

	getInitialState () {
		return {
			toggle: false,
		};
	},

	render () {
		const [{page}] = this.props.routes.slice(-1);
		const {path, requirePath} = page;

		const quickLinks = Array.from({length: 12}, (_, i) => {
			const to = `/2016/${i + 1}/`;
			const linkClassName = to === path
				? renderer.renderRule(styles.thickUnderline)
				: '';

			return <InlineLi key={i}>
				<CleanLink
					to={to}
					className={linkClassName}
				>{i + 1}</CleanLink>
			</InlineLi>
		});

		// TODO(riley): Gatsby's aggressive use of dangerouslySetInnerHTML doesn't mesh well with Fela, but this works
		//              for now. May need to revisit if SSR happens.
		return <Provider renderer={renderer} mountNode={mountNode}><div>
			<Header>
				<EqualWidthExpander>
					<CleanLink to={prefixLink('/')}>
						<h1 className={renderer.renderRule(styles.inheritFont)}>crypto christmas 🔒🎄</h1>
					</CleanLink>
				</EqualWidthExpander>
				<QuickArticleList>{quickLinks}</QuickArticleList>
				<EqualWidthExpander align='right' className={renderer.renderRule(styles.hiddenOnMobile)}>
					<ul className={renderer.renderRule(sharedStyles.mixins.listReset)}>
						<InlineLi>
							<CleanLink to='/about/'>About</CleanLink>
						</InlineLi>

						{/* TODO(riley): Big time.
						<InlineLi>
							<CleanLink to='/blog/'>Blog</CleanLink>
						</InlineLi>
						<InlineLi style={{color: this.state.toggle ? 'red' : 'blue'}}>
							<InlineIcon {...gearIcon} onClick={() => this.setState({toggle: !this.state.toggle})} />
						</InlineLi>
						*/}

					</ul>
				</EqualWidthExpander>
			</Header>
			<Container>{this.props.children}</Container>
			<Footer>
				This guide is free and open-source. It is hosted on <ExternalLink
					to='https://github.com/rileyjshaw/crypto.christmas'
				>GitHub</ExternalLink>.
				<br />
				If you notice anything wrong, you can <ExternalLink
					to='https://github.com/rileyjshaw/crypto.christmas/issues'
				>log an issue</ExternalLink> or <ExternalLink
					to={`https://github.com/rileyjshaw/crypto.christmas/edit/master/pages/${requirePath}`}
				>suggest edits to this page</ExternalLink>.
			</Footer>
		</div></Provider>;
	},
});
