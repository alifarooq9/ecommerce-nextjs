import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	//const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

	return (
		<>
			<Head>
				<title>Clothing</title>
				<meta
					name="description"
					content="This a ecommerce app with nextjs"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="min-h-screen">
				<h1>Hello World</h1>
			</main>
		</>
	);
};

export default Home;
