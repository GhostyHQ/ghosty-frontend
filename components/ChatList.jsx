import { Spinner } from '@chakra-ui/react'
import { generateFromString } from 'generate-avatar'
import { prettyTruncate } from '../utils/common'

const ChatList = ({ isValidating, data }) => {
	if (isValidating) {
		return (
			<div className="flex justify-center mt-20">
				<Spinner />
			</div>
		)
	}
	return (
		<>
			{data?.chatList?.map((user, idx) => (
				<div
					key={idx}
					className="p-4 cursor-pointer hover:bg-primary-light-grey-200 transition duration-200"
				>
					<div className="flex items-center gap-2">
						<div className="relative">
							<img
								className="relative w-10 rounded-full"
								src={`data:image/svg+xml;utf8,${generateFromString(
									user.accountId
								)}`}
							/>
							<div className="absolute inset-y-7 right-0 w-3 h-3 rounded-full bg-green-500" />
						</div>
						<div>
							<p className="font-semibold">
								{prettyTruncate(user.accountId, 20, 'address')}
							</p>
							<p className="text-xs">{'New Chat 👻'}</p>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default ChatList
