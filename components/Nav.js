import Link from 'next/link'
import Image from 'next/image'

import near from '../lib/near'
import { prettyTruncate } from '../utils/common'
import { IconLongArrow } from './Icon'

const Nav = () => {
	const { currentUser } = near

	const _signIn = async () => {
		const appTitle = `Ghosty — A messaging platform for NEAR users to simply and instantly
		messaging across wallet-to-wallet on the NEAR network.`
		near.wallet.requestSignIn(
			process.env.CONTRACT_NAME,
			appTitle,
			`${location.protocol}//${location.host}/chat`,
			`${location.protocol}//${location.host}`
		)
	}

	return (
		<div className="flex justify-between items-center">
			<Link href="/">
				<div className="flex justify-between items-center gap-2">
					<img
						className="w-28 md:w-[148px]"
						src={'/assets/logo/ghosty-logo-black.png'}
						alt="ghosty-logo"
					/>
				</div>
			</Link>
			{currentUser ? (
				<Link href="/chat">
					<div className="flex justify-between items-center gap-2 px-2 py-2 md:px-6 md:py-3 my-auto rounded-md font-semibold text-white bg-primary-blue hover:bg-opacity-90 transition duration-300 cursor-pointer">
						<p>{prettyTruncate(currentUser.accountId, 16, 'address')}</p>
						<IconLongArrow size={20} color="white" />
					</div>
				</Link>
			) : (
				<button
					className="px-6 py-2 rounded-md font-semibold text-white bg-primary-black hover:bg-opacity-90 transition duration-200"
					onClick={_signIn}
				>
					Login
				</button>
			)}
		</div>
	)
}

export default Nav
