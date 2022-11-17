import { Spinner } from '@chakra-ui/react'
import clsx from 'clsx'
import { generateFromString } from 'generate-avatar'
import moment from 'moment'
import { useEffect } from 'react'
import useStore from '../lib/store'
import { prettyTruncate } from '../utils/common'
import { IconCheck } from './Icon'

const ChatList = ({ currentUser, isValidating, data, activeUsers }) => {
	const store = useStore()

	useEffect(() => {
		if (localStorage['currChat']) {
			const localCurrChat = JSON.parse(localStorage.getItem('currChat'))
			if (localCurrChat) {
				store.setCurrentChat(localCurrChat)
			}
		}
	}, [])

	const updateCurrChat = (data) => {
		localStorage.setItem('currChat', JSON.stringify(data))
		store.setCurrentChat(data)
	}

	if (isValidating) {
		return (
			<div className="flex justify-center mt-20">
				<Spinner />
			</div>
		)
	}

	return (
		<>
			{data?.map((user, idx) => (
				<div
					key={idx}
					className={clsx(
						'p-4 cursor-pointer hover:bg-primary-light-grey-200 transition duration-200',
						store.currentChat.accountId === user.accountChatList &&
							'bg-primary-light-grey-200'
					)}
					onClick={() => updateCurrChat(user)}
				>
					<div className="flex items-start gap-2">
						<div className="flex-shrink-0 w-12">
							<img
								className="relative rounded-full"
								src={`data:image/svg+xml;utf8,${generateFromString(
									user.accountChatList
								)}`}
							/>
							{activeUsers?.some(
								(u) => u.currentUser === user.accountChatList
							) && (
								<div className="absolute inset-y-7 right-0 w-3 h-3 rounded-full bg-green-500" />
							)}
						</div>
						<div className="text-sm w-full">
							<div className="flex justify-between items-center gap-2 whitespace-nowrap">
								<p className="text-base font-semibold">
									{prettyTruncate(user.accountChatList, 12, 'address')}
								</p>
								<p className="text-xs">
									{user.lastMessage &&
										moment(user.lastMessage.createdAt)
											.startOf('minute')
											.fromNow()}
								</p>
							</div>
							<div className="flex justify-between items-center gap-2 whitespace-nowrap">
								<div>
									{user.lastMessage && user.lastMessage.message.text ? (
										<span>
											{prettyTruncate(user.lastMessage.message.text, 22)}
										</span>
									) : user.lastMessage && user.lastMessage.message.image ? (
										<span>Send a image</span>
									) : (
										<span>New Chat 👻</span>
									)}
								</div>
								<div>
									{user.lastMessage &&
										user.lastMessage.senderId === currentUser && (
											<span>
												{user.lastMessage.status === 'unseen' ? (
													<IconCheck size={16} />
												) : (
													<IconCheck size={16} color="green" />
												)}
											</span>
										)}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default ChatList
