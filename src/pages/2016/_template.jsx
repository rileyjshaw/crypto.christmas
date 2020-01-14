import Link from 'gatsby-link'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {createComponent} from 'react-fela'

import {config} from 'config'
import InlineIcon from 'components/InlineIcon'
import 'css/article.sass'
import {arrowLeftIcon, arrowRightIcon} from 'utils/icons'


const styles = {
	container: props => ({
		position: 'relative',
	}),

	day: props => ({
		display: 'inline-block',
		marginBottom: 0,
		position: 'relative',
	}),

	arrow: ({side}) => ({
		fontSize: '0.3em',
		opacity: 0.8,
		position: 'absolute',
		[side]: '-4em',

		':hover': {
			color: '#fff',
		},

		// HACK(riley)
		'@media (max-width: 920px)': {
			fontSize: '0.2em',
			[side]: '-3em',
		},
	}),
};

module.exports = React.createClass({
	propTypes () {
		return {
			route: React.PropTypes.object,
		};
	},

	getInitialState () {
		return {
			// Used to determine the CSS transition direction between pages.
			direction: '',
		};
	},

	contextTypes: {
		renderer: React.PropTypes.object.isRequired,
	},

	transitionTo (direction) {
		// HACK(riley): ReactCSSTransitionGroup is generally bad. This is easier than re-implementing it, and lighter
		//              than pulling in ReactMotion. See https://github.com/facebook/react/issues/1368.
		return () => this.setState({direction}, () => window.setTimeout(() => this.setState({direction: ''}), 800));
	},

	render () {
		const {renderRule} = this.context.renderer;
		const {route} = this.props.children.props;
		const {page: {data, file}} = route;
		const day = +file.name;
		const pathIdx = day - 1;
		const paths = this.props.route.childRoutes
			.map(childRoute => childRoute.page)
			.sort((a, b) => a.file.name - b.file.name)
			.map(({path}) => path)
			;
		const prev = paths[pathIdx - 1];
		const next = paths[pathIdx + 1];

		return <div className={renderRule(styles.container)}>
			<ReactCSSTransitionGroup
				className={`${this.state.direction}Transition`}
				transitionEnterTimeout={700}
				transitionLeaveTimeout={500}
				transitionName='article'
			>
				<div key={day}>
					<p className={renderRule(styles.day)}>
						{prev && <Link
							className={renderRule(styles.arrow, {side: 'left'})}
							onClick={this.transitionTo('right')}
							to={prev}
						>
							<InlineIcon {...arrowLeftIcon} />
						</Link>}
						Day {day}
						{next && <Link
							className={renderRule(styles.arrow, {side: 'right'})}
							onClick={this.transitionTo('left')}
							to={next}
						>
							<InlineIcon {...arrowRightIcon} />
						</Link>}
					</p>
					<h1 style={{marginTop: 0}}>{data.title || 'Coming soon'}</h1>
					{this.props.children}
				</div>
			</ReactCSSTransitionGroup>
		</div>;
	},
});
