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

import getConfig from '../../config/near'
import { API_URL } from '../../constants/apiUrl'
import near from '../../lib/near'
import { IconChat } from '../Icon'

const AddAddressModal = ({ isOpen, onClose, currentUser, mutate }) => {
	const [nearAccount, setNearAccount] = useState('')
	const [isDisable, setIsDisable] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	// const { mutate } = useSWRConfig()

	useEffect(() => {
		setNearAccount('')
	}, [isOpen])

	const onFocusInput = () => {
		toast.dismiss()
		setIsDisable(false)
	}

	const checkAddressOnNear = async () => {
		setIsDisable(true)
		setIsLoading(true)

		try {
			const nearConfig = getConfig(process.env.APP_ENV || 'development')
			const res = await axios.post(nearConfig.nodeUrl, {
				jsonrpc: '2.0',
				id: 'dontcare',
				method: 'query',
				params: {
					request_type: 'view_account',
					finality: 'final',
					account_id: nearAccount,
				},
			})
			if (res.data.error) {
				setIsLoading(false)
				toast.error('Please enter a valid address or .near')
			} else {
				if (currentUser === nearAccount) {
					setIsLoading(false)
					toast.error(`You can't add the current address`)
					return
				}

				const res = await axios.get(`${API_URL}/api/profile`, {
					params: { accountId: currentUser },
				})

				const dataChatList = res.data.data.chatList

				const checkExistData = dataChatList.filter(
					(data) => data.accountId === nearAccount
				)

				if (checkExistData.length > 0) {
					setIsLoading(false)
					toast.error('The address is already in the chat list')
					return
				}

				const formData = new FormData()

				formData.append('accountId', currentUser)
				formData.append('chatList', nearAccount)

				await axios
					.put(`${API_URL}/api/profiles/chatlist`, formData, {
						headers: {
							'Content-Type': 'application/json',
							authorization: await near.authToken(),
						},
					})
					.then(() => {
						mutate(`/api/profile`, true)
						onClose()
						setIsLoading(false)
						setIsDisable(false)
					})
					.catch((err) => {
						const message =
							err.message || 'Something went wrong, try again later'
						toast.error(message)
					})
			}
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
				<ModalContent>
					<ModalHeader className="text-center">
						<p className="font-semibold text-primary-black">Start New Chat</p>
						<p className="text-sm">
							Enter an address (or .near name) below to start a new chat
						</p>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							value={nearAccount}
							onChange={(e) => setNearAccount(e.target.value)}
							placeholder="e.g. f1... or username.near"
							onFocus={onFocusInput}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							className="w-full hover:bg-primary-black hover:bg-opacity-80"
							variant="solid"
							color="white"
							colorScheme="primary.light_grey"
							bg="primary.black"
							leftIcon={<IconChat color="white" />}
							onClick={checkAddressOnNear}
							disabled={nearAccount === '' || isDisable}
							isLoading={isLoading}
						>
							Start Chatting
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default AddAddressModal
