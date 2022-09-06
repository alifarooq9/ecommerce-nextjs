import Image from "next/image";
import { FC } from "react";
import googleIcon from "../../../public/google.svg";
import discordIcon from "../../../public/discord.svg";
import githubIcon from "../../../public/github.svg";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { userMenuState } from "../../recoil/globalStates";
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

	//handle google login
	const handleGoogleLogin = async () => {
		setLoginMethod({ ...loginMethod, google: true });
		await signIn("google");
	};

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
			className="bg-white relative rounded-3xl select-none z-20 px-8 py-10 sm:px-14 sm:py-14 w-full max-w-md"
		>
			<div>
				<h5 className="font-medium opacity-40">Clothing. Ecommerce</h5>
				<button
					onClick={() => setUserMenu(false)}
					className="w-8 h-8 absolute top-7 right-8 opacity-40 hover:opacity-100 duration-300"
				>
					<XMarkIcon strokeWidth={2} />
				</button>

				<h1 className="font-bold text-3xl mt-5">Sign in</h1>
				<div className="mt-7 space-y-3">
					<button
						onClick={handleGoogleLogin}
						disabled={loginMethod.google}
						className="drop-shadow-lg shadow-black hover:bg-gray-100 duration-300 bg-white w-full h-16 rounded-3xl flex justify-center items-center space-x-3"
					>
						{loginMethod.google ? (
							<Image src={loadingSvg} alt="loading" />
						) : (
							<>
								<Image
									src={googleIcon}
									alt="google"
									quality={100}
									width={"28px"}
								/>
								<span className="opacity-50 font-semibold">
									Log in with google
								</span>
							</>
						)}
					</button>
					<button
						onClick={handleDiscordLogin}
						disabled={loginMethod.discord}
						className="drop-shadow-lg shadow-black hover:bg-gray-100 duration-300 bg-white w-full h-16 rounded-3xl flex justify-center items-center space-x-3"
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
								<span className="opacity-50 font-semibold">
									Log in with Discord
								</span>
							</>
						)}
					</button>
					<button
						onClick={handleGithubLogin}
						disabled={loginMethod.github}
						className="drop-shadow-lg shadow-black hover:bg-gray-100 duration-300 bg-white w-full h-16 rounded-3xl flex justify-center items-center space-x-3"
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
								<span className="opacity-50 font-semibold">
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
