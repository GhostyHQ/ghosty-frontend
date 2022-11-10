import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
	return (
		<div className="flex justify-between items-center">
			<Link href="/">
				<div className="flex justify-between items-center gap-2">
					<Image
						className="w-28 md:w-[148px]"
						src={'/assets/ghosty-logo-black.png'}
						width={148}
						height={148}
						alt="ghosty-logo"
						style={{ width: 'auto', height: 'auto' }}
					/>
				</div>
			</Link>
			<button className="px-6 py-2 rounded-md font-semibold text-white bg-primary-black hover:bg-opacity-90 transition duration-200">
				Login
			</button>
		</div>
	)
}

export default Nav
