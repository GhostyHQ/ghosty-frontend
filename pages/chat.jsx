import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from '@chakra-ui/react'
import { generateFromString } from 'generate-avatar'

import LeftSide from '../components/ChatRoom/LeftSide'
import MiddleSide from '../components/ChatRoom/MiddleSide'
import { IconBlocked, IconTag } from '../components/Icon'
import { prettyTruncate } from '../utils/common'

const Chat = ({ initEmoji }) => {
	return (
		<div className="grid grid-cols-5 h-[100vh]">
			<LeftSide className="relative border-r-[1px]" />
			<MiddleSide
				className="relative col-span-3 border-r-[1px]"
				initEmoji={initEmoji}
			/>
			<div>
				<div className="mt-10 flex justify-center">
					<img
						className="w-24 rounded-full"
						src={`data:image/svg+xml;utf8,${generateFromString(
							'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d'
						)}`}
					/>
				</div>
				<p className="mt-4 text-center font-semibold">
					{prettyTruncate(
						'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d',
						24,
						'address'
					)}
				</p>
				<p className="text-xs text-center text-green-500">Active Now</p>
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
		</div>
	)
}

export default Chat

export function getServerSideProps() {
	return {
		props: {
			// error handling on emoji height
			initEmoji: true,
		},
	}
}
