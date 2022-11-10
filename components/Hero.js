import Image from 'next/image'
import clsx from 'clsx'
import { generateFromString } from 'generate-avatar'

import { chatHero } from '../data/chatHero'
import { prettyTruncate } from '../utils/common'

const Hero = () => {
	return (
		<div className="mt-20 lg:grid grid-cols-5 gap-10">
			<div className="relative col-span-3">
				<div className="lg:h-[420px] text-center lg:text-left">
					<h1 className="hidden lg:block text-5xl font-bold">
						Welcome to Ghosty
					</h1>
					<h1 className="lg:hidden text-3xl font-semibold">Ghosty</h1>
					<p className="text-xl lg:text-2xl mt-4 leading-relaxed">
						A messaging platform for NEAR users to simply and instantly
						messaging across wallet-to-wallet on the NEAR network.
					</p>
				</div>
				<div className="lg:absolute -bottom-20 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-ml-20 mb-10 lg:mb-0">
					<div className="lg:w-[500px]">
						<Image
							src={'/assets/peeps.png'}
							width={640}
							height={640}
							alt="hero"
						/>
					</div>
				</div>
			</div>
			<div className="relative col-span-2">
				<div className="lg:absolute shadow-2xl rounded-b-xl">
					<div className="grid grid-cols-5 md:grid-cols-5 rounded-t-xl bg-primary-light-grey px-4 py-2">
						<div className="flex items-center gap-1">
							<div className="bg-primary-red w-3 h-3 rounded-full"></div>
							<div className="bg-primary-yellow w-3 h-3 rounded-full"></div>
							<div className="bg-primary-green w-3 h-3 rounded-full"></div>
						</div>
						<div className="col-span-4 mr-12 text-sm text-center rounded-sm text-white bg-primary-dark-grey bg-opacity-40">
							Chat
						</div>
					</div>
					<div className="p-4 overflow-y-scroll scrollbar scrollbar-start-bottom bg-white rounded-b-xl">
						{chatHero.map((user) => (
							<ChatBubble
								key={user.id}
								accountId={user.accountId}
								date={user.date}
								message={user.message}
							/>
						))}
						<p className="text-center text-sm">no new messages to load</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero

const ChatBubble = ({ accountId, date, message }) => {
	return (
		<div
			className={clsx(
				'grid grid-flow-col col-span-2 gap-2 mt-4',
				accountId === 'You' ? 'justify-end' : 'justify-start'
			)}
		>
			<div
				className={clsx(
					'flex flex-col justify-end',
					accountId === 'You' && 'order-2'
				)}
			>
				<Image
					className={clsx(accountId !== 'Ghosty' && 'rounded-full')}
					src={
						accountId === 'Ghosty'
							? '/assets/ghosty-icon-black.png'
							: `data:image/svg+xml;utf8,${generateFromString(accountId)}`
					}
					width={25}
					height={25}
					alt="user"
				/>
			</div>
			<div
				className={clsx(
					'px-2 py-1 rounded-xl bg-opacity-20',
					accountId === 'You' ? 'bg-primary-blue' : 'bg-primary-light-grey'
				)}
			>
				<a href="https://explorer.near.org" target="_blank" rel="noreferrer">
					<p className="text-xs text-primary-dark-grey text-opacity-80">
						<span className="cursor-pointer hover:text-primary-blue">
							{prettyTruncate(accountId, 9, 'address')}
						</span>{' '}
					</p>
				</a>
				<p className="text-sm font-medium text-justify">{message}</p>
				<p className="pl-14 text-right text-xs text-primary-dark-grey text-opacity-80">
					{date}
				</p>
			</div>
		</div>
	)
}
