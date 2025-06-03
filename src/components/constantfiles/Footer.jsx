import React from "react";
import footerlinks from "../../jsfiles/footerlinks";

const Footer = () => {
	return (
		<section className="bg-[#f9fafb] p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1>CarePulse AI</h1>
					<p>Join us in making healthcare more seamless and transparent</p>
				</div>
				<div className="flex">
					{footerlinks.map((item, index) => (
						<div>
							<p key={index}>{item.name}</p>
						</div>
					))}
				</div>
			</div>
			<div className="text-right">
				<p className="text-gray-500">
					&copy; {new Date().getFullYear()} CarePulse. All rights reserved
				</p>
			</div>
		</section>
	);
};

export default Footer;
