import React from "react";
import keyfeatures from "../../jsfiles/features";
import { motion } from "framer-motion";

const Features = () => {
	return (
		<section className="bg-[#f9fafb] p-[10%]">
			<div className="text-center space-y-2">
				<h1 className="text-4xl font-bold">Key Features</h1>
				<p className="text-[#71717a]">Our platform bridges the communication gap in healthcare with these powerful features</p>
			</div>

			<div className="md:grid grid-cols-3 gap-x-4 gap-y-4 mt-10">
				{keyfeatures.map((item, index) => (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						whileHover={{ scale: 1.05 }}
					>
						<div
							key={index}
							className="border border-gray-200 p-6 flex flex-col items-center justify-center space-y-2 rounded-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
						>
							<item.icon size={30} className="text-[#3f9669] " />
							<p className="font-semibold text-xl">{item.feature}</p>
							<p className="text-center text-sm text-[#71717a]">{item.text}</p>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default Features;
