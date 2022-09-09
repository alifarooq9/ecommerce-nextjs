import type { NextPage } from "next";
import Head from "next/head";
import Landing from "../components/Shop/Landing";
import Products from "../components/Shop/Products";
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

			<main className="min-h-screen flex justify-center">
				<div className="max-w-screen-lg w-screen px-6 ">
					<Landing />
					<Products />
				</div>
			</main>
		</>
	);
};

export default Home;
