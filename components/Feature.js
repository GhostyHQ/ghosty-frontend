import {
	IconBell,
	IconBlocked,
	IconChatBubble,
	IconLocked,
	IconMoon,
	IconPicture,
	IconPuzzle,
	IconTag,
} from './Icon'

const Feature = () => {
	return (
		<div className="max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-40 px-4 md:px-0">
			<p className="text-2xl font-semibold">Features</p>
			<div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
				<div className="p-8 mb-6 border-2 border-primary-light-grey border-opacity-50 rounded-xl">
					<IconChatBubble size={32} />
					<p className="mt-4 font-bold">Instant Chat</p>
					<p className="mt-1 text-justify">
						Wallet-to-wallet instant chat with a Near-compatible address.
					</p>
				</div>
				<div className="p-8 mb-6 border-2 border-primary-light-grey border-opacity-50 rounded-xl">
					<IconLocked size={32} />
					<p className="mt-4 font-bold">End-to-end Encryption</p>
					<p className="mt-1 text-justify">
						Chat messages between signed-in addresses are encrypted by default.
					</p>
				</div>
				<div className="p-8 mb-6 border-2 border-primary-light-grey border-opacity-50 rounded-xl">
					<IconBlocked size={32} />
					<p className="mt-4 font-bold">Block Addresses</p>
					<p className="mt-1 text-justify">
						Getting spam by address? Block the owner from sending you messages.
					</p>
				</div>
				<div className="p-8 mb-6 border-2 border-primary-light-grey border-opacity-50 rounded-xl">
					<IconBell size={32} />
					<p className="mt-4 font-bold">Notifications</p>
					<p className="mt-1 text-justify">
						Receive notifications in your browser, or email.
					</p>
				</div>
				<div className="p-8 mb-6 border-2 border-primary-light-grey border-opacity-50 rounded-xl">
					<IconTag size={32} />
					<p className="mt-4 font-bold">Set Nickname</p>
					<p className="mt-1 text-justify">
						Change the name of another {`user's`} address with the name you
						want.
					</p>
				</div>
				<div className="p-8 mb-6 border-2 border-primary-light-grey border-opacity-50 rounded-xl">
					<IconMoon size={32} />
					<p className="mt-4 font-bold">Dark Mode</p>
					<p className="mt-1 text-justify">
						Treat your eyes with the dark mode feature.
					</p>
				</div>
				<div className="p-8 mb-6 border-2 border-primary-light-grey border-opacity-50 rounded-xl">
					<IconPicture size={32} />
					<p className="mt-4 font-bold">Send Pictures</p>
					<p className="mt-1 text-justify">
						Share image with other {`user's`} address to easily get what you
						need to whom you want.
					</p>
				</div>
				<div className="p-8 mb-6 border-2 border-primary-light-grey border-opacity-50 rounded-xl">
					<IconPuzzle size={32} />
					<p className="mt-4 font-bold">
						Browser Extension{' '}
						<span className="border-2 border-primary-black rounded-md text-[10px] text-semibold px-1 py-0.5 ml-1">
							Upcoming
						</span>
					</p>
					<p className="mt-1 text-justify">
						Send messages in any tab that makes you more productive.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Feature
