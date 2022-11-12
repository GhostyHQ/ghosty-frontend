import Head from 'next/head'

import Footer from '../components/Footer'
import Nav from '../components/Nav'

const Faq = () => {
	return (
		<>
			<Head>
				<title>FAQ - Ghosty</title>
				<meta
					name="description"
					content="A messaging platform for NEAR users to simply and instantly messaging across wallet-to-wallet on the NEAR network."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="px-4 md:px-0 pt-4">
				<div className="max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto">
					<Nav />
					<div className="mt-10">
						<p className="text-center text-3xl font-semibold">
							Frequently Asked Questions
						</p>
						<p className="text-center text-lg mt-2">
							Our pick list for frequently asked questions
						</p>
						<div className="max-w-3xl mx-auto mt-10">
							<div>
								<p className="text-xl font-semibold">What is Ghosty?</p>
								<p className="text-[15px] mt-2 text-justify">
									Ghosty was built to introduce the concept of Signing in with
									Web3 and A messaging platform for NEAR users to simply and
									instantly messaging across wallet-to-wallet on the NEAR
									network.
								</p>
							</div>
							<hr className="my-8" />
							<div>
								<p className="text-xl font-semibold">
									Is there a cost for sending messages?
								</p>
								<p className="text-[15px] mt-2 text-justify">
									No cost! Messages are sent and received free of cost because
									they are done off-chain.
								</p>
							</div>
							<hr className="my-8" />
							<div>
								<p className="text-xl font-semibold">Will I get a reply?</p>
								<p className="text-[15px] mt-2 text-justify">
									This will depend on whether the recipient chooses to use
									Ghosty or not (and decides to resend the response).
								</p>
							</div>
							<hr className="my-8" />
							<div>
								<p className="text-xl font-semibold">
									Is all message on Ghosty end-to-end encrypted?
								</p>
								<p className="text-[15px] mt-2 text-justify">
									All messages are encrypted once both addresses are entered
									into Ghosty Chat.
								</p>
							</div>
							<hr className="my-8" />
							<div>
								<p className="text-xl font-semibold">Who can I chat with?</p>
								<p className="text-[15px] mt-2 text-justify">
									You can chat with any NEAR address!
								</p>
							</div>
							<hr className="my-8" />
							<div>
								<p className="text-xl font-semibold">How are login handled?</p>
								<p className="text-[15px] mt-2 text-justify">
									Current users can login via Near Wallet.
								</p>
							</div>
							<hr className="my-8" />
							<div>
								<p className="text-xl font-semibold">
									I get too much spam. How can I avoid them?
								</p>
								<p className="text-[15px] mt-2 text-justify">
									You can block individual users whose messages you {`don't`}{' '}
									want to receive.
								</p>
							</div>
							<hr className="my-8" />
							<div>
								<p className="text-xl font-semibold">
									Is there a mobile version?
								</p>
								<p className="text-[15px] mt-2 text-justify">
									There is currently no mobile app. The Ghosty web app works on
									mobile browsers, although desktop browsers provide the most
									optimized user experience.
								</p>
							</div>
							<hr className="my-8" />
							<div>
								<p className="text-xl font-semibold">
									What can I use Ghosty for?
								</p>
								<p className="text-[15px] mt-2 text-justify">
									Use cases include offering deals to buy NFTs held by message
									recipients, initiating partnerships, warning about exposure to
									smart contract vulnerabilities, and much more.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
export default Faq
