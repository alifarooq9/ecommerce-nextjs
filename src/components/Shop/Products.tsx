import { FC } from "react";
import { trpc } from "../../utils/trpc";
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
	const { data, isLoading } = trpc.useQuery(["product.getAll"]);

	return (
		<div className="pt-8">
			<h1 className="text-2xl font-bold">Products</h1>
			<div className="mt-10 grid gap-x-8 gap-y-14 gird-col-1 sm:grid-cols-3">
				{!isLoading &&
					data?.map((p) => {
						return <Product key={p.id} p={p} />;
					})}
			</div>
		</div>
	);
};

export default Products;
