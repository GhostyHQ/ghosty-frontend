import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import clsx from 'clsx'
import { generateFromString } from 'generate-avatar'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'

import { API_URL } from '../constants/apiUrl'
import near from '../lib/near'
import useStore from '../lib/store'
import { prettyTruncate } from '../utils/common'
import { IconCheck } from './Icon'
import _ from 'lodash'

const ChatList = ({
	socket,
	currentUser,
	isValidating,
	data,
	activeUsers,
	filteredUsers,
}) => {
	const [lastMessage, setLastMessage] = useState([])
	const [lastTime, setLastTime] = useState([])

	const store = useStore()
	const { mutate } = useSWRConfig()

	const messageSocket = useStore((state) => state.messageSocket)
	const messageSocketCurrentUser = useStore(
		(state) => state.messageSocketCurrentUser
	)
	const seenSocket = useStore((state) => state.seenSocket)

	useEffect(() => {
		if (localStorage['currChat']) {
			const localCurrChat = JSON.parse(localStorage.getItem('currChat'))
			if (localCurrChat) {
				store.setCurrentChat(localCurrChat)
			}
		}
	}, [])

	useEffect(() => {
		if (!isValidating) {
			const isLastMessage = data?.some((user) => {
				return (
					(messageSocketCurrentUser?.senderId === currentUser &&
						messageSocketCurrentUser?.receiverId === user.accountChatList) ||
					(messageSocketCurrentUser?.receiverId === currentUser &&
						messageSocketCurrentUser?.senderId === user.accountChatList)
				)
			})
			if (isLastMessage) {
				setLastMessage(messageSocketCurrentUser)
				setLastTime(messageSocketCurrentUser)
			}
			// mutate(currentUser, true)
		}
	}, [messageSocketCurrentUser])

	useEffect(() => {
		if (!isValidating) {
			const isLastMessage = data?.some((user) => {
				return (
					(messageSocket?.senderId === currentUser &&
						messageSocket?.receiverId === user.accountChatList) ||
					(messageSocket?.receiverId === currentUser &&
						messageSocket?.senderId === user.accountChatList)
				)
			})
			if (isLastMessage) {
				setLastMessage(messageSocket)
				setLastTime(messageSocket)
			}
			// mutate(currentUser, true)
		}
	}, [messageSocket])

	const updateCurrChat = (user) => {
		if (
			user?.lastMessage?.[0]?.receiverId === currentUser &&
			user?.lastMessage?.[0]?.status !== 'seen'
		) {
			sendSeenMessage(user)
		}

		localStorage.setItem('currChat', JSON.stringify(user))
		store.setCurrentChat(user)
		store.setIsChatRoomMobile(true)
	}

	const sendSeenMessage = async (user) => {
		const data = {
			_id: user?.lastMessage?.[0]?._id,
		}

		try {
			const res = await axios.post(`${API_URL}/api/seen-message`, data, {
				headers: {
					'Content-Type': 'application/json',
					authorization: await near.authToken(),
				},
			})
			socket.emit('seenMessage', res.data.data)
			mutate(currentUser, true)
		} catch (error) {
			console.log(error)
		}
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
			{_.map(filteredUsers, (user, idx) => (
				<div
					key={idx}
					className={clsx(
						'p-4 cursor-pointer hover:bg-primary-light-grey-200 transition duration-200',
						store.currentChat.accountChatList === user.accountChatList &&
							'bg-primary-light-grey-200'
					)}
					onClick={() => updateCurrChat(user)}
				>
					<div className="flex items-start gap-2">
						<div className="relative flex-shrink-0 w-12">
							<img
								className="relative rounded-full"
								src={`data:image/svg+xml;utf8,${generateFromString(
									user.accountChatList
								)}`}
							/>
							{activeUsers?.some(
								(u) => u.currentUser === user.accountChatList
							) && (
								<div className="absolute inset-y-7 right-0 w-4 h-4 rounded-full bg-green-500" />
							)}
						</div>
						<div className="text-sm w-full">
							<div className="flex justify-between items-center gap-2 whitespace-nowrap">
								<p className="text-base font-semibold">
									{prettyTruncate(
										user.alias || user.accountChatList,
										15,
										'address'
									)}
								</p>
								<p className="text-xs">
									{(messageSocket?.senderId === currentUser &&
										messageSocket?.receiverId === user.accountChatList) ||
									(messageSocket?.receiverId === currentUser &&
										messageSocket?.senderId === user.accountChatList) ||
									(messageSocketCurrentUser?.senderId === currentUser &&
										messageSocketCurrentUser?.receiverId ===
											user.accountChatList) ||
									(messageSocketCurrentUser?.receiverId === currentUser &&
										messageSocketCurrentUser?.senderId === user.accountChatList)
										? moment(lastTime?.createAt).startOf('minute').fromNow()
										: moment(user?.lastMessage?.[0]?.createdAt)
												.startOf('minute')
												.fromNow()}
								</p>
							</div>
							<div className="flex justify-between items-center gap-2 whitespace-nowrap">
								<div>
									{user.lastMessage[0] && user.lastMessage[0].message?.text ? (
										<span>
											{(messageSocket?.senderId === currentUser &&
												messageSocket?.receiverId === user.accountChatList) ||
											(messageSocket?.receiverId === currentUser &&
												messageSocket?.senderId === user.accountChatList) ||
											(messageSocketCurrentUser?.senderId === currentUser &&
												messageSocketCurrentUser?.receiverId ===
													user.accountChatList) ||
											(messageSocketCurrentUser?.receiverId === currentUser &&
												messageSocketCurrentUser?.senderId ===
													user.accountChatList)
												? prettyTruncate(lastMessage?.message?.text, 30)
												: prettyTruncate(user.lastMessage[0].message.text, 30)}
										</span>
									) : user.lastMessage[0] &&
									  user.lastMessage[0].message?.image ? (
										<span>Send a image</span>
									) : (
										<span>New Chat 👻</span>
									)}
								</div>
								<div>
									{user?.lastMessage?.[0]?.senderId === currentUser &&
									user?.lastMessage?.[0]?.receiverId ===
										user.accountChatList ? (
										<span>
											{user?.lastMessage[0]?.status === 'delivered' ? (
												seenSocket?.status ? (
													<IconCheck size={16} color="green" />
												) : (
													<IconCheck size={16} />
												)
											) : user?.lastMessage[0]?.status === 'seen' ? (
												<IconCheck size={16} color="green" />
											) : (
												<IconCheck size={16} />
											)}
										</span>
									) : user?.lastMessage?.[0]?.senderId ===
											user.accountChatList &&
									  user?.lastMessage?.[0]?.receiverId === currentUser ? (
										<span>
											{user?.lastMessage[0]?.status === 'delivered' && (
												<div className="w-2.5 h-2.5 rounded-full bg-primary-blue"></div>
											)}
										</span>
									) : (
										<span>
											{user?.lastMessage[0]?.status === 'unseen' ? (
												<IconCheck size={16} />
											) : user?.lastMessage[0]?.status === 'seen' ? (
												<IconCheck size={16} color="green" />
											) : user?.lastMessage[0]?.status === 'delivered' ? (
												<div className="w-2.5 h-2.5 rounded-full bg-primary-blue"></div>
											) : (
												<></>
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
