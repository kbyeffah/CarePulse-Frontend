import React from "react";

const CTA = () => {
	return (
		<section>
			<div className="flex flex-col items-center justify-center p-[8%] space-y-2">
				<h1 className="text-3xl md:text-5xl font-semibold">Ready to Get Started ?</h1>
				<p className=" text-[#71717a] text-lg">
					Join us in bridging the communication gap in healthcare
				</p>
				<div className=" mt-4 md:flex gap-4">
					<button className="bg-[#3f9669] text-white px-4 py-1 rounded-md">
						Patient Interface
					</button>
					<button className="bg-white border border-gray-200 px-4 py-1 rounded-md">
						HealthCare Worker
					</button>
				</div>
			</div>
		</section>
	);
};

export default CTA;
