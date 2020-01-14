import React from 'react'

import InlineIcon from './InlineIcon.jsx'
import {externalLinkIcon} from 'utils/icons.js'


const style = {
	fontSize: '0.5em',
	marginLeft: '0.5em',
	textDecoration: 'underline',
};

// TODO(riley): If there's a period after this, it breaks to the next line. Ugh. The icon and period should stick with
//              the last word in `children`, but no combination of Unicode joiners I've tried works.
const ExternalLink = ({to, children}) => <a
	href={to}
	rel='noopener noreferrer'
	target='_blank'
>
	{children}
	<InlineIcon {...externalLinkIcon} style={style} />
</a>;

ExternalLink.propTypes = {to: React.PropTypes.string.isRequired};

module.exports = ExternalLink;
