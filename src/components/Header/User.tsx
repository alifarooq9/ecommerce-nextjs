import { FC, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { userMenuState } from "../../recoil/globalStates";
import { useSession } from "next-auth/react";

const User: FC = () => {
	// current session
	const { data: session, status } = useSession();

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

			{userMenu && session && <div className="absolute">User Menu</div>}
			{userMenu && !session && (
				<>
					<div className="bg-black fixed top-0 bottom-0 left-0 right-0 bg-opacity-70"></div>
					
				</>
			)}
		</div>
	);
};

export default User;