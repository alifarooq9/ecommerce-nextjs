import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useCart } from "react-use-cart";
import Head from "next/head";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Router from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session_id = context.query.session_id;

	if (!session_id) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session_id,
		},
	};
};

const Success: NextPage = ({ session_id }: any) => {
	const { items, emptyCart } = useCart();

	const data = trpc.useQuery([
		"strip.success",
		{
			session_id,
			allItems: items as any,
		},
	]);

	useEffect(() => {
		if (data.data?.orders) {
			emptyCart();
		}
	}, [data.isFetching, data.data]);

	console.log(data);

	return (
		<>
			<Head>
				<title>Clothing - Success</title>
				<meta
					name="description"
					content="This a ecommerce app with nextjs"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="w-screen max-w-screen-md mx-auto py-20 px-6 flex flex-col justify-center min-h-screen">
				<div className="flex items-center space-x-2 sm:space-x-3">
					<CheckBadgeIcon className="w-7 h-7 text-green-500 sm:w-12 sm:h-12" />
					<h1 className="font-bold text-2xl sm:text-4xl">
						Payment Successfull
					</h1>
				</div>
				<p className="px-9 sm:px-16 -translate-x-1 opacity-70 mt-1">
					Thank you for buying from clothing ecommerce
				</p>

				<div className="mt-20 flex justify-between items-center">
					<h4 className="font-semibold ">Order Items</h4>
					<button
						onClick={() => Router.push("/orders")}
						className="text-sm text-blue-600 hover:underline"
					>
						View all orders
					</button>
				</div>
				<div className="border mt-4 p-5 rounded-2xl divide-y">
					{data.isLoading && (
						<h1 className="text-center">Loading...</h1>
					)}
					{data.data?.orders?.items.map((item: any) => (
						<div key={item?.id}>
							<li className="flex py-4">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
									<img
										src={item?.imageUrl[0]}
										alt="Image"
										className="h-full w-full object-cover object-center"
									/>
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<a href="#">{item?.title}</a>
											</h3>
											<p className="ml-4">
												${item?.price}
											</p>
										</div>
										<p className="mt-1 text-sm text-gray-500">
											{item?.color}
										</p>
									</div>
									<p className="text-sm opacity-60 line-clamp-2 max-w-lg">
										{item?.description}
									</p>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="text-gray-500">
											Qty {item?.quantity}
										</p>
									</div>
								</div>
							</li>
						</div>
					))}
					{data.isFetched && (
						<div className="pt-5 flex flex-col items-end">
							<p className="font-bold opacity-70 text-base pt-0.5">
								<span className="font-medium">Cost: </span>$
								{`${data.data?.session?.amount_subtotal
									?.toString()
									.slice(
										0,
										-2
									)}.${data.data?.session?.amount_subtotal
									?.toString()
									.slice(-2)}`}
							</p>
							<p className="font-bold opacity-70 text-base pt-0.5">
								<span className="font-medium">Discount: </span>$
								{`${data.data?.session?.total_details?.amount_discount
									?.toString()
									.slice(
										0,
										-2
									)}.${data.data?.session?.total_details?.amount_discount
									?.toString()
									.slice(-2)}`}
							</p>
							<p className="font-bold opacity-70 text-base pt-0.5">
								<span className="font-medium">Shipping: </span>
								{data.data?.session?.shipping_cost
									?.amount_subtotal === 0
									? "Free"
									: `$${data.data?.session?.shipping_cost?.amount_subtotal
											?.toString()
											.slice(
												0,
												-2
											)}.${data.data?.session?.shipping_cost?.amount_subtotal
											?.toString()
											.slice(-2)}`}
							</p>

							<p className="font-bold opacity-70 text-base pt-0.5">
								<span className="font-medium">
									Total Cost:{" "}
								</span>
								$
								{`${data.data?.session?.amount_total
									?.toString()
									.slice(
										0,
										-2
									)}.${data.data?.session?.amount_total
									?.toString()
									.slice(-2)}`}
							</p>
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default Success;
