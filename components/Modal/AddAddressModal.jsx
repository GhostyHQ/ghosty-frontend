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

import { IconChat } from '../Icon'

const AddAddressModal = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
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
					<Input placeholder="e.g. f1... or username.near" />
				</ModalBody>
				<ModalFooter>
					<Button
						className="w-full hover:bg-primary-black hover:bg-opacity-80"
						variant="solid"
						color="white"
						colorScheme="messenger"
						bg="primary.black"
						leftIcon={<IconChat color="white" />}
					>
						Start Chatting
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default AddAddressModal
