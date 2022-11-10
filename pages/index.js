import Head from 'next/head'
import Image from 'next/image'

import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import Footer from '../components/Footer'

const Home = () => {
	return (
		<>
			<Head>
				<title>Ghosty</title>
				<meta
					name="description"
					content="A messaging platform for NEAR users to simply and instantly messaging across wallet-to-wallet on the NEAR network."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="px-4 lg:px-0 pt-4 lg:bg-primary-light-grey lg:bg-opacity-10">
				<div className="max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto">
					<Nav />
					<Hero />
				</div>
			</div>
			<Feature />
			<div className="max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto mt-20 lg:mt-40 lg:grid grid-cols-2">
				<div className="flex flex-col justify-center ">
					<p className="text-5xl lg:text-6xl xl:text-8xl text-center lg:text-left lg:whitespace-nowrap">
						We Are NEAR
					</p>
					<p className="text-center mt-4 lg:-ml-20">
						Explore{' '}
						<a href="https://near.org" target="_blank" rel="noreferrer">
							<span className="cursor-pointer hover:text-primary-blue transition duration-300 underline underline-offset-2">
								more
							</span>
						</a>
					</p>
				</div>
				<div className="flex justify-center mt-10 lg:mt-0 mx-4 lg:mx-0">
					<Image
						src={'/assets/ghosty-near-hero.png'}
						width={400}
						height={400}
						alt="We Are NEAR!"
					/>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Home
