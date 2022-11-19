import { generateFromString } from 'generate-avatar'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from '@chakra-ui/react'

import { prettyTruncate } from '../../utils/common'
import { IconBlocked, IconLeft, IconTag } from '../Icon'
import useStore from '../../lib/store'
import { Fragment } from 'react'

const ChatInfo = ({ activeUsers }) => {
	const currChat = useStore((state) => state.currentChat)
	const messages = useStore((state) => state.messages)
	const userProfile = useStore((state) => state.userProfile)
	const setIsChatInfoMobile = useStore((state) => state.setIsChatInfoMobile)

	const hasMedia = messages?.some(
		(msg) =>
			msg.message.image !== '' &&
			(msg.senderId === userProfile.accountId ||
				msg.receiverId === userProfile.accountId)
	)

	return (
		<div>
			<div
				className="block lg:hidden m-4 cursor-pointer"
				onClick={() => setIsChatInfoMobile(false)}
			>
				<IconLeft size={20} />
			</div>
			<div className="mt-10 flex justify-center">
				<img
					className="w-24 rounded-full"
					src={`data:image/svg+xml;utf8,${generateFromString(
						`${currChat.accountChatList}`
					)}`}
				/>
			</div>
			<p className="mt-4 text-center font-semibold hover:underline">
				<a
					href={`https://testnet.nearblocks.io/address/${currChat.accountChatList}`}
					target="_blank"
					rel="noreferrer"
				>
					{prettyTruncate(currChat.accountChatList, 24, 'address')}
				</a>
			</p>
			{activeUsers?.some((u) => u.currentUser === currChat.accountChatList) && (
				<p className="text-xs text-center text-green-500">Online</p>
			)}
			<Accordion allowToggle className="mt-8">
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" className="font-semibold">
								Customize Chat
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary-light-grey-200 transition duration-200">
							<IconTag size={18} />
							<p>Set Nickname</p>
						</div>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" className="font-semibold">
								Media
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<div className="grid grid-cols-2 place-items-center gap-2 overflow-y-scroll h-80">
							{hasMedia ? (
								messages?.map((msg, idx) => (
									<Fragment key={idx}>
										{msg.message.image && (
											<a
												href={`https://paras-cdn.imgix.net/${msg.message.image}?width=800`}
												target="_blank"
												rel="noreferrer"
											>
												<img
													className="p-2 rounded-md cursor-pointer hover:bg-primary-light-grey-200 transition duration-200"
													src={`https://paras-cdn.imgix.net/${msg.message.image}?width=800`}
													width={100}
												/>
											</a>
										)}
									</Fragment>
								))
							) : (
								<div className="col-span-2 mt-10">
									<img
										className="w-60 mx-auto"
										src={'/assets/peeps-2.png'}
										alt="empty media"
									/>
									<p className="mt-4 text-center text-xl">Has No Media</p>
								</div>
							)}
						</div>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" className="font-semibold">
								Privacy & Support
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary-light-grey-200 transition duration-200">
							<IconBlocked size={18} />
							<p>Block Address</p>
						</div>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

export default ChatInfo
