import { FC, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { userMenuState } from "../../recoil/globalStates";
import { useSession, signOut } from "next-auth/react";
import Auth from "../Auth";
import { AnimatePresence } from "framer-motion";

const User: FC = () => {
	// current session
	const { data: session } = useSession();
	// console.log(session);

	// use menu state
	const [userMenu, setUserMenu] = useRecoilState<boolean>(userMenuState);

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
					<button onClick={() => signOut({ redirect: false })}>
						Logout
					</button>
				</div>
			)}
			<AnimatePresence>
				{userMenu && !session && <Auth />}
			</AnimatePresence>
		</div>
	);
};

export default User;
