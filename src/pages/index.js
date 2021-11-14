/** @format */

import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';
import { getSession, useSession } from 'next-auth/client';

export default function Home({ products }) {
	const [session, loading] = useSession(); // useSession() is a custom hook that returns the session data and a loading state

	return (
		<div className='bg-gray-100'>
			<Head>
				<title>Amazon 2.0</title>
			</Head>

			<Header />

			<main className='mx-auto max-w-screen-2xl'>
				<Banner />

				<ProductFeed products={products} />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	// getServerSideProps() is a custom function that returns the data to be used on the server-side
	const session = await getSession(context); // getSession() is a custom function that returns the session data
	const products = await fetch('https://fakestoreapi.com/products').then(
		// fetch() is a custom function that returns the data from the API
		(res) => res.json(), // res.json() is a custom function that returns the data from the API as a JSON object
	);

	return {
		props: {
			session,
			products,
		},
	};
}
