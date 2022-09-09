import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useCart } from "react-use-cart";

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session_id = context.query.session_id;

	if (!session_id) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session_id,
		},
	};
};

const Success: NextPage = ({ session_id }: any) => {
	const { items } = useCart();

	const data = trpc.useQuery([
		"strip.success",
		{
			session_id,
			allItems: items as any,
		},
	]);
	console.log(data);

	return <div>Success</div>;
};

export default Success;
