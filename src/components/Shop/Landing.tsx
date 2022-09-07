import { FC } from "react";

const Landing: FC = () => {
	return (
		<section className="mt-16">
			<div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
				<div className="flex w-full mx-auto text-left">
					<div className="relative inline-flex items-center mx-auto align-middle">
						<div className="text-center">
							<h1 className="max-w-xl  text-3xl font-extrabold leading-none tracking-tighter text-black md:text-5xl lg:text-6xl">
								You either know fashion or you don’t.
							</h1>
							<p className="max-w-xl mx-auto mt-6 text-base leading-relaxed text-gray-500">
								This a demo for ecommerce website build with
								nextjs if you will buy from this website you
								will get nothing.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
