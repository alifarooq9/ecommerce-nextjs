import { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { trpc } from "../utils/trpc";
import { useCart } from "react-use-cart";
import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import Head from "next/head";
import { createContextInner } from "../server/router/context";
import { getSession } from "next-auth/react";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "../server/router";
import superjson from "superjson";
import { prisma } from "../server/db/client";

const ProductsDetails: NextPage = ({
	id,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { data } = trpc.useQuery(["products.getById", { id }]);

	const { addItem } = useCart();
	const handleAddItems = async () => {
		addItem({
			id: data?.id as string,
			title: data?.title,
			price: data?.price as number,
			imageUrl: [data?.image],
			currency: "usd",
			color: data?.color,
			description: data?.description,
			quantity: 1,
		});
	};

	return (
		<>
			<Head>
				<title>MatteBlack - {data?.title}</title>
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
							src={data?.image as string}
							layout="fill"
							className="rounded-md"
							objectFit="cover"
							placeholder="blur"
							quality={70}
							blurDataURL={data?.image}
							alt="product image"
						/>
					</section>
					<section className="flex flex-col md:justify-between">
						<div>
							<p className="font-medium opacity-60">
								MatteBlack. Ecommerce
							</p>
							<h1 className="mt-5 font-bold text-3xl md:text-4xl">
								{data?.title}
							</h1>
							<h4 className="font-medium text-2xl md:text-3xl mt-3 md:mt-8">
								${data?.price}
							</h4>
							<p className="mt-6">Color</p>
							<div
								className={`mt-2 bg-${data?.color} border border-gray-500 w-8 h-8 rounded-full`}
							></div>
							<p className="mt-4 font-light opacity-80">
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

export const getStaticPaths = async () => {
	const products = await prisma?.products.findMany({
		select: {
			id: true,
		},
	});

	const paths = products?.map((product) => ({
		params: {
			id: product.id,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id = "" } = params as { id: string };

	const session = await getSession();
	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: await createContextInner({ session: session }),
		transformer: superjson,
	});

	const product = await ssg.fetchQuery("products.getById", { id });

	if (!product) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			trpcState: ssg.dehydrate(),
			id,
		},
		revalidate: 1,
	};
};

export default ProductsDetails;
