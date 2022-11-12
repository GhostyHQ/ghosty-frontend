import { useState } from 'react'
import clsx from 'clsx'
import { Popover, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import { generateFromString } from 'generate-avatar'

import { IconEllipsis, IconEmoticon, IconPictureSolid, IconSend } from '../Icon'
import { prettyTruncate } from '../../utils/common'
import Emoji from '../Emoji'

const MiddleSide = ({ className, initEmoji }) => {
	const [messages, setMessages] = useState('')
	const [rowMessage, setRowMessage] = useState(1)
	const [toggleUserInfo, setToggleUserInfo] = useState(false)
	const { isOpen, onToggle, onClose } = useDisclosure()

	const onChangeMessage = (value) => {
		setMessages(value)
		if (value === '') setRowMessage(1)
	}

	const onKeyPress = (e) => {
		if (e.keyCode === 13 && e.shiftKey && rowMessage <= 4) {
			e.preventDefault()

			let start = e.target.selectionStart
			let end = e.target.selectionEnd

			setMessages(messages.substring(0, start) + '\n' + messages.substring(end))
			start = end = start + 1
			setRowMessage(rowMessage + 1)
		} else if (e.keyCode === 13) {
			e.preventDefault()

			let start = e.target.selectionStart
			let end = e.target.selectionEnd

			if (rowMessage >= 4) {
				setMessages(
					messages.substring(0, start) + '\n' + messages.substring(end)
				)
				start = end = start + 1
			}
		}
	}

	return (
		<div className={clsx(className, toggleUserInfo && 'col-span-4')}>
			<div className="absolute inset-x-0 flex justify-between items-center p-4 bg-white border-b-[1px]">
				<div className="flex items-center gap-2">
					<img
						className="w-8 rounded-full"
						src={`data:image/svg+xml;utf8,${generateFromString(
							'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d'
						)}`}
					/>
					<div>
						<p className="font-semibold">
							{prettyTruncate(
								'f1b05051d8564cad77ca947d1b38a0c1031f27b0f13bd641ccd214f62ecf3f1d',
								30,
								'address'
							)}
						</p>
						<p className="text-xs text-green-500">Online</p>
					</div>
				</div>
				<div
					className="p-2 rotate-90 bg-primary-light-grey bg-opacity-20 rounded-full cursor-pointer hover:bg-opacity-10 transition duration-200"
					onClick={() => setToggleUserInfo(!toggleUserInfo)}
				>
					<IconEllipsis size={16} />
				</div>
			</div>
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
								<p className="text-sm font-medium text-justify">Hi buddy!</p>
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
								<p className="text-sm font-medium text-justify">ya whatsup</p>
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
			<div className="absolute inset-x-0 bottom-0 bg-white z-50 pt-4 mx-4">
				<div className="flex items-center gap-1 mb-4">
					<div className="p-2 cursor-pointer hover:bg-primary-light-grey-200 rounded-full transition duration-200">
						<IconPictureSolid size={30} color="#3F4246" />
					</div>
					<Popover placement="top" isOpen={isOpen} onClose={onClose}>
						<PopoverTrigger>
							<div
								className="p-2 cursor-pointer hover:bg-primary-light-grey-200 rounded-full transition duration-200"
								onClick={onToggle}
							>
								<IconEmoticon size={30} color="#3F4246" />
							</div>
						</PopoverTrigger>
						<Emoji init={initEmoji} isOpen={isOpen} />
					</Popover>
					<textarea
						type="text"
						className={clsx(
							'w-full py-2 pl-4 border-[1px] overflow-y-scroll focus:outline-none',
							rowMessage === 1 && 'rounded-full',
							rowMessage > 1 && 'rounded-xl'
						)}
						rows={rowMessage}
						placeholder="Aa"
						style={{ WebkitAppearance: 'none', resize: 'none' }}
						value={messages}
						onChange={(e) => onChangeMessage(e.target.value)}
						onKeyDown={onKeyPress}
					/>
					<div className="p-2 cursor-pointer hover:bg-primary-light-grey-200 rounded-full transition duration-200">
						<IconSend size={30} color="#3F4246" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MiddleSide
