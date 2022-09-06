import Image from "next/image";
import { FC } from "react";
import googleIcon from "../../../public/google.svg";
import discordIcon from "../../../public/discord.svg";
import githubIcon from "../../../public/github.svg";

const SigninModel: FC = () => {
	return (
		<div className="bg-white rounded-3xl z-20 px-8 py-10 sm:px-14 sm:py-14 w-full max-w-md">
			<div>
				<h5 className="font-medium opacity-40">Clothing. Ecommerce</h5>
				<h1 className="font-bold text-3xl mt-6">Sign in</h1>
				<div className="mt-7 space-y-3">
					<button className="drop-shadow-lg shadow-black hover:bg-blue-50 duration-300 bg-white w-full h-16 rounded-3xl flex justify-center items-center space-x-3">
						<Image
							src={googleIcon}
							alt="google"
							quality={100}
							width={"28px"}
						/>
						<span className="opacity-60 font-medium">
							Log in with google
						</span>
					</button>
					<button className="drop-shadow-lg shadow-black hover:bg-blue-50 duration-300 bg-white w-full h-16 rounded-3xl flex justify-center items-center space-x-3">
						<Image
							src={discordIcon}
							alt="google"
							quality={100}
							width={"28px"}
						/>
						<span className="opacity-60 font-medium">
							Log in with Discord
						</span>
					</button>
					<button className="drop-shadow-lg shadow-black hover:bg-blue-50 duration-300 bg-white w-full h-16 rounded-3xl flex justify-center items-center space-x-3">
						<Image
							src={githubIcon}
							alt="google"
							quality={100}
							width={"28px"}
						/>
						<span className="opacity-60 font-medium">
							Log in with Github
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SigninModel;
