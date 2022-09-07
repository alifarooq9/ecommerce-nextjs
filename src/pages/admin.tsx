import { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Admin: NextPage = () => {
	const p = {
		id: 6,
		color: "Black",
		title: "Black T-shirt",
		description: "This is a black t shirt from clothing store.",
		price: 19.99,
		curreny: "usd",
		imageUrl:
			"https://images.unsplash.com/photo-1633966887768-64f9a867bdba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=803&q=80",
	};
	const product = trpc.useMutation("product.add", {
		onSuccess: (p) => {
			console.log(p);
		},
		onError: (e) => {
			console.log(e);
		},
	});
	const handleProductAdd = async () => {
		await product.mutate({
			title: p.title,
			description: p.description,
			color: p.color,
			curreny: p.curreny,
			imageUrl: p.imageUrl,
			price: p.price,
		});
	};

	return (
		<div className="mt-48">
			<button onClick={handleProductAdd}>Admin</button>
		</div>
	);
};

export default Admin;
