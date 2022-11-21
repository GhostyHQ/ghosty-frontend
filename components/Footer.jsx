import Link from 'next/link'

const Footer = () => {
	return (
		<div className="mt-20 py-4">
			<hr />
			<div className="max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-4 md:mx-auto md:flex justify-between">
				<div className="pt-4">
					<p className="text-sm">
						Ghosty 2022 <span className="mx-1">|</span> Made with love in Earth
					</p>
				</div>
				<div className="pt-4">
					<p className="text-sm">
						<a href="https://near.org" target="_blank" rel="noreferrer">
							<span className="underline underline-offset-2 cursor-pointer hover:text-primary-blue transition duration-300">
								Near
							</span>
						</a>
						<span className="mx-2">|</span>
						<Link href="/faq">
							<span className="underline underline-offset-2 cursor-pointer hover:text-primary-blue transition duration-300">
								FAQs
							</span>
						</Link>
						<span className="mx-2">|</span>{' '}
						<a
							href="https://explorer.near.org"
							target="_blank"
							rel="noreferrer"
						>
							<span className="underline underline-offset-2 cursor-pointer hover:text-primary-blue transition duration-300">
								Explorer
							</span>
						</a>
						<span className="mx-2">|</span>{' '}
						<a
							href="https://twitter.com/ghostychat"
							target="_blank"
							rel="noreferrer"
						>
							<span className="underline underline-offset-2 cursor-pointer hover:text-primary-blue transition duration-300">
								Twitter
							</span>
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
