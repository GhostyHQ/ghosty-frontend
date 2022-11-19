import { Drawer, DrawerContent, DrawerOverlay, Show } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSWRConfig } from 'swr'

import ChatInfo from '../../components/Chat/ChatInfo'
import LeftSide from '../../components/ChatRoom/LeftSide'
import MiddleSide from '../../components/ChatRoom/MiddleSide'
import { API_URL } from '../../constants/apiUrl'
import useStore from '../../lib/store'

const Chat = ({ initEmoji, userProfile, currentUser }) => {
	const [toggleUserInfo, setToggleUserInfo] = useState(true)
	const [activeUsers, setActiveUsers] = useState()
	const [progress, setProgress] = useState('')
	const { mutate } = useSWRConfig()

	const store = useStore()

	const isChatRoomMobile = useStore((state) => state.isChatRoomMobile)
	const isChatInfoMobile = useStore((state) => state.isChatInfoMobile)
	const isChatInfo = useStore((state) => state.isChatInfo)

	const setLastMessageSocket = useStore((state) => state.setLastMessageSocket)
	const setMessageSocket = useStore((state) => state.setMessageSocket)
	const setDeliveredSocket = useStore((state) => state.setDeliveredSocket)
	const setSeenSocket = useStore((state) => state.setSeenSocket)

	const socket = io('http://localhost:8000')

	useEffect(() => {
		socket.emit('addUser', currentUser, userProfile)

		socket.on('getUser', (users) => {
			setActiveUsers(users)
		})
	}, [])

	useEffect(() => {
		socket.on('getTypingMessage', (data) => {
			setLastMessageSocket(data)
		})
	}, [])

	useEffect(() => {
		socket.on('getMessageSender', (data) => {
			setMessageSocket(data)
		})
	}, [])

	useEffect(() => {
		socket.on('getMessageReceiver', (data) => {
			setMessageSocket(data)
		})
	}, [])

	useEffect(() => {
		socket.on('getDeliveredSender', (data) => {
			setDeliveredSocket(data)
			mutate(currentUser, true)
		})
	}, [])

	useEffect(() => {
		socket.on('getDeliveredReceiver', (data) => {
			setDeliveredSocket(data)
			mutate(currentUser, true)
		})
	}, [])

	useEffect(() => {
		socket.on('getSeenReceiver', (data) => {
			setSeenSocket(data)
			setDeliveredSocket({})
		})
	}, [])

	useEffect(() => {
		socket.on('getSeenSender', (data) => {
			setSeenSocket(data)
			setDeliveredSocket({})
		})
	}, [])

	return (
		<>
			<div className="lg:grid grid-cols-10 xl:grid-cols-12 h-[100vh]">
				<LeftSide
					socket={socket}
					userProfile={userProfile}
					currentUser={currentUser}
					activeUsers={activeUsers}
					className="relative col-span-3 xl:col-span-3 border-r-[1px]"
				/>
				<Show above="lg">
					<MiddleSide
						socket={socket}
						currentUser={currentUser}
						activeUsers={activeUsers}
						className="relative col-span-5 xl:col-span-7 border-r-[1px]"
						initEmoji={initEmoji}
						isToggleAddressInfo={(e) => setToggleUserInfo(e)}
						setProgressProps={(e) => setProgress(e)}
					/>
					{isChatInfo === false && progress !== 'default' && (
						<ChatInfo activeUsers={activeUsers} />
					)}
				</Show>
				<Show below="lg">
					<Drawer
						onClose={() => store.setIsChatRoomMobile(false)}
						isOpen={isChatRoomMobile}
						size="full"
					>
						<DrawerOverlay />
						<DrawerContent>
							<MiddleSide
								socket={socket}
								currentUser={currentUser}
								activeUsers={activeUsers}
								className="relative col-span-3 border-r-[1px]"
								initEmoji={initEmoji}
								isToggleAddressInfo={(e) => setToggleUserInfo(e)}
							/>
						</DrawerContent>
					</Drawer>
				</Show>
				<Show below="lg">
					<Drawer
						placement="bottom"
						onClose={() => store.setIsChatInfoMobile(false)}
						isOpen={isChatInfoMobile}
						size="full"
					>
						<DrawerOverlay />
						<DrawerContent>
							{toggleUserInfo && <ChatInfo activeUsers={activeUsers} />}
						</DrawerContent>
					</Drawer>
				</Show>
			</div>
		</>
	)
}

export default Chat

export async function getServerSideProps({ params }) {
	const res = await axios.get(`${API_URL}/api/profile`, {
		params: {
			accountId: params.id,
		},
	})

	const userProfile = (await res.data.data) || null
	const currentUser = params.id

	return {
		props: {
			userProfile: userProfile,
			currentUser: currentUser,
			// error handling on emoji height
			initEmoji: true,
		},
	}
}
