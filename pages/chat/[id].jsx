import { Drawer, DrawerContent, DrawerOverlay, Show } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import ChatInfo from '../../components/Chat/ChatInfo'
import LeftSide from '../../components/ChatRoom/LeftSide'
import MiddleSide from '../../components/ChatRoom/MiddleSide'
import { API_URL } from '../../constants/apiUrl'
import useStore from '../../lib/store'

const Chat = ({ initEmoji, userProfile, currentUser }) => {
	const [toggleUserInfo, setToggleUserInfo] = useState(true)
	const [activeUsers, setActiveUsers] = useState()
	const [lastMessageChatList, setLastMessageChatList] = useState()
	const [lastMessageCurrentUser, setLastMessageCurrentUser] = useState()

	const store = useStore()
	const isChatRoomMobile = useStore((state) => state.isChatRoomMobile)
	const isChatInfoMobile = useStore((state) => state.isChatInfoMobile)
	const isChatInfo = useStore((state) => state.isChatInfo)

	const socket = io('http://localhost:8000')

	useEffect(() => {
		socket.emit('addUser', currentUser, userProfile)

		socket.on('getUser', (users) => {
			setActiveUsers(users)
		})
	}, [])

	return (
		<>
			<div className="lg:grid grid-cols-6 xl:grid-cols-5 h-[100vh]">
				<LeftSide
					userProfile={userProfile}
					currentUser={currentUser}
					activeUsers={activeUsers}
					className="relative col-span-2 xl:col-span-1 border-r-[1px]"
					setLastMessageChatList={lastMessageChatList}
					setLastMessageCurrentUser={lastMessageCurrentUser}
				/>
				<Show above="lg">
					<MiddleSide
						socket={socket}
						currentUser={currentUser}
						activeUsers={activeUsers}
						className="relative col-span-3 xl:col-span-3 border-r-[1px]"
						initEmoji={initEmoji}
						isToggleAddressInfo={(e) => setToggleUserInfo(e)}
						setLastMessageChatList={(e) => setLastMessageChatList(e)}
						setLastMessageCurrentUser={(e) => setLastMessageCurrentUser(e)}
					/>
					{isChatInfo === false && <ChatInfo activeUsers={activeUsers} />}
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
								setLastMessageChatList={(e) => setLastMessageChatList(e)}
								setLastMessageCurrentUser={(e) => setLastMessageCurrentUser(e)}
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
