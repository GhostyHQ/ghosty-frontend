const IconCheck = ({ size = 24, color = '#A7A7A7', className }) => {
	return (
		<svg
			className={className}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="3"
			stroke={color}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 12.75l6 6 9-13.5"
			/>
		</svg>
	)
}

export default IconCheck
