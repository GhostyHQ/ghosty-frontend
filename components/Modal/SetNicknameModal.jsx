import { useEffect, useState } from 'react'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import { API_URL } from '../../constants/apiUrl'
import near from '../../lib/near'
import { useSWRConfig } from 'swr'
import useStore from '../../lib/store'

const SetNicknameModal = ({ isOpen, onClose, currentUser, accountUser }) => {
	const [nickname, setNickname] = useState('')
	const [isDisable, setIsDisable] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { mutate } = useSWRConfig()
	const store = useStore()

	useEffect(() => {
		setNickname('')
	}, [isOpen])

	const onFocusInput = () => {
		toast.dismiss()
		setIsDisable(false)
		setIsLoading(false)
	}

	const checkAddressOnNear = async () => {
		setIsDisable(true)
		setIsLoading(true)

		try {
			const formData = new FormData()

			formData.append('accountId', currentUser)
			formData.append('accountUser', accountUser.accountChatList)
			formData.append('alias', nickname)

			await axios
				.put(`${API_URL}/api/nickname`, formData, {
					headers: {
						'Content-Type': 'application/json',
						authorization: await near.authToken(),
					},
				})
				.then(() => {
					mutate(currentUser, true)

					store.setAlias({
						accountId: accountUser.accountChatList,
						alias: nickname,
					})
					onClose()
					setIsLoading(false)
					setIsDisable(false)
				})
				.catch((err) => {
					const message = err.message || 'Something went wrong, try again later'
					toast.error(message)
				})
		} catch (err) {
			const message = err.message || 'Something went wrong, try again later'
			toast.error(message)
		}
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Toaster position="top-center" reverseOrder={true} />
				<ModalOverlay />
				<ModalContent className="mx-4 md:mx-0">
					<ModalHeader className="text-center">
						<p className="font-semibold text-primary-black">Set Nickname</p>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<p className="font-semibold mb-1">User Address</p>
						<Input value={accountUser.accountChatList} disabled />
						<p className="text-xs mt-1">
							Check address on{' '}
							<a
								href={`https://explorer.testnet.near.org/accounts/${accountUser.accountChatList}`}
								target="_blank"
								rel="noreferrer"
							>
								<span className="cursor-pointer text-primary-blue hover:underline">
									Explore
								</span>
							</a>
						</p>
						<p className="font-semibold mt-3 mb-1">Nickname</p>
						<Input
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							placeholder="e.g. John Doe"
							onFocus={onFocusInput}
						/>
						<p className="text-xs mt-1">
							Max 20 chars and this is only visible to you.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button
							className="w-full hover:bg-primary-black hover:bg-opacity-80"
							variant="solid"
							color="white"
							colorScheme="primary.light_grey"
							bg="primary.black"
							onClick={checkAddressOnNear}
							disabled={nickname === '' || isDisable}
							isLoading={isLoading}
						>
							Save Changes
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default SetNicknameModal
