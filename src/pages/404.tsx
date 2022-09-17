import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";

const FourOhFour: NextPage = () => {
	return (
		<>
			<Head>
				<title>MatteBlack - 404 not found</title>
				<meta
					name="description"
					content="This a ecommerce app with nextjs"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="w-screen  min-h-screen flex justify-center items-center py-20">
				<section className=" flex flex-col bg-blue-500 max-w-xl rounded-3xl w-full items-center  py-[120px] relative z-10">
					<div className="container">
						<div className="flex -mx-4">
							<div className="w-full px-4">
								<div className="mx-auto max-w-[400px] text-center">
									<h2
										className="
                  font-bold
                  text-white
                  mb-2
                  text-[50px]
                  sm:text-[80px]
                  md:text-[100px]
                  leading-none
                  "
									>
										404
									</h2>
									<h4 className="text-white font-semibold text-[22px] leading-tight mb-3">
										Oops! That page can’t be found
									</h4>
									<p className="text-lg text-white mb-8">
										The page you are looking for it maybe
										deleted
									</p>
									<button
										onClick={() => Router.push("/")}
										className="
                  text-base
                  font-semibold
                  text-white
                  inline-block
                  text-center
                  border border-white
                  rounded-lg
                  px-8
                  py-3
                  hover:bg-white hover:text-blue-500
                  transition
                  "
									>
										Go To Home
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className="
      absolute
      -z-10
      w-full
      h-full
      top-0
      left-0
      flex
      justify-between
      items-center
      space-x-5
      md:space-x-8
      lg:space-x-14
      "
					>
						<div className="w-1/3 h-full bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
						<div className="w-1/3 h-full flex">
							<div
								className="
            w-1/2
            h-full
            bg-gradient-to-b
            from-[#FFFFFF14]
            to-[#C4C4C400]
            "
							></div>
							<div
								className="
            w-1/2
            h-full
            bg-gradient-to-t
            from-[#FFFFFF14]
            to-[#C4C4C400]
            "
							></div>
						</div>
						<div className="w-1/3 h-full bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
					</div>
				</section>
			</main>
		</>
	);
};

export default FourOhFour;
