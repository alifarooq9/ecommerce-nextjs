import { FC } from "react";

const Footer: FC = () => {
	return (
		<footer className="mt-28 bg-zinc-900" aria-labelledby="footer-heading">
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>

			<div className="px-4 py-12 mx-auto  max-w-7xl sm:px-6 lg:px-16">
				<div className="flex flex-wrap items-baseline lg:justify-center">
					<span className="mt-2 text-sm font-light text-gray-500">
						Clothing © 1999 - 2099
						<a
							href="https://wickedlabs.dev"
							className="mx-2 text-wickedblue hover:text-gray-500"
							rel="noopener noreferrer"
						>
							@Alimuhammadf5
						</a>
						. Since 1999
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
