import { FC } from "react";
import ShoppingCart from "./ShoppingCart";
import User from "./User";

const Navbar: FC = () => {
	return (
		<nav className="px-6 w-screen fixed z-50 top-0 bg-white h-20 flex justify-center items-center">
			<section className="max-w-screen-xl w-full flex justify-between items-center space-x-10">
				<h1 className="font-bold text-2xl ">Clothing.</h1>
				<div className=" col-span-1 flex justify-end items-center">
					<ShoppingCart />
					<User />
					<button className="hidden bg-white text-blue-600 drop-shadow-md h-12 w-32 rounded-2xl hover:bg-gray-100 transition-colors duration-300 font-medium">
						Sign in
					</button>
					<button className="hidden bg-blue-600 text-white  h-12 w-32 rounded-2xl hover:bg-blue-700 transition-colors duration-300 ">
						Sign up
					</button>
				</div>
			</section>
		</nav>
	);
};

export default Navbar;
