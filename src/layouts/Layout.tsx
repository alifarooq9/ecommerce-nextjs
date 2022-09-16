import Head from "next/head";
import { FC, ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Header/Navbar";
import { Toaster } from "react-hot-toast";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<Head>
				<title>MatteBlack</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="">
				<Toaster />
				<Navbar />
				{children}
				<Footer />
			</main>
		</>
	);
};

export default Layout;
