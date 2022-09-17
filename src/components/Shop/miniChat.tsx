import { FC, useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { useRecoilState } from "recoil";
import cartState from "../../recoil/cartState";
import { motion } from "framer-motion";
import Checkout from "./Checkout";
import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));

const MiniCart: FC = () => {
	const [miniCart, setMiniCart] = useRecoilState(cartState);

	const { cartTotal, items, updateItemQuantity } = useCart();

	const [total, setTotal] = useState();
	useEffect(() => {
		setTotal(cartTotal.toFixed(2) as any);
	}, [cartTotal]);

	return (
		<div className=" h-screen fixed overflow-auto z-50 right-0 top-0 w-screen max-w-md">
			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						onClick={() => setMiniCart(false)}
						className="w-full h-full bg-black absolute bg-opacity-50"
					></motion.div>
					<motion.div
						initial={{ opacity: 0, x: "100%" }}
						animate={{ opacity: 1, x: "0%" }}
						exit={{ opacity: 0, x: "100%" }}
						transition={{ duration: 0.2 }}
						className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
					>
						<div className="pointer-events-auto w-screen max-w-md">
							<div className="flex h-full flex-col overflow-y-auto bg-zinc-900">
								<div className="flex-1 overflow-y-auto  px-4 sm:px-6">
									<div className="flex sticky top-0 h-16 items-center bg-zinc-900 justify-between">
										<h2
											className="text-lg font-medium"
											id="slide-over-title"
										>
											Shopping cart
										</h2>
										<div className="ml-3 flex h-7 items-center">
											<button
												onClick={() =>
													setMiniCart(false)
												}
												type="button"
												className="-m-2 p-2 text-gray-300 hover:text-gray-100"
											>
												<span className="sr-only">
													Close panel
												</span>

												<svg
													className="h-6 w-6"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													aria-hidden="true"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									</div>

									<div className="mt-8">
										<div className="flow-root">
											<ul
												role="list"
												className="-my-6 divide-y divide-gray-500"
											>
												{items.map((i) => (
													<li
														key={i.id}
														className="flex py-6"
													>
														<div className="h-24 relative w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
															<Image
																src={
																	i
																		.imageUrl[0]
																}
																quality={30}
																alt="Product images"
																blurDataURL={
																	i
																		.imageUrl[0]
																}
																layout="fill"
																placeholder="blur"
																className="h-full w-full object-cover object-center"
															/>
														</div>

														<div className="ml-4 flex flex-1 flex-col">
															<div>
																<div className="flex justify-between text-base font-medium text-gray-200">
																	<h3>
																		<a href="#">
																			{
																				i.title
																			}
																		</a>
																	</h3>
																	<p className="ml-4">
																		$
																		{
																			i.price
																		}
																	</p>
																</div>
																<p className="mt-1 text-sm text-gray-300">
																	{i.color}
																</p>
															</div>
															<div className="flex flex-1 items-end justify-between text-sm">
																<p className="text-gray-500">
																	Qty{" "}
																	{i.quantity}
																</p>

																<div className="flex">
																	<button
																		onClick={() =>
																			updateItemQuantity(
																				i.id,
																				(i.quantity as number) -
																					1
																			)
																		}
																		type="button"
																		className="font-medium text-blue-600 hover:text-blue-500"
																	>
																		Remove
																	</button>
																</div>
															</div>
														</div>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>

								<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
									<div className="flex justify-between text-base font-medium text-gray-100">
										<p>Subtotal</p>
										<p>${total}</p>
									</div>
									<p className="mt-0.5 text-sm text-gray-400">
										Shipping and taxes calculated at
										checkout.
									</p>
									<Checkout />
									<div className="mt-6 flex justify-center text-center text-sm text-gray-400">
										<p>
											or
											<button
												onClick={() =>
													setMiniCart(false)
												}
												type="button"
												className="font-medium ml-1 text-blue-600 hover:text-blue-700"
											>
												Continue Shopping
												<span aria-hidden="true">
													{" "}
													&rarr;
												</span>
											</button>
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default MiniCart;
