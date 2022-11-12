const IconPlus = ({ size = 20, color = '#262626', className }) => {
	return (
		<svg
			className={className}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke={color}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 4.5v15m7.5-7.5h-15"
			/>
		</svg>
	)
}

export default IconPlus
