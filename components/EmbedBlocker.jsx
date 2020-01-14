import React from 'react'

import InlineIcon from './InlineIcon.jsx'


const style = {
	fontSize: '0.5em',
	marginLeft: '0.5em',
	textDecoration: 'underline',
};

const EmbedBlocker = React.createComponent({
	render() {
		const {embed, iconPath, site, title} = this.props;
		return <div>
			<h2>{title}</h2>
			{iconPath && <InlineIcon path={iconPath} />}
			This embedded content is from an external site {site && `(${site})`} that may track your behavior.
		</div>;
	},
});

EmbedBlocker.propTypes = {
	embed: React.PropTypes.node.isRequired,
	icon: React.PropTypes.node,
	site: React.PropTypes.string,
	title: React.PropTypes.string.isRequired,
};

module.exports = EmbedBlocker;
