import Head from "next/head";
import { FC, ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Header/Navbar";
import { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { miniCartState } from "../recoil/globalStates";
import MiniCart from "../components/Shop/miniChat";
import { AnimatePresence } from "framer-motion";

interface layoutTypes {
	children: ReactNode;
}

const Layout: FC<layoutTypes> = ({ children }) => {
	const miniCart = useRecoilValue(miniCartState);

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
			<main className="overflow-x-hidden">
				<AnimatePresence>{miniCart && <MiniCart />}</AnimatePresence>
				<Toaster />
				<Navbar />
				{children}
				<Footer />
			</main>
		</>
	);
};

export default Layout;
