import { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Admin: NextPage = () => {
	const p = {
		id: 1,
		color: "Black",
		title: "Black T-Shirt",
		description:
			"The t-shirts for boys are always trending in the men's fashion zones. From the lightest to the darkest colors, exquisite design, and patterns.",
		price: 14.99,
		curreny: "usd",
		imageUrl:
			"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	};
	const product = trpc.useMutation("product.add", {
		onSuccess: () => {
			console.log("Success");
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
