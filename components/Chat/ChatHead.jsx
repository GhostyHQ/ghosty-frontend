import { generateFromString } from 'generate-avatar'
import useStore from '../../lib/store'

import { prettyTruncate } from '../../utils/common'
import { IconEllipsis, IconLeft } from '../Icon'

const ChatHead = ({ activeUsers, setToggleUserInfo }) => {
	const store = useStore()
	const currChat = useStore((state) => state.currentChat)

	return (
		<div className="absolute inset-x-0 flex justify-between items-center p-4 bg-white border-b-[1px]">
			<div className="flex items-center gap-2">
				<div
					className="block md:hidden mr-4"
					onClick={() => store.setIsChatRoomMobile(false)}
				>
					<IconLeft size={20} />
				</div>
				<img
					className="w-8 rounded-full"
					src={`data:image/svg+xml;utf8,${generateFromString(
						`${currChat.accountChatList}`
					)}`}
				/>
				<div>
					<p className="font-semibold">
						{prettyTruncate(currChat.accountChatList, 30, 'address')}
					</p>
					{activeUsers.some(
						(u) => u.currentUser === currChat.accountChatList
					) && <p className="text-xs text-green-500">Online</p>}
				</div>
			</div>
			<div
				className="p-2 rotate-90 bg-primary-light-grey bg-opacity-20 rounded-full cursor-pointer hover:bg-opacity-10 transition duration-200"
				onClick={setToggleUserInfo}
			>
				<IconEllipsis size={16} />
			</div>
		</div>
	)
}

export default ChatHead
