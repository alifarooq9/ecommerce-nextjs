import { FC, useState, useEffect } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "react-use-cart";
import { useRecoilState } from "recoil";
import cartState from "../../recoil/cartState";

const ShoppingCart: FC = () => {
	const { cartTotal } = useCart();
	const [total, setTotal] = useState();
	useEffect(() => {
		setTotal(cartTotal.toFixed(2) as any);
	}, [cartTotal]);

	const [miniCart, setMiniCart] = useRecoilState(cartState);

	return (
		<button
			onClick={() => {
				setMiniCart(true);
			}}
			className="flex space-x-2 hover:bg-gray-800 px-5 py-3 rounded-2xl duration-300"
		>
			<div className="relative">
				<ShoppingBagIcon className="w-6 h-6" />
			</div>
			<h1 className="hidden sm:block">${total}</h1>
		</button>
	);
};

export default ShoppingCart;
