import axios from 'axios'
import { useState } from 'react'

import ChatInfo from '../../components/Chat/ChatInfo'
import LeftSide from '../../components/ChatRoom/LeftSide'
import MiddleSide from '../../components/ChatRoom/MiddleSide'
import { API_URL } from '../../constants/apiUrl'

const Chat = ({ initEmoji, userProfile, currentUser }) => {
	const [toggleUserInfo, setToggleUserInfo] = useState(true)

	return (
		<div className="grid grid-cols-5 h-[100vh]">
			<LeftSide
				userProfile={userProfile}
				currentUser={currentUser}
				className="relative border-r-[1px]"
			/>
			<MiddleSide
				currentUser={currentUser}
				className="relative col-span-3 border-r-[1px]"
				initEmoji={initEmoji}
				isToggleAddressInfo={(e) => setToggleUserInfo(e)}
			/>
			{toggleUserInfo && <ChatInfo />}
		</div>
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
