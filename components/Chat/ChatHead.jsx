import { generateFromString } from 'generate-avatar'
import useStore from '../../lib/store'

import { prettyTruncate } from '../../utils/common'
import { IconEllipsis } from '../Icon'

const ChatHead = ({ activeUsers, setToggleUserInfo }) => {
	const currChat = useStore((state) => state.currentChat)

	return (
		<div className="absolute inset-x-0 flex justify-between items-center p-4 bg-white border-b-[1px]">
			<div className="flex items-center gap-2">
				<img
					className="w-8 rounded-full"
					src={`data:image/svg+xml;utf8,${generateFromString(
						`${currChat.accountId}`
					)}`}
				/>
				<div>
					<p className="font-semibold">
						{prettyTruncate(currChat.accountId, 30, 'address')}
					</p>
					{activeUsers.some((u) => u.currentUser === currChat.accountId) && (
						<p className="text-xs text-green-500">Online</p>
					)}
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
