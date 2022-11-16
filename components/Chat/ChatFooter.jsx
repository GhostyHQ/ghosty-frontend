import { useRef, useState } from 'react'
import clsx from 'clsx'
import {
	Popover,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
	useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react'

import { IconEmoticon, IconPictureSolid, IconSend } from '../Icon'
import useStore from '../../lib/store'
import { API_URL } from '../../constants/apiUrl'
import near from '../../lib/near'

const ChatFooter = ({ initEmoji, fetchingMessages }) => {
	const [message, setMessage] = useState('')
	const [rowMessage, setRowMessage] = useState(1)

	const ref = useRef(null)
	const { isOpen, onToggle, onClose } = useDisclosure()
	const currentUser = useStore((state) => state.userProfile)
	const currentChat = useStore((state) => state.currentChat)

	const onEmojiClick = (emojiObject) => {
		const cursor = ref.current.selectionStart
		const text =
			message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor)
		setMessage(text)
	}

	const sendMessage = async () => {
		const messageData = {
			senderId: currentUser.accountId,
			receiverId: currentChat.accountId,
			message: message,
		}

		try {
			await axios.post(`${API_URL}/api/send-message`, messageData, {
				headers: { authorization: await near.authToken() },
			})
			fetchingMessages()
		} catch (error) {
			console.log(error)
		}
	}

	const onChangeMessage = (value) => {
		setMessage(value)
		if (value === '') setRowMessage(1)
	}

	const onKeyPress = (e) => {
		if (e.keyCode === 13 && !e.shiftKey && message.length > 0) sendMessage()
		if (e.keyCode === 13 && e.shiftKey && rowMessage <= 4) {
			e.preventDefault()

			let start = e.target.selectionStart
			let end = e.target.selectionEnd

			setMessage(message.substring(0, start) + '\n' + message.substring(end))
			start = end = start + 1
			setRowMessage(rowMessage + 1)
		} else if (e.keyCode === 13) {
			e.preventDefault()

			let start = e.target.selectionStart
			let end = e.target.selectionEnd

			if (rowMessage >= 4) {
				setMessage(message.substring(0, start) + '\n' + message.substring(end))
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
					{(!initEmoji || isOpen) && (
						<PopoverContent
							color="white"
							bg="primary.light_grey_2"
							borderColor="primary.light_grey_2"
							position="relative"
							width="100%"
						>
							<PopoverArrow bg="primary.light_grey_2" />
							<div>
								<EmojiPicker
									onEmojiClick={(e, emoji) => onEmojiClick(e, emoji)}
								/>
							</div>
						</PopoverContent>
					)}
				</Popover>
				<textarea
					id="text"
					type="text"
					ref={ref}
					className={clsx(
						'w-full py-2 pl-4 border-[1px] overflow-y-scroll focus:outline-none',
						rowMessage === 1 && 'rounded-full',
						rowMessage > 1 && 'rounded-xl'
					)}
					rows={rowMessage}
					placeholder="Aa"
					style={{ WebkitAppearance: 'none', resize: 'none' }}
					value={message}
					onChange={(e) => onChangeMessage(e.target.value)}
					onKeyDown={onKeyPress}
				/>
				<div
					className="p-2 cursor-pointer hover:bg-primary-light-grey-200 rounded-full transition duration-200"
					onClick={sendMessage}
				>
					<IconSend size={30} color="#3F4246" />
				</div>
			</div>
		</div>
	)
}

export default ChatFooter
