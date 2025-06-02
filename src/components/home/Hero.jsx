import React from "react";

const Hero = () => {
	return (
		<section className=" pt-20">
			<div className="space-y-3 md:px-10 p-5 ">
				<h1 className="text-4xl md:text-7xl font-bold">CarePulse AI</h1>
				<p className="text-lg text-[#3f9669] font-bold">Speak health in your own language</p>
				<p className="text-lg text-zinc-500 max-w-xl ">
					A digital assistant for patients with speech disabilities to communicate with healthcare
					providers in local languages.
				</p>

				<div className="flex gap-x-5 ">
					<button className="bg-[#3f9669]  px-4 py-1 text-white rounded-md">
						Patience Interface
					</button>
					<button className="bg-white border border-gray-200 px-4 py-1 rounded-md ">
						Health Worker Interface
					</button>
				</div>
			</div>
			{/* <div className="border border-gray-500 rounded-md">
				<p>Image</p>
			</div> */}
		</section>
	);
};

export default Hero;
