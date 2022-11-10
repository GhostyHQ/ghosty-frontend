import * as nearAPI from 'near-api-js'
import { Base64 } from 'js-base64'

import getConfig from '../config/near'

class Near {
	constructor() {
		this.currentUser = null
		this.config = {}
		this.wallet = {}
		this.signer = {}
	}

	async authToken() {
		if (!this.currentUser) {
			return null
		}

		try {
			const accountId = this.currentUser.accountId
			const arr = new Array(accountId)
			for (var i = 0; i < accountId.length; i++) {
				arr[i] = accountId.charCodeAt(i)
			}
			const msgBuf = new Uint8Array(arr)
			const signedMsg = await this.signer.signMessage(
				msgBuf,
				this.wallet._authData.accountId,
				this.wallet._networkId
			)
			const pubKey = Buffer.from(signedMsg.publicKey.data).toString('hex')
			const signature = Buffer.from(signedMsg.signature).toString('hex')
			const payload = [accountId, pubKey, signature]
			return Base64.encode(payload.join('&'))
		} catch (error) {
			console.log(error)
		}
	}

	async init() {
		const nearConfig = getConfig(process.env.APP_ENV || 'development')

		try {
			// Initializing connection to the NEAR DevNet
			const near = await nearAPI.connect({
				deps: {
					keyStore:
						typeof window === 'undefined'
							? new nearAPI.keyStores.InMemoryKeyStore()
							: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
				},
				...nearConfig,
			})

			// Needed to access wallet
			const wallet = new nearAPI.WalletConnection(near)

			// Load in account data
			let currentUser
			if (wallet.getAccountId()) {
				currentUser = {
					accountId: wallet.getAccountId(),
					balance: await wallet.account().getAccountBalance(),
				}
			}

			this.currentUser = currentUser
			this.config = nearConfig
			this.wallet = wallet
			this.signer = new nearAPI.Signer(wallet._keyStore)
		} catch (err) {
			throw err
		}
	}
}

const near = new Near()

export default near
