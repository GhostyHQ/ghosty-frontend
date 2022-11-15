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
import { generateFromString } from 'generate-avatar'

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

const LeftSide = ({ className }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { currentUser, wallet } = near

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
								{prettyTruncate(currentUser?.accountId, 12, 'address')}
							</p>
						</div>
						<div className="flex items-center gap-1 m-3">
							<div
								className="p-2 bg-primary-light-grey bg-opacity-20 rounded-full cursor-pointer hover:bg-opacity-10 transition duration-200"
								onClick={onOpen}
							>
								<IconPlus size={16} />
							</div>
							<div className="relative">
								<Popover placement="bottom">
									<PopoverTrigger>
										<div className="p-2 bg-primary-light-grey bg-opacity-20 rounded-full cursor-pointer hover:bg-opacity-10 transition duration-200">
											<IconEllipsis size={16} />
										</div>
									</PopoverTrigger>
									<PopoverContent color="black">
										<PopoverArrow />
										<PopoverBody boxShadow="2xl">
											<div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary-light-grey hover:bg-opacity-20 transition duration-200">
												<IconBlocked size={24} />
												<p className="text-primary-dark-grey font-semibold">
													Blocked Users
												</p>
											</div>
											<div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary-light-grey hover:bg-opacity-20 transition duration-200 mb-2">
												<IconQuestion size={24} />
												<p className="text-primary-dark-grey font-semibold">
													FAQs
												</p>
											</div>
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
							style={{ WebkitAppearance: 'none' }}
						/>
					</div>
				</div>
				<div className="overflow-y-scroll h-[100vh] pt-32">
					{Array(20)
						.fill()
						.map((_, idx) => (
							<div
								key={idx}
								className="p-4 cursor-pointer hover:bg-primary-light-grey-200 transition duration-200"
							>
								<div className="flex items-center gap-2">
									<div className="relative">
										<img
											className="relative w-10 rounded-full"
											src={`data:image/svg+xml;utf8,${generateFromString(
												'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d'
											)}`}
										/>
										<div className="absolute inset-y-7 right-0 w-3 h-3 rounded-full bg-green-500" />
									</div>
									<div>
										<p className="font-semibold">
											{prettyTruncate(
												'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d',
												20,
												'address'
											)}
										</p>
										<p className="text-xs">{'New Chat 👻'}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<AddAddressModal
				isOpen={isOpen}
				onClose={onClose}
				currentUser={currentUser?.accountId}
			/>
		</>
	)
}

export default LeftSide
