import near from '../lib/near'

const Chat = () => {
	const { wallet } = near

	const _signOut = () => {
		wallet.signOut()
		window.location.replace(`${location.protocol}//${location.host}`)
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center p-4">
			<button onClick={_signOut}>logout</button>
		</div>
	)
}

export default Chat
