/**
 * Takes an SVG icon and renders it inline.
 *
 * Example usage:
 *
 *   import externalLinkIcon from 'utils/icons.js'
 *
 *   <InlineIcon {...externalLinkIcon} />
 *
 */
import React from 'react'


const InlineIcon = ({path, width, height, style = {}, ...rest}) => <svg
	style={{verticalAlign: 'middle', ...style}}
	width={`${width / height}em`}
	height='1em'
	viewBox={`0 0 ${width} ${height}`}
	{...rest}
>
	<path d={path} fill='currentColor' />
</svg>;

InlineIcon.propTypes = {
	// An SVG path to render.
	path: React.PropTypes.string.isRequired,

	// The path's viewBox dimensions.
	// We set the viewport height to 1em and scale the width accordingly.
	height: React.PropTypes.number.isRequired,
	width: React.PropTypes.number.isRequired,

	style: React.PropTypes.object,
};

module.exports = InlineIcon;
