import { FC } from "react";
import { number } from "zod";
import Product from "./Product";

export interface productTypes {
	id: number;
	title: string;
	description: string;
	price: number;
	curreny: "usd";
	imageUrl: string;
	color: string;
}

const Products: FC = () => {
	const produsts: productTypes[] = [
		{
			id: 1,
			color: "Black",
			title: "Black T-shirt",
			description: "This is a black t shirt from clothing store.",
			price: 12.99,
			curreny: "usd",
			imageUrl:
				"https://images.unsplash.com/photo-1633966887768-64f9a867bdba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=803&q=80",
		},
		{
			id: 2,
			color: "Black",
			title: "Black T-shirt",
			description: "This is a black t shirt from clothing store.",
			price: 17.99,
			curreny: "usd",
			imageUrl:
				"https://images.unsplash.com/photo-1633966887768-64f9a867bdba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=803&q=80",
		},
		{
			id: 3,
			color: "Black",
			title: "Black T-shirt",
			description: "This is a black t shirt from clothing store.",
			price: 9.99,
			curreny: "usd",
			imageUrl:
				"https://images.unsplash.com/photo-1633966887768-64f9a867bdba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=803&q=80",
		},
		{
			id: 5,
			color: "Black",
			title: "Black T-shirt",
			description: "This is a black t shirt from clothing store.",
			price: 9.99,
			curreny: "usd",
			imageUrl:
				"https://images.unsplash.com/photo-1633966887768-64f9a867bdba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=803&q=80",
		},
		{
			id: 6,
			color: "Black",
			title: "Black T-shirt",
			description: "This is a black t shirt from clothing store.",
			price: 9.99,
			curreny: "usd",
			imageUrl:
				"https://images.unsplash.com/photo-1633966887768-64f9a867bdba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=803&q=80",
		},
	];

	return (
		<div className="pt-8">
			<h1 className="text-2xl font-bold">Products</h1>
			<div className="mt-10 grid gap-x-8 gap-y-14 gird-col-1 sm:grid-cols-3">
				{produsts.map((p) => {
					return <Product key={p.id} p={p} />;
				})}
			</div>
		</div>
	);
};

export default Products;
