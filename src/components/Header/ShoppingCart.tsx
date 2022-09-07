import { FC } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const ShoppingCart: FC = () => {
	return (
		<button className="flex space-x-2 hover:bg-gray-100 px-5 py-3 rounded-2xl duration-300">
			<div className="relative">
				<ShoppingBagIcon className="w-6 h-6" />
			</div>
			<h1 className="hidden sm:block">$199.55</h1>
		</button>
	);
};

export default ShoppingCart;
