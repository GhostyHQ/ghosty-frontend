import axios from 'axios'
import { Fragment, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import useStore from '../lib/store'
import near from '../lib/near'
import theme from '../config/theme'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	const store = useStore()

	useEffect(() => {
		_init()
	}, [])

	const _init = async () => {
		await near.init()
		const currentUser = await near.currentUser

		if (currentUser) {
			const res = await axios.get(
				`${process.env.API_URL}/profiles?accountId=${currentUser.accountId}`
			)
			const user = res.data.data.results

			if (user.length === 0) {
				const formData = new FormData()
				formData.append('accountId', currentUser.accountId)

				try {
					const res = await axios.put(
						`${process.env.API_URL}/profiles`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
								authorization: await near.authToken(),
							},
						}
					)
					store.setUserProfile(res.data.data)
				} catch (err) {
					console.log(err)
					store.setUserProfile({})
				}
			} else {
				const userProfile = user[0]
				store.setUserProfile(userProfile)
			}

			store.setCurrentUser(currentUser.accountId)
			store.setUserBalance(currentUser.balance)
		}
		store.setInitialized(true)
	}

	return (
		<Fragment>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</Fragment>
	)
}

export default MyApp
