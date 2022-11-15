import { Spinner } from '@chakra-ui/react'
import clsx from 'clsx'
import { generateFromString } from 'generate-avatar'
import { useEffect } from 'react'
import useStore from '../lib/store'
import { prettyTruncate } from '../utils/common'

const ChatList = ({ isValidating, data }) => {
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
			{data?.chatList?.map((user, idx) => (
				<div
					key={idx}
					className={clsx(
						'p-4 cursor-pointer hover:bg-primary-light-grey-200 transition duration-200',
						store.currentChat.accountId === user.accountId &&
							'bg-primary-light-grey-200'
					)}
					onClick={() => updateCurrChat(user)}
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
