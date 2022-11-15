import { Fragment, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'

import useStore from '../lib/store'
import near from '../lib/near'
import theme from '../config/theme'
import { API_URL } from '../constants/apiUrl'

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
			const res = await axios.get(`${API_URL}/api/profile`, {
				params: {
					accountId: currentUser.accountId,
				},
			})
			const user = res.data.data

			if (user.length === 0) {
				const formData = new FormData()
				formData.append('accountId', currentUser.accountId)

				try {
					const resp = await axios.put(`${API_URL}/api/profiles`, formData, {
						headers: {
							'Content-Type': 'application/json',
							authorization: await near.authToken(),
						},
					})
					store.setUserProfile(resp.data)
				} catch (err) {
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
