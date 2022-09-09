import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC } from "react";
import { trpc } from "../../utils/trpc";
import { useCart } from "react-use-cart";
import Image from "next/image";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {
			idQuery: context.query.id,
		},
	};
}

const ProductDetail: FC<any> = ({ idQuery }) => {
	const { data } = trpc.useQuery([
		"product.get",
		{
			id: idQuery,
		},
	]);

	const { addItem } = useCart();
	const handleAddItems = async () => {
		await addItem({
			id: data?.id as string,
			title: data?.title,
			price: data?.price as number,
			imageUrl: [data?.imageUrl],
			currency: data?.curreny,
			description: data?.description,
			quantity: 1,
		});
	};

	return (
		<>
			<Head>
				<title>Clothing - {data?.title}</title>
				<meta
					name="description"
					content="This a ecommerce app with nextjs"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="w-screen min-h-screen flex flex-col justify-center items-center py-28">
				<div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 pb-10 gap-10 px-7">
					<section
						className="flex justify-center items-center relative"
						style={{ height: "500px" }}
					>
						<Image
							src={data?.imageUrl as string}
							layout="fill"
							className="rounded-md"
							objectFit="cover"
						/>
					</section>
					<section className="flex flex-col md:justify-between">
						<div>
							<p className="font-medium opacity-60">
								Clothing. Ecommerce
							</p>
							<h1 className="mt-5 font-bold text-3xl md:text-4xl">
								{data?.title}
							</h1>
							<h4 className="font-medium text-2xl md:text-3xl mt-3 md:mt-8">
								${data?.price}
							</h4>
							<p className="mt-6">Color</p>
							<div className="mt-2 bg-gray-800 border border-gray-500 w-8 h-8 rounded-full"></div>
							<p className="mt-4 opacity-80">
								{data?.description}
							</p>
						</div>

						<button
							onClick={handleAddItems}
							className="bg-blue-600 hover:bg-blue-700 duration-300 text-white mt-7 w-full h-14 rounded-lg"
						>
							Add to cart
						</button>
					</section>
				</div>
			</main>
		</>
	);
};

export default ProductDetail;
