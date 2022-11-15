import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { generateFromString } from 'generate-avatar'

import ChatHead from '../Chat/ChatHead'
import ChatFooter from '../Chat/ChatFooter'
import useStore from '../../lib/store'
import { IconExclamation, IconPlus } from '../Icon'
import { Button, Spinner, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import AddAddressModal from '../Modal/AddAddressModal'
import axios from 'axios'
import { API_URL } from '../../constants/apiUrl'

const MiddleSide = ({
	className,
	initEmoji,
	isToggleAddressInfo = () => {},
}) => {
	const [toggleUserInfo, setToggleUserInfo] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [progress, setProgress] = useState('')

	const currChatStore = useStore((state) => state.currentChat)
	const [currChat, setCurrChat] = useState(currChatStore)

	const userProfile = useStore((state) => state.userProfile)
	const { isOpen, onOpen, onClose } = useDisclosure()

	useEffect(() => {
		setProgress(true)
		const fetchChatList = async () => {
			await axios
				.get(`${API_URL}/api/profile`, {
					params: {
						accountId: userProfile.accountId,
					},
				})
				.then(async (res) => {
					const chatList = await res.data.data.chatList
					const localChatFilter = chatList.filter(
						(user) => user.accountId === currChatStore.accountId
					)

					if (localChatFilter.length !== 0) {
						localStorage.setItem('currChat', JSON.stringify(chatList[0]))
						setCurrChat(chatList[0])
						isToggleAddressInfo(true)
						setToggleUserInfo(false)
						setProgress('curr-chat')
						return
					}
					isToggleAddressInfo(false)
					setToggleUserInfo(true)
					setProgress('default')
				})
				.catch((err) => {
					console.log(err)
				})
			setIsLoading(false)
		}
		fetchChatList()
	}, [userProfile, currChatStore])

	if (isLoading) {
		return (
			<div className="h-full bg-primary-light-grey-200 p-40 text-center">
				<Spinner />
			</div>
		)
	}

	return (
		<div className={clsx(className, toggleUserInfo && 'col-span-4')}>
			{progress === 'default' && (
				<div className="h-full bg-primary-light-grey-200 p-40">
					<div
						classame="mx-auto w-[380px] bg-white p-4 rounded-2xl border-[1px] border-primary-dark-grey-200 shadow-2xl"
						style={{
							margin: 'auto',
							width: '380px',
							backgroundColor: 'white',
							padding: 16,
							borderRadius: 16,
							border: 1,
							borderColor: '#EDEDED',
							boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
						}}
					>
						<div className="flex items-center gap-1 text-2xl font-semibold">
							<p>Welcome to</p>
							<img src="/assets/logo/ghosty-logo-black.png" width={100} />
						</div>
						<p className="text-sm text-justify mt-4">
							Built for Near users, Ghosty a messaging platform for NEAR users
							to simply and instantly messaging across wallet-to-wallet on the
							NEAR network.
						</p>
						<p className="text-sm mt-4">
							Check out our{' '}
							<Link href="/faq">
								<span className="underline underline-offset-2 cursor-pointer hover:text-primary-dark-grey hover:text-opacity-80 transition duration-200">
									FAQs
								</span>{' '}
							</Link>
							for more details.
						</p>
					</div>
					<div
						className="mx-auto w-[380px] bg-white p-4 rounded-2xl border-[1px] border-primary-dark-grey-200 shadow-2xl mt-4"
						style={{
							margin: 'auto',
							width: '380px',
							backgroundColor: 'white',
							padding: 16,
							borderRadius: 16,
							border: 1,
							borderColor: '#EDEDED',
							boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
							marginTop: 16,
						}}
					>
						<div className="flex items-center gap-1 text-lg font-semibold">
							<IconExclamation color="red" />
							<p>Important!</p>
						</div>
						<p className="text-sm text-justify mt-4">
							Never share your confidential information, passwords, private keys
							or seed phrases with ANYONE! Be extra careful when receiving any
							external links or online forms.🔑
						</p>
					</div>

					<div className="flex justify-center mt-10">
						<Button
							className="hover:bg-primary-black hover:bg-opacity-80"
							variant="solid"
							colorScheme="primary.light_grey"
							color="white"
							bg="black"
							leftIcon={<IconPlus color="white" />}
							onClick={onOpen}
						>
							Start new conversation
						</Button>
					</div>
				</div>
			)}

			{progress === 'curr-chat' && (
				<>
					<ChatHead
						setToggleUserInfo={() => {
							setToggleUserInfo(!toggleUserInfo)
						}}
					/>
					<div className="overflow-y-scroll h-[100vh] pt-20 pb-24">
						{/* another address */}
						<div className="grid grid-flow-col justify-start gap-2 mt-4 ml-4 mr-80">
							<div className="flex flex-col justify-end w-6 h-6">
								<img
									className="rounded-full"
									src={`data:image/svg+xml;utf8,${generateFromString(
										'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d'
									)}`}
									alt="user"
								/>
							</div>
							<div className="p-3 rounded-xl bg-primary-light-grey bg-opacity-20">
								<p className="text-sm font-medium text-justify">Hi buddy!</p>
								<p className="mt-1 pl-14 text-right text-xs text-primary-dark-grey text-opacity-80">
									Sun 12:22 PM
								</p>
							</div>
						</div>
						<div className="grid grid-flow-col justify-start gap-2 mt-4 ml-4 mr-80">
							<div className="flex flex-col justify-end w-6 h-6">
								<img
									className="rounded-full"
									src={`data:image/svg+xml;utf8,${generateFromString(
										'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d'
									)}`}
									alt="user"
								/>
							</div>
							<div className="p-3 rounded-xl bg-primary-light-grey bg-opacity-20">
								<img src="/assets/peeps.png" width={400} />
								<p className="mt-1 pl-14 text-right text-xs text-primary-dark-grey text-opacity-80">
									Sun 12:22 PM
								</p>
							</div>
						</div>

						{/* currentUser */}
						<div className="grid grid-flow-col justify-end gap-2 mt-4 ml-80 mr-4">
							<div className="p-3 rounded-xl bg-primary-blue bg-opacity-20">
								<p className="text-sm font-medium text-justify">ya whatsup</p>
								<p className="mt-1 pl-14 text-right text-xs text-primary-dark-grey text-opacity-80">
									Sun 12:22 PM
								</p>
							</div>
						</div>

						{/* another address */}
						{Array(4)
							.fill()
							.map((_, idx) => (
								<div
									key={idx}
									className="grid grid-flow-col justify-start gap-2 mt-4 ml-4 mr-80"
								>
									<div className="flex flex-col justify-end w-6 h-6">
										<img
											className="rounded-full"
											src={`data:image/svg+xml;utf8,${generateFromString(
												'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d'
											)}`}
											alt="user"
										/>
									</div>
									<div className="p-3 rounded-xl bg-primary-light-grey bg-opacity-20">
										<p className="text-sm font-medium text-justify">
											Hi buddy!
										</p>
										<p className="mt-1 pl-14 text-right text-xs text-primary-dark-grey text-opacity-80">
											Sun 12:22 PM
										</p>
									</div>
								</div>
							))}

						{/* currentUser */}
						{Array(10)
							.fill()
							.map((_, idx) => (
								<div
									key={idx}
									className="grid grid-flow-col justify-end gap-2 mt-4 ml-80 mr-4"
								>
									<div className="p-3 rounded-xl bg-primary-blue bg-opacity-20">
										<p className="text-sm font-medium text-justify">
											ya whatsup
										</p>
										<p className="mt-1 pl-14 text-right text-xs text-primary-dark-grey text-opacity-80">
											Sun 12:22 PM
										</p>
									</div>
								</div>
							))}
						<div className="grid grid-flow-col justify-end gap-2 mt-4 ml-80 mr-4">
							<div className="p-3 rounded-xl bg-primary-blue bg-opacity-20">
								<img src="/assets/indomie.png" width={400} />
								<p className="mt-1 pl-14 text-right text-xs text-primary-dark-grey text-opacity-80">
									Sun 12:22 PM
								</p>
							</div>
						</div>
					</div>
					<ChatFooter initEmoji={initEmoji} />
				</>
			)}

			<AddAddressModal
				isOpen={isOpen}
				onClose={onClose}
				currentUser={userProfile?.accountId}
			/>
		</div>
	)
}

export default MiddleSide
