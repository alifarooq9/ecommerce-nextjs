import { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { format } from "date-fns";
import Image from "next/image";

const Orders: NextPage = () => {
	const data = trpc.useQuery(["order.getall"]);

	return (
		<>
			<Head>
				<title>MatteBlack - Orders</title>
				<meta
					name="description"
					content="This a ecommerce app with nextjs"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="w-screen min-h-screen py-20 flex flex-col justify-center max-w-screen-md mx-auto px-6">
				<h1 className="font-bold text-2xl">Orders</h1>
				<div>
					{data.data?.orders.map((o: any) => (
						<div
							key={o.id}
							className="p-5 border border-gray-700 rounded-2xl overflow-hidden my-10"
						>
							<p className="text-sm font-light opacity-70">
								Ordered At:{" "}
								<span className="font-light">
									{format(new Date(o?.createdAt), "PPpp")}
								</span>
							</p>
							{JSON.parse(o?.items as any).map((item: any) => (
								<div key={item?.id}>
									<li className="flex py-4">
										<div className="h-24 w-24 relative flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
											<Image
												src={item.imageUrl[0]}
												quality={30}
												alt="Product images"
												blurDataURL={item.imageUrl[0]}
												layout="fill"
												placeholder="blur"
												className="h-full w-full object-cover object-center"
											/>
										</div>

										<div className="ml-4 flex flex-1 flex-col">
											<div>
												<div className="flex justify-between text-base font-medium text-gray-100">
													<h3>{item?.title}</h3>
													<p className="ml-4">
														${item?.price}
													</p>
												</div>
												<p className="mt-1 text-sm text-gray-300">
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
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Orders;
