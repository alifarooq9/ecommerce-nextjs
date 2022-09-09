import { FC, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { userMenuState } from "../../recoil/globalStates";
import { useSession, signOut } from "next-auth/react";
import Auth from "../Auth";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const User: FC = () => {
	// current session
	const { data: session } = useSession();
	// console.log(session);

	// use menu state
	const [userMenu, setUserMenu] = useRecoilState<boolean>(userMenuState);

	// logout
	const logout = async () => {
		const logoutToast = toast.loading("Logging out...");
		await signOut({ redirect: false });
		toast.success("Logged out successfully", { id: logoutToast });
		setUserMenu(false);
	};

	// error handing
	const router = useRouter();
	const {
		query: { error },
	} = router;
	const handleError = async () => {
		if (error === "OAuthAccountNotLinked") {
			toast.error("Account is linked to another provider.");
			router.replace("/");
		} else if (error) {
			toast.error("Something went wrong.");
			router.replace("/");
		}
	};
	useEffect(() => {
		handleError();
	}, [error]);

	return (
		<div className="relative">
			<button
				onClick={() =>
					userMenu ? setUserMenu(false) : setUserMenu(true)
				}
				className="flex items-center justify-center hover:bg-gray-100 px-3 py-3 rounded-2xl duration-300"
			>
				<UserIcon className="w-6 h-6" />
			</button>

			{userMenu && session && (
				<div className="absolute bg-white shadow-xl px-12 w-screen max-w-xs flex flex-col justify-center py-10 right-0 rounded-3xl flex-1 divide-y space-y-5">
					<section className="flex flex-col justify-center w-full">
						<h1 className="flex-grow text-xl font-semibold text-center">
							{session?.user?.name}
						</h1>
						<p className="text-sm opacity-70 text-center">
							{session?.user?.email}
						</p>
					</section>
					<section className="flex flex-col py-5 items-center space-y-2">
						<button
							onClick={() => {
								router.push("/orders");
								setUserMenu(false);
							}}
							className="py-3 w-36 rounded-2xl border-2 font-semibold border-black text-opacity-60 text-black hover:text-opacity-100 hover:border-opacity-100 duration-300 border-opacity-10 "
						>
							Orders
						</button>
						<button
							onClick={logout}
							className="py-3 w-36 rounded-2xl border-2 font-semibold border-red-500 text-red-500 text-opacity-60 hover:text-opacity-100 hover:border-opacity-100 duration-300 border-opacity-10 "
						>
							Logout
						</button>
					</section>
				</div>
			)}
			<AnimatePresence>
				{userMenu && !session && <Auth />}
			</AnimatePresence>
		</div>
	);
};

export default User;
