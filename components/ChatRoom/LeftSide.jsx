import Link from 'next/link'
import {
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	useDisclosure,
} from '@chakra-ui/react'
import clsx from 'clsx'

import near from '../../lib/near'
import { prettyTruncate } from '../../utils/common'
import {
	IconBlocked,
	IconEllipsis,
	IconHome,
	IconLogout,
	IconPlus,
	IconQuestion,
	IconSearch,
} from '../Icon'
import AddAddressModal from '../Modal/AddAddressModal'
import axios from 'axios'
import { API_URL } from '../../constants/apiUrl'
import useSWR from 'swr'
import ChatList from '../ChatList'
import { useEffect, useState } from 'react'
import _ from 'lodash'

const LeftSide = ({
	className,
	userProfile,
	currentUser,
	activeUsers,
	setLastMessageChatList,
	setLastMessageCurrentUser,
}) => {
	const [searchValue, setSearchValue] = useState('')
	const [filteredUsers, setFilteredUsers] = useState()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { wallet } = near

	const fetchProfile = async () => {
		const res = await axios.get(`${API_URL}/api/profile/chatlist`, {
			params: {
				accountId: userProfile.accountId,
			},
		})
		return (await res.data.data) || null
	}

	const { data, isValidating } = useSWR(userProfile.accountId, fetchProfile)

	const handleSearchFilter = (e) => {
		setSearchValue(e.target.value)
	}

	useEffect(() => {
		setFilteredUsers(data)
	})

	useEffect(() => {
		const timeout = setTimeout(() => {
			const filter = _.filter(data, (user) => {
				return _.includes(
					_.lowerCase(JSON.stringify(_.values(user))),
					_.lowerCase(searchValue)
				)
			})
			setFilteredUsers(filter)
		}, 100)
		return () => clearTimeout(timeout)
	}, [searchValue])

	const _signOut = () => {
		wallet.signOut()
		window.location.replace(`${location.protocol}//${location.host}`)
	}

	return (
		<>
			<div className={clsx(className)}>
				<div className="absolute inset-x-0 bg-white z-50">
					<div className="flex justify-between items-center mt-2">
						<div className="flex items-center gap-2 mx-6">
							<Link href="/">
								<div className="cursor-pointer">
									<IconHome />
								</div>
							</Link>
							<p className="font-semibold">
								{prettyTruncate(currentUser, 12, 'address')}
							</p>
						</div>
						<div className="flex items-center gap-1 m-3">
							<div
								className="p-2 bg-primary-light-grey bg-opacity-20 rounded-full cursor-pointer hover:bg-opacity-10 transition duration-200"
								onClick={onOpen}
							>
								<IconPlus size={16} />
							</div>
							<div className="md:relative">
								<Popover placement="bottom">
									<PopoverTrigger>
										<div className="p-2 bg-primary-light-grey bg-opacity-20 rounded-full cursor-pointer hover:bg-opacity-10 transition duration-200">
											<IconEllipsis size={16} />
										</div>
									</PopoverTrigger>
									<PopoverContent color="black" className="mx-4">
										<PopoverArrow />
										<PopoverBody boxShadow="2xl">
											<div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary-light-grey hover:bg-opacity-20 transition duration-200">
												<IconBlocked size={24} />
												<p className="text-primary-dark-grey font-semibold">
													Blocked Users
												</p>
											</div>
											<Link href="/faq">
												<div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary-light-grey hover:bg-opacity-20 transition duration-200 mb-2">
													<IconQuestion size={24} />
													<p className="text-primary-dark-grey font-semibold">
														FAQs
													</p>
												</div>
											</Link>
											<div className="border-t-[1px] border-primary-light-grey border-opacity-30 pt-2">
												<div
													className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary-light-grey hover:bg-opacity-20 transition duration-200"
													onClick={_signOut}
												>
													<IconLogout size={24} color="red" />
													<p className="font-semibold text-red-500">Logout</p>
												</div>
											</div>
										</PopoverBody>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-1 border-[1px] rounded-full p-2 mt-2 mx-4">
						<IconSearch />
						<input
							type="text"
							className="w-full focus:outline-none"
							placeholder="Search address.."
							value={searchValue}
							onChange={handleSearchFilter}
							style={{ WebkitAppearance: 'none' }}
						/>
					</div>
				</div>
				<div className="overflow-y-scroll h-[100vh] pt-32">
					{data?.chatList?.length === 0 ? (
						<div className="text-center">
							<img
								className="mx-auto"
								src="/assets/icon-person.png"
								width={150}
							/>
							<p className="text-xl font-semibold">Your chat is empty!</p>
							<p>
								Once you start a new conversation, you{`'`}ll see the address
								lists here.
							</p>
						</div>
					) : (
						<ChatList
							currentUser={currentUser}
							isValidating={isValidating}
							data={data}
							filteredUsers={filteredUsers}
							activeUsers={activeUsers}
							lastMessageChatList={setLastMessageChatList}
							lastMessageCurrentUser={setLastMessageCurrentUser}
						/>
					)}
				</div>
			</div>
			<AddAddressModal
				isOpen={isOpen}
				onClose={onClose}
				currentUser={currentUser}
			/>
		</>
	)
}

export default LeftSide
