import { FC, useEffect, useState } from "react";
import { userMenuState } from "../../recoil/globalStates";
import { useRecoilState } from "recoil";
import SigninModel from "./SigninModel";
import { motion } from "framer-motion";

const Auth: FC = () => {
	// user menu state
	const [userMenu, setUserMenu] = useRecoilState(userMenuState);

	// hide scroll bar
	useEffect(() => {
		if (typeof window !== "undefined") {
			if (userMenu) {
				document.body.style.overflowY = "hidden";
			} else {
				document.body.style.overflowY = "scroll";
			}
		}
	}, [userMenu]);

	return (
		<div className="fixed left-0 top-0 bottom-0 right-0 m-auto flex justify-center items-center px-6">
			<SigninModel />
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.15 }}
				onClick={() => setUserMenu(false)}
				className="bg-black absolute z-10 w-screen h-screen m-auto bg-opacity-50"
			></motion.div>
		</div>
	);
};

export default Auth;
