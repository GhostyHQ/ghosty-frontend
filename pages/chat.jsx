import { useState } from 'react'

import ChatInfo from '../components/Chat/ChatInfo'
import LeftSide from '../components/ChatRoom/LeftSide'
import MiddleSide from '../components/ChatRoom/MiddleSide'

const Chat = ({ initEmoji }) => {
	const [toggleUserInfo, setToggleUserInfo] = useState(true)

	return (
		<div className="grid grid-cols-5 h-[100vh]">
			<LeftSide className="relative border-r-[1px]" />
			<MiddleSide
				className="relative col-span-3 border-r-[1px]"
				initEmoji={initEmoji}
				isToggleAddressInfo={(e) => setToggleUserInfo(e)}
			/>
			{toggleUserInfo && <ChatInfo />}
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
