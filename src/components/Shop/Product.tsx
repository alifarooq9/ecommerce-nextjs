import { FC } from "react";
import { productTypes } from "./Products";
import Router from "next/router";

const Product: FC<productTypes | any> = (props: { p: productTypes }) => {
	return (
		<div
			onClick={() => Router.push(`/${props.p.id}`)}
			className="bg-white group cursor-pointer"
		>
			<img
				src={props.p.imageUrl}
				className="group-hover:opacity-70 duration-300 rounded"
			/>
			<div className="flex items-centers justify-between mt-4">
				<h1 className="font-semibold opacity-80">{props.p.title}</h1>
				<p className="font-semibold opacity-80">${props.p.price}</p>
			</div>
			<p className=" opacity-60">{props.p.color}</p>
		</div>
	);
};

export default Product;
