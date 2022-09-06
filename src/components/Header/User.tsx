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
				<div className="absolute">
					<button onClick={logout}>Logout</button>
				</div>
			)}
			<AnimatePresence>
				{userMenu && !session && <Auth />}
			</AnimatePresence>
		</div>
	);
};

export default User;
