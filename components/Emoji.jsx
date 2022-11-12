import {
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
} from '@chakra-ui/react'

import {
	activity,
	animalsAndNature,
	flags,
	foodAndDrink,
	objects,
	smileyAndPeople,
	symbols,
	travelAndPlaces,
} from '../data/emojis'

const Emoji = ({ init, isOpen }) => {
	return (
		(!init || isOpen) && (
			<PopoverContent
				color="white"
				bg="primary.light_grey"
				borderColor="primary.light_grey"
				position="relative"
			>
				<PopoverArrow bg="primary.light_grey" />
				<div className="overflow-y-scroll h-80">
					<PopoverHeader>SMILEYS & PEOPLE</PopoverHeader>
					<PopoverBody>
						<div className="grid grid-cols-10 gap-2 content-center text-center">
							{smileyAndPeople.map((emoji, idx) => (
								<div key={idx}>
									<span className="p-2 rounded-lg hover:bg-primary-dark-grey hover:bg-opacity-20 transition duration-200 cursor-pointer">
										{emoji}
									</span>
								</div>
							))}
						</div>
					</PopoverBody>
					<PopoverHeader>ANIMAL & NATURE</PopoverHeader>
					<PopoverBody>
						<div className="grid grid-cols-10 gap-2 content-center text-center">
							{animalsAndNature.map((emoji, idx) => (
								<div key={idx}>
									<span className="p-2 rounded-lg hover:bg-primary-dark-grey hover:bg-opacity-20 transition duration-200 cursor-pointer">
										{emoji}
									</span>
								</div>
							))}
						</div>
					</PopoverBody>
					<PopoverHeader>FOOD & DRINK</PopoverHeader>
					<PopoverBody>
						<div className="grid grid-cols-10 gap-2 content-center text-center">
							{foodAndDrink.map((emoji, idx) => (
								<div key={idx}>
									<span className="p-2 rounded-lg hover:bg-primary-dark-grey hover:bg-opacity-20 transition duration-200 cursor-pointer">
										{emoji}
									</span>
								</div>
							))}
						</div>
					</PopoverBody>
					<PopoverHeader>ACTIVITY</PopoverHeader>
					<PopoverBody>
						<div className="grid grid-cols-10 gap-2 content-center text-center">
							{activity.map((emoji, idx) => (
								<div key={idx}>
									<span className="p-2 rounded-lg hover:bg-primary-dark-grey hover:bg-opacity-20 transition duration-200 cursor-pointer">
										{emoji}
									</span>
								</div>
							))}
						</div>
					</PopoverBody>
					<PopoverHeader>TRAVEL & PLACES</PopoverHeader>
					<PopoverBody>
						<div className="grid grid-cols-10 gap-2 content-center text-center">
							{travelAndPlaces.map((emoji, idx) => (
								<div key={idx}>
									<span className="p-2 rounded-lg hover:bg-primary-dark-grey hover:bg-opacity-20 transition duration-200 cursor-pointer">
										{emoji}
									</span>
								</div>
							))}
						</div>
					</PopoverBody>
					<PopoverHeader>OBJECTS</PopoverHeader>
					<PopoverBody>
						<div className="grid grid-cols-10 gap-2 content-center text-center">
							{objects.map((emoji, idx) => (
								<div key={idx}>
									<span className="p-2 rounded-lg hover:bg-primary-dark-grey hover:bg-opacity-20 transition duration-200 cursor-pointer">
										{emoji}
									</span>
								</div>
							))}
						</div>
					</PopoverBody>
					<PopoverHeader>SYMBOLS</PopoverHeader>
					<PopoverBody>
						<div className="grid grid-cols-10 gap-2 content-center text-center">
							{symbols.map((emoji, idx) => (
								<div key={idx}>
									<span className="p-2 rounded-lg hover:bg-primary-dark-grey hover:bg-opacity-20 transition duration-200 cursor-pointer">
										{emoji}
									</span>
								</div>
							))}
						</div>
					</PopoverBody>
					<PopoverHeader>FLAGS</PopoverHeader>
					<PopoverBody>
						<div className="grid grid-cols-10 gap-2 content-center text-center">
							{flags.map((emoji, idx) => (
								<div key={idx}>
									<span className="p-2 rounded-lg hover:bg-primary-dark-grey hover:bg-opacity-20 transition duration-200 cursor-pointer">
										{emoji}
									</span>
								</div>
							))}
						</div>
					</PopoverBody>
				</div>
			</PopoverContent>
		)
	)
}

export default Emoji
