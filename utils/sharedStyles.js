const mixins = {
	linkReset: props => ({
		color: 'inherit !important',
		textDecoration: 'none',
	}),

	listReset: props => ({
		display: 'inlineBlock',
		listStyle: 'none',
		margin: 0,
		padding: 0,
	}),
};

const typography = {
	sans: '"Gill Sans", "Gill Sans MT", "Helvetica Neue", Helvetica, Arial, sans-serif',
	serif: 'Georgia, Times, "Times New Roman", serif',
};

module.exports = {
	mixins,
	typography,
};
