import Head from "next/head";
import { FC } from "react";

const ProductDetail: FC = () => {
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
			<main>
				<h1>Product</h1>
			</main>
		</>
	);
};

export default ProductDetail;
