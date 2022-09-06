import { FC, useEffect, useState } from "react";
import { userMenuState } from "../../recoil/globalStates";
import { useRecoilState } from "recoil";
import SigninModel from "./SigninModel";

const Auth: FC = () => {
	// user menu state
	const [userMenu, setUserMenu] = useRecoilState(userMenuState);

	// hide scroll bar
	useEffect(() => {
		if (typeof window !== "undefined") {
			if (userMenu) {
				document.body.style.overflow = "hidden";
			}
		}
	}, [userMenu]);

	// status - login or register
	const [authStatus, setAuthStatus] = useState<"login" | "register">("login");

	return (
		<div className="fixed left-0 top-0 bottom-0 right-0 m-auto flex justify-center items-center px-6">
			{authStatus === "login" && <SigninModel />}
			<span
				onClick={() => setUserMenu(false)}
				className="bg-black absolute z-10 w-screen h-screen m-auto bg-opacity-50"
			></span>
		</div>
	);
};

export default Auth;
