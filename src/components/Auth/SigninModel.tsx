import Image from "next/image";
import { FC } from "react";
import discordIcon from "../../../public/discord.svg";
import githubIcon from "../../../public/github.svg";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import userMenuState from "../../recoil/userMenuState";
import { signIn } from "next-auth/react";
import { useState } from "react";
import loadingSvg from "../../../public/loader.svg";

interface loginMethodTypes {
	google: boolean;
	github: boolean;
	discord: boolean;
}

const SigninModel: FC = () => {
	// user menu state
	const [userMenu, setUserMenu] = useRecoilState(userMenuState);
	const [loginMethod, setLoginMethod] = useState<loginMethodTypes>({
		google: false,
		github: false,
		discord: false,
	});

	const handleGithubLogin = async () => {
		setLoginMethod({ ...loginMethod, github: true });
		await signIn("github");
	};
	const handleDiscordLogin = async () => {
		setLoginMethod({ ...loginMethod, discord: true });
		await signIn("discord");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: "50px" }}
			animate={{ opacity: 1, y: "0px" }}
			exit={{ opacity: 0, y: "-50px" }}
			transition={{ duration: 0.15 }}
			className="bg-gray-800 relative rounded-3xl select-none z-20 px-8 py-10 sm:px-14 sm:py-14 w-full max-w-md"
		>
			<div>
				<h5 className="opacity-40">MatteBlack</h5>
				<button
					onClick={() => setUserMenu(false)}
					className="w-8 h-8 absolute top-7 right-8 opacity-40 hover:opacity-100 duration-300"
				>
					<XMarkIcon strokeWidth={2} />
				</button>

				<h1 className="font-bold text-3xl mt-5">Sign in</h1>
				<div className="mt-7 space-y-3">
					<button
						onClick={handleDiscordLogin}
						disabled={loginMethod.discord}
						className="drop-shadow-lg shadow-black hover:bg-gray-700 duration-300 bg-gray-900 w-full h-16 rounded-3xl flex justify-center items-center space-x-3"
					>
						{loginMethod.discord ? (
							<Image src={loadingSvg} alt="loading" />
						) : (
							<>
								<Image
									src={discordIcon}
									alt="google"
									quality={100}
									width={"28px"}
								/>
								<span className="opacity-50 font-medium">
									Log in with Discord
								</span>
							</>
						)}
					</button>
					<button
						onClick={handleGithubLogin}
						disabled={loginMethod.github}
						className="drop-shadow-lg shadow-black hover:bg-gray-700 duration-300 bg-gray-900 w-full h-16 rounded-3xl flex justify-center items-center space-x-3"
					>
						{loginMethod.github ? (
							<Image src={loadingSvg} alt="loading" />
						) : (
							<>
								<Image
									src={githubIcon}
									alt="google"
									quality={100}
									width={"28px"}
								/>
								<span className="opacity-50 font-medium">
									Log in with Github
								</span>
							</>
						)}
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default SigninModel;
