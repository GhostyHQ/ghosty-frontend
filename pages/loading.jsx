import { Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import near from '../lib/near'
import useStore from '../lib/store'

const Loading = () => {
	const initialized = useStore((state) => state.initialized)
	const router = useRouter()

	useEffect(() => {
		setInterval(() => {
			router.push(`/chat/${near?.currentUser?.accountId}`, null, {
				shallow: false,
			})
		}, 1000)
	}, [initialized])

	return (
		<div className="text-center mt-40">
			<Spinner />
		</div>
	)
}

export default Loading
