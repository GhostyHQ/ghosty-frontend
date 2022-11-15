import { useState } from 'react'
import clsx from 'clsx'
import { Popover, PopoverTrigger, useDisclosure } from '@chakra-ui/react'

import Emoji from '../Emoji'
import { IconEmoticon, IconPictureSolid, IconSend } from '../Icon'

const ChatFooter = ({ initEmoji }) => {
	const [messages, setMessages] = useState('')
	const [rowMessage, setRowMessage] = useState(1)

	const { isOpen, onToggle, onClose } = useDisclosure()

	const onChangeMessage = (value) => {
		setMessages(value)
		if (value === '') setRowMessage(1)
	}

	const onKeyPress = (e) => {
		if (e.keyCode === 13 && e.shiftKey && rowMessage <= 4) {
			e.preventDefault()

			let start = e.target.selectionStart
			let end = e.target.selectionEnd

			setMessages(messages.substring(0, start) + '\n' + messages.substring(end))
			start = end = start + 1
			setRowMessage(rowMessage + 1)
		} else if (e.keyCode === 13) {
			e.preventDefault()

			let start = e.target.selectionStart
			let end = e.target.selectionEnd

			if (rowMessage >= 4) {
				setMessages(
					messages.substring(0, start) + '\n' + messages.substring(end)
				)
				start = end = start + 1
			}
		}
	}
	return (
		<div className="absolute inset-x-0 bottom-0 bg-white z-50 pt-4 mx-4">
			<div className="flex items-center gap-1 mb-4">
				<div className="p-2 cursor-pointer hover:bg-primary-light-grey-200 rounded-full transition duration-200">
					<IconPictureSolid size={30} color="#3F4246" />
				</div>
				<Popover placement="top" isOpen={isOpen} onClose={onClose}>
					<PopoverTrigger>
						<div
							className="p-2 cursor-pointer hover:bg-primary-light-grey-200 rounded-full transition duration-200"
							onClick={onToggle}
						>
							<IconEmoticon size={30} color="#3F4246" />
						</div>
					</PopoverTrigger>
					<Emoji init={initEmoji} isOpen={isOpen} />
				</Popover>
				<textarea
					type="text"
					className={clsx(
						'w-full py-2 pl-4 border-[1px] overflow-y-scroll focus:outline-none',
						rowMessage === 1 && 'rounded-full',
						rowMessage > 1 && 'rounded-xl'
					)}
					rows={rowMessage}
					placeholder="Aa"
					style={{ WebkitAppearance: 'none', resize: 'none' }}
					value={messages}
					onChange={(e) => onChangeMessage(e.target.value)}
					onKeyDown={onKeyPress}
				/>
				<div className="p-2 cursor-pointer hover:bg-primary-light-grey-200 rounded-full transition duration-200">
					<IconSend size={30} color="#3F4246" />
				</div>
			</div>
		</div>
	)
}

export default ChatFooter
