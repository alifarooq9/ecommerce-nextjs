import { FC } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ShoppingCart: FC = () => {
	return (
		<button className="flex space-x-2 hover:bg-gray-100 px-5 py-3 rounded-2xl duration-300">
			<div className="relative">
				<ShoppingCartIcon className="w-6 h-6" />
				<div className="absolute w-2.5 h-2.5 rounded-full animate-pulse top-0 -right-0.5 bg-red-500"></div>
			</div>
			<h1 className="hidden sm:block">$199.55</h1>
		</button>
	);
};

export default ShoppingCart;
