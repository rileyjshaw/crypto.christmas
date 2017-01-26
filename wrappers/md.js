import {config} from 'config'
import React from 'react'
import Helmet from "react-helmet"

module.exports = React.createClass({
	propTypes () {
		return {
			route: React.PropTypes.object,
		}
	},

	render () {
		// TODO(riley): Strip out <a>s and replace them with <Link>s and <ExternalLink>s. The nicest way to do this
		//              would be to actually integrate with Gatsby. See:
		//
		//              - https://github.com/draft-js-plugins/draft-js-plugins/pull/271
		//              - https://github.com/gatsbyjs/gatsby/pull/244
		//
		//              for some history.
		const post = this.props.route.page.data;
		const {description, title} = post;
		const meta = description && [{name: 'description', content: description}];

		return <div className="markdown">
			<Helmet title={title} meta={meta} />
			<div dangerouslySetInnerHTML={{ __html: post.body }} />
		</div>;
	},
});
