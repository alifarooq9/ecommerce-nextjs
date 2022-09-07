import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { useCart } from "react-use-cart";
import { useRecoilState } from "recoil";
import { miniCartState, userMenuState } from "../../recoil/globalStates";
import { trpc } from "../../utils/trpc";
import Router from "next/router";
import loadingSvg from "../../../public/loaderWhite.svg";
import Image from "next/image";

const Checkout: FC = () => {
	const { data: session } = useSession();

	const [userMenu, setUserMenu] = useRecoilState(userMenuState);
	const [miniCart, setMiniCart] = useRecoilState(miniCartState);

	const { items } = useCart();

	const { mutate } = trpc.useMutation("strip.pay", {
		onSuccess: (obj: any) => {
			Router.push(obj?.url);
			setMiniCart(false);
		},
	});
	const [paynowloading, setPaynowLoading] = useState<boolean>(false);
	const handleCheckout = async () => {
		if (session) {
			setPaynowLoading(true);
			mutate({ items: items as any });
		} else {
			setMiniCart(false);
			setUserMenu(true);
		}
	};

	return (
		<button
			onClick={handleCheckout}
			disabled={paynowloading}
			className="mt-6 w-full"
		>
			<span className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 h-14 duration-300 text-base font text-white shadow-sm hover:bg-blue-700">
				{paynowloading && <Image src={loadingSvg} alt="loading" />}
				{session && !paynowloading && "Pay now"}
				{!session && !paynowloading && "Sign in to checkout"}
			</span>
		</button>
	);
};

export default Checkout;
