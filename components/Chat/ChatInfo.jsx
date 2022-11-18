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
import { IconBlocked, IconTag } from '../Icon'
import useStore from '../../lib/store'

const ChatInfo = ({ activeUsers }) => {
	const currChat = useStore((state) => state.currentChat)

	return (
		<div>
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
						<div className="grid grid-cols-2 gap-2 overflow-y-scroll h-80">
							{Array(20)
								.fill()
								.map((_, idx) => (
									<img
										key={idx}
										className="p-2 rounded-md cursor-pointer hover:bg-primary-light-grey-200 transition duration-200"
										src="/assets/indomie.png"
										width={100}
									/>
								))}
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
