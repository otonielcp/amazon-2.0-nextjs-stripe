/** @format */

import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';
import { getSession, useSession } from 'next-auth/client';

export default function Home({ products }) {  
	const [session, loading] = useSession();   // useSession() is a custom hook that returns the session data and a loading state

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
	const session = await getSession(context);
	const products = await fetch('https://fakestoreapi.com/products').then(
		(res) => res.json(),
	);

	return {
		props: {
			session,
			products,
		},
	};
}
