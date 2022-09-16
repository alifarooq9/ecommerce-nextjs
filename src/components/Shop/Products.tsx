import { FC } from "react";
import { trpc } from "../../utils/trpc";
import Product from "./Product";

export interface productTypes {
	id: number;
	title: string;
	description: string;
	price: number;
	image: string;
	color: string;
}

const Products: FC = () => {
	const { data, isLoading } = trpc.useQuery(["products.getAll"]);

	return (
		<div className="pt-8 w-full">
			<h1 className="text-2xl font-bold w-full">Products</h1>
			<div className="mt-10 grid gap-x-8 gap-y-14 gird-col-1 sm:grid-cols-3 w-full">
				{!isLoading &&
					data?.map((p) => {
						return <Product key={p.id} p={p} />;
					})}
			</div>
		</div>
	);
};

export default Products;
